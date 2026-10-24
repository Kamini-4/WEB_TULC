import React, { useEffect } from 'react';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  articleData?: {
    datePublished?: string;
    dateModified?: string;
    authorName?: string;
    wordCount?: string | number;
    category?: string;
    thesis?: string;
  };
  faqData?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

const DEFAULT_IMAGE = 'https://theunboundedleadership.com/og-image.jpg';
const BASE_URL = 'https://theunboundedleadership.com';

function setMetaTag(attributeName: string, attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  keywords,
  type = 'website',
  image = DEFAULT_IMAGE,
  articleData,
  faqData,
  breadcrumbs
}) => {
  useEffect(() => {
    // Keep title strictly <= 60 characters for SEO Best Practices
    let cleanTitle = title.trim();
    if (!cleanTitle.includes('The Unbounded Leadership Co.') && !cleanTitle.includes('TULC')) {
      if (cleanTitle.length + 7 <= 60) {
        cleanTitle = `${cleanTitle} | TULC`;
      }
    }
    const fullTitle = cleanTitle.length > 60 ? cleanTitle.slice(0, 57) + '...' : cleanTitle;

    // Keep meta description strictly under 160 characters (120-155 ideal)
    let cleanDesc = description.trim();
    if (cleanDesc.length > 155) {
      cleanDesc = cleanDesc.slice(0, 152) + '...';
    }
    
    // 1. Page Title
    document.title = fullTitle;

    // 2. Canonical URL
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${BASE_URL}${cleanPath === '/' ? '' : cleanPath}`;
    setCanonical(canonicalUrl);

    // 3. Standard Meta Description & Keywords
    setMetaTag('name', 'description', cleanDesc);
    if (keywords) {
      setMetaTag('name', 'keywords', keywords);
    }

    // 4. OpenGraph Tags (SEO + Social)
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', image);
    setMetaTag('property', 'og:site_name', 'The Unbounded Leadership Co.');

    // 5. Twitter Card Tags (Social Preview)
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 6. Dynamic JSON-LD (Schema.org Graph for SEO, GEO & AEO)
    const scriptId = 'page-schema-graph';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const graph: any[] = [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': fullTitle,
        'description': description,
        'isPartOf': {
          '@id': `${BASE_URL}/#website`
        },
        'publisher': {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          'name': 'The Unbounded Leadership Co.',
          'url': BASE_URL,
          'logo': `${BASE_URL}/logo.png`
        }
      }
    ];

    // Breadcrumbs Schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        'itemListElement': breadcrumbs.map((b, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': b.name,
          'item': b.path.startsWith('http') ? b.path : `${BASE_URL}${b.path}`
        }))
      });
    }

    // Article Schema (for Dispatches / Research)
    if (articleData) {
      graph.push({
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        'headline': title,
        'description': description,
        'image': image,
        'datePublished': articleData.datePublished || '2026-07-10T00:00:00+00:00',
        'dateModified': articleData.dateModified || '2026-10-16T00:00:00+00:00',
        'author': {
          '@type': 'Person',
          'name': articleData.authorName || 'Suchita Sancheti',
          'jobTitle': 'Principal Enterprise Architect & Founder',
          'url': `${BASE_URL}/about`
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'The Unbounded Leadership Co.',
          'url': BASE_URL,
          'logo': {
            '@type': 'ImageObject',
            'url': `${BASE_URL}/logo.png`
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        },
        'wordCount': articleData.wordCount ? String(articleData.wordCount).replace(/,/g, '') : '1400',
        // AEO Voice / Answer Engine Hook
        'speakable': {
          '@type': 'SpeakableSpecification',
          'cssSelector': ['.article-thesis', '.article-takeaways', '.article-direct-answer']
        }
      });
    }

    // FAQPage Schema (for Answer Engines / Voice Search)
    if (faqData && faqData.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        'mainEntity': faqData.map((item) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      });
    }

    scriptElement.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph
    });

  }, [title, description, canonicalPath, keywords, type, image, articleData, faqData, breadcrumbs]);

  return null;
};
