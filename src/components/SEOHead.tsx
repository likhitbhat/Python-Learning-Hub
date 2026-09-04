import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  topicId?: string;
  canonicalPath?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  topicId,
  canonicalPath = ''
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://pylearnnotebook.com';

  const defaultTitle = 'PyLearn Notebook - Python Zero to Hero Masterclass & Interactive Quizzes';
  const defaultDesc = 'Master Python programming with zero experience! Interactive story notes, Gemini-generated visual architecture diagrams, interview cheat sheet, Pyodide WASM playground, and quizzes.';

  const currentTitle = title ? `${title} | PyLearn Notebook` : defaultTitle;
  const currentDesc = description || defaultDesc;
  const currentCanonical = `${siteUrl}${canonicalPath ? `#${canonicalPath}` : ''}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = currentTitle;

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', currentDesc);

    // 3. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentCanonical);

    // 4. Update OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentDesc);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', currentCanonical);

    // 5. Update Breadcrumb Structured Data (JSON-LD)
    if (topicId && title) {
      let breadcrumbScript = document.getElementById('json-ld-breadcrumb');
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = 'json-ld-breadcrumb';
        breadcrumbScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(breadcrumbScript);
      }
      
      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${siteUrl}/`
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': title,
            'item': currentCanonical
          }
        ]
      };
      
      breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
    }
  }, [currentTitle, currentDesc, currentCanonical, topicId, title, siteUrl]);

  return null;
};
