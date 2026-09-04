export type ThemeColor = 'blue' | 'emerald' | 'purple' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'teal' | 'orange' | 'violet' | 'sky' | 'lime' | 'pink' | 'fuchsia';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'mastery';

export interface Topic {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  theme: ThemeColor;
  iconName: string;
  level?: DifficultyLevel;
  xp?: number;
  completed?: boolean;
  score?: number;
}

export interface NoteSection {
  id: string;
  title: string;
  analogy?: string; // Beginner-friendly real world analogy
  storyNarrative?: string; // Child-friendly story narration
  visualDiagram?: string; // Visual ASCII or structural diagram
  imageUrl?: string; // High quality generated illustration diagram
  content: string;
  codeExample?: string;
  commonMistakes?: string[]; // Traps beginners fall into
  proTips?: string[];
}

export interface TopicNotes {
  topicId: string;
  title: string;
  subtitle: string;
  summary?: string;
  quickTopics: string[];
  sections: NoteSection[];
}

export interface Question {
  id: number;
  text: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
}

export interface TopicQuiz {
  topicId: string;
  title: string;
  questions: Question[];
}

export interface CheatTableItem {
  operatorOrConcept: string;
  description: string;
  example: string;
}

export interface CheatSheetTopic {
  id: string;
  title: string;
  iconName: string;
  tables: {
    categoryTitle: string;
    items: CheatTableItem[];
  }[];
  interviewTips: string[];
}

export interface MiniProject {
  id: string;
  title: string;
  level: DifficultyLevel;
  xp: number;
  description: string;
  learningOutcome: string;
  starterCode: string;
  solutionCode: string;
  iconName: string;
  theme: ThemeColor;
}

export interface ProgressState {
  streak: number;
  xp: number;
  lastActive: string;
  completedTopics: Record<string, { score: number; total: number; date: string }>;
  completedProjects: Record<string, boolean>;
}
