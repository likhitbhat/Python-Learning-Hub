import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  sendEmailVerification as firebaseSendEmailVerification,
  reload as firebaseReload,
  updateProfile,
  type User as FirebaseUser 
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '../config/firebase';
import type { UserProfile } from '../components/AuthModal';

export interface AuthStateChangePayload {
  user: UserProfile | null;
  isVerified: boolean;
  email: string;
}

// Convert Firebase User object to PyLearn UserProfile format
export const formatFirebaseUser = (user: FirebaseUser): UserProfile => {
  const name = user.displayName || user.email?.split('@')[0] || 'Python Explorer';
  const avatar = user.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`;
  
  return {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email: user.email || '',
    avatar,
    joinDate: new Date(user.metadata.creationTime || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  };
};

// Real-time Subscribe to Firebase Auth changes with email verification check
export const subscribeToAuthChanges = (onAuthChanged: (payload: AuthStateChangePayload) => void) => {
  if (!isFirebaseConfigured()) {
    return () => {};
  }
  
  try {
    return onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Check email verification status (Google accounts are automatically verified)
        const isVerified = fbUser.emailVerified || fbUser.providerData.some(p => p.providerId === 'google.com');
        onAuthChanged({
          user: formatFirebaseUser(fbUser),
          isVerified,
          email: fbUser.email || ''
        });
      } else {
        onAuthChanged({
          user: null,
          isVerified: false,
          email: ''
        });
      }
    });
  } catch (e) {
    console.warn("Firebase Auth listener initialized in fallback mode:", e);
    return () => {};
  }
};

// Reload Firebase Current User and check emailVerified status
export const checkCurrentEmailVerification = async (): Promise<boolean> => {
  if (!auth.currentUser) return false;
  try {
    await firebaseReload(auth.currentUser);
    return auth.currentUser.emailVerified || auth.currentUser.providerData.some(p => p.providerId === 'google.com');
  } catch (err) {
    console.error("Error reloading Firebase user:", err);
    return auth.currentUser?.emailVerified || false;
  }
};

// Send Firebase Email Verification to current or specified user
export const resendVerificationEmail = async (): Promise<void> => {
  if (!auth.currentUser) {
    throw new Error("No user is currently signed in to send verification email.");
  }
  try {
    await firebaseSendEmailVerification(auth.currentUser);
  } catch (err: any) {
    throw new Error(parseFirebaseError(err));
  }
};

// Helper function to format clear, detailed Firebase error messages
export const parseFirebaseError = (err: any): string => {
  console.error("Firebase Auth Error Details:", err);
  const code = err?.code || '';
  const rawMsg = err?.message || String(err);

  if (code === 'auth/unverified-email') {
    return 'Please verify your email before logging in. We have sent a verification link to your email address.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many attempts. Access to this account has been temporarily disabled. Please wait a few minutes or reset your password.';
  }
  if (code === 'auth/invalid-email') {
    return 'The email address format is invalid. Please check for typos.';
  }
  if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
    return 'Invalid email or password. Please check your credentials or click Sign Up to create an account.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'An account with this email address already exists. Try logging in instead.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Google Sign-in popup was closed before completing.';
  }
  if (code === 'auth/weak-password') {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Network connection error. Please check your internet connection and try again.';
  }
  if (code === 'auth/configuration-not-found') {
    return `Firebase Error (auth/configuration-not-found): Firebase Identity Provider is not active. In Firebase Console -> Authentication -> Sign-in method, click Google/Email, select a Support Email, and click Save. (${rawMsg})`;
  }
  if (code === 'auth/operation-not-allowed') {
    return `Firebase Error (auth/operation-not-allowed): This sign-in method is disabled in Firebase Console. Please enable Email/Password & Google under Authentication -> Sign-in method.`;
  }

  return rawMsg;
};

// Email & Password Registration (Sends Verification Email Immediately!)
export const registerWithEmail = async (name: string, email: string, pass: string): Promise<{ user: UserProfile; needsVerification: boolean }> => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase credentials not configured yet in .env file.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;

    // Update Display Name in Firebase User Profile
    if (name && fbUser) {
      await updateProfile(fbUser, {
        displayName: name,
        photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`
      });
    }

    // Send Verification Email Immediately!
    await firebaseSendEmailVerification(fbUser);

    return {
      user: formatFirebaseUser(fbUser),
      needsVerification: !fbUser.emailVerified
    };
  } catch (err) {
    throw new Error(parseFirebaseError(err));
  }
};

// Email & Password Sign In (Enforces Email Verification Check!)
export const loginWithEmail = async (email: string, pass: string): Promise<{ user: UserProfile; isVerified: boolean }> => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase credentials not configured yet in .env file.');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;

    // Reload user to get fresh emailVerified status from Firebase servers
    await firebaseReload(fbUser);

    const isVerified = fbUser.emailVerified || fbUser.providerData.some(p => p.providerId === 'google.com');

    if (!isVerified) {
      // Unverified Email: Immediately sign out and prompt user to verify!
      // Send a fresh verification email if needed
      try {
        await firebaseSendEmailVerification(fbUser);
      } catch (e) {
        // Ignore rate limit errors on automatic resend
      }
      
      // Sign out unverified user to protect application features
      await firebaseSignOut(auth);

      const error = new Error('Please verify your email before logging in. We have sent a verification link to your email address.');
      (error as any).code = 'auth/unverified-email';
      (error as any).unverifiedEmail = email;
      throw error;
    }

    return {
      user: formatFirebaseUser(fbUser),
      isVerified: true
    };
  } catch (err) {
    throw new Error(parseFirebaseError(err));
  }
};

// Google OAuth Popup Sign In (Google accounts are pre-verified)
export const loginWithGoogle = async (): Promise<UserProfile> => {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase credentials not configured yet in .env file.');
  }

  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return formatFirebaseUser(userCredential.user);
  } catch (err) {
    throw new Error(parseFirebaseError(err));
  }
};

// Firebase Sign Out
export const logoutFirebase = async (): Promise<void> => {
  if (!isFirebaseConfigured()) return;
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.warn("Firebase sign out warning:", e);
  }
};
