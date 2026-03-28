import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/**
 * SEO metadata configuration interface
 */
export interface SeoConfig {
  /** Page title - will be appended with site name */
  title?: string;
  /** Meta description for search engines */
  description?: string;
  /** Keywords for search engines */
  keywords?: string[];
  /** Canonical URL */
  canonicalUrl?: string;
  /** Open Graph type (website, article, etc.) */
  ogType?: 'website' | 'article' | 'product';
  /** Open Graph image URL */
  ogImage?: string;
  /** Open Graph image alt text */
  ogImageAlt?: string;
  /** Twitter card type */
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Twitter creator handle */
  twitterCreator?: string;
  /** Article author (for article type) */
  author?: string;
  /** Article published date */
  publishedTime?: string;
  /** Article modified date */
  modifiedTime?: string;
  /** Robots directives */
  robots?: string;
  /** JSON-LD structured data */
  structuredData?: Record<string, unknown>;
  /** Additional custom meta tags */
  customMeta?: { name: string; content: string }[];
}

/**
 * Default SEO configuration for the site
 */
const DEFAULT_SEO_CONFIG: Required<
  Pick<
    SeoConfig,
    | 'title'
    | 'description'
    | 'keywords'
    | 'ogType'
    | 'ogImage'
    | 'ogImageAlt'
    | 'twitterCard'
    | 'robots'
  >
> = {
  title: 'shadcn-angular',
  description:
    'Beautiful, accessible, and customizable UI components for Angular. Built with Tailwind CSS. Open source and ready to use.',
  keywords: [
    'angular',
    'shadcn',
    'ui components',
    'tailwind css',
    'typescript',
    'accessible',
    'open source',
    'angular components',
    'design system',
    'component library',
  ],
  ogType: 'website',
  ogImage: '/og-image.png',
  ogImageAlt: 'shadcn-angular - Beautiful UI components for Angular',
  twitterCard: 'summary_large_image',
  robots: 'index, follow',
};

/**
 * Site-wide constants
 */
const SITE_NAME = 'shadcn-angular';
const SITE_URL = 'https://shadcn-angular.dev';
const TWITTER_SITE = '@shadcn_angular';
const THEME_COLOR = '#18181B';

/**
 * SEO Service for managing meta tags, Open Graph, Twitter Cards,
 * JSON-LD structured data, and other SEO-related functionality.
 *
 * @example
 * ```typescript
 * // In a component
 * export class MyComponent {
 *   private readonly seo = inject(SeoService);
 *
 *   constructor() {
 *     this.seo.updateMetaTags({
 *       title: 'My Page',
 *       description: 'This is my page description',
 *       ogImage: '/my-page-og.png'
 *     });
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    this.initializeDefaultMeta();
    this.setupRouteListener();
  }

  /**
   * Initialize default meta tags on application start
   */
  private initializeDefaultMeta(): void {
    this.updateMetaTags({});
  }

  /**
   * Setup listener to reset meta tags on route change
   */
  private setupRouteListener(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      // Update canonical URL on route change
      this.updateCanonicalUrl();
    });
  }

  /**
   * Update all meta tags based on provided configuration
   */
  updateMetaTags(config: SeoConfig): void {
    const mergedConfig = { ...DEFAULT_SEO_CONFIG, ...config };

    // Update page title
    this.updateTitle(mergedConfig.title);

    // Update basic meta tags
    this.updateBasicMeta(mergedConfig);

    // Update Open Graph tags
    this.updateOpenGraphMeta(mergedConfig);

    // Update Twitter Card tags
    this.updateTwitterMeta(mergedConfig);

    // Update canonical URL
    if (config.canonicalUrl) {
      this.setCanonicalUrl(config.canonicalUrl);
    } else {
      this.updateCanonicalUrl();
    }

    // Update robots directive
    this.updateTag('robots', mergedConfig.robots);

    // Update structured data
    if (config.structuredData) {
      this.updateStructuredData(config.structuredData);
    }

    // Update custom meta tags
    if (config.customMeta) {
      config.customMeta.forEach((tag) => this.updateTag(tag.name, tag.content));
    }
  }

  /**
   * Update the page title
   */
  updateTitle(title?: string): void {
    const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;
    this.titleService.setTitle(fullTitle);
  }

  /**
   * Update basic meta tags
   */
  private updateBasicMeta(config: SeoConfig): void {
    this.updateTag('description', config.description || DEFAULT_SEO_CONFIG.description);

    if (config.keywords?.length) {
      this.updateTag('keywords', config.keywords.join(', '));
    } else {
      this.updateTag('keywords', DEFAULT_SEO_CONFIG.keywords.join(', '));
    }

    if (config.author) {
      this.updateTag('author', config.author);
    }

    // Theme color for mobile browsers
    this.updateTag('theme-color', THEME_COLOR);

    // Mobile optimization
    this.updateTag('format-detection', 'telephone=no');
    this.updateTag('apple-mobile-web-app-capable', 'yes');
    this.updateTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    this.updateTag('apple-mobile-web-app-title', SITE_NAME);

    // Microsoft tile
    this.updateTag('msapplication-TileColor', THEME_COLOR);
    this.updateTag('msapplication-config', '/browserconfig.xml');

    // Application name
    this.updateTag('application-name', SITE_NAME);
  }

  /**
   * Update Open Graph meta tags
   */
  private updateOpenGraphMeta(config: SeoConfig): void {
    const title = config.title ? `${config.title} - ${SITE_NAME}` : SITE_NAME;
    const url = config.canonicalUrl || this.getCurrentUrl();

    this.updatePropertyTag('og:title', title);
    this.updatePropertyTag('og:description', config.description || DEFAULT_SEO_CONFIG.description);
    this.updatePropertyTag('og:type', config.ogType || DEFAULT_SEO_CONFIG.ogType);
    this.updatePropertyTag('og:url', url);
    this.updatePropertyTag('og:site_name', SITE_NAME);
    this.updatePropertyTag('og:locale', 'en_US');

    // Image tags
    const imageUrl = this.getAbsoluteUrl(config.ogImage || DEFAULT_SEO_CONFIG.ogImage);
    this.updatePropertyTag('og:image', imageUrl);
    this.updatePropertyTag('og:image:alt', config.ogImageAlt || DEFAULT_SEO_CONFIG.ogImageAlt);
    this.updatePropertyTag('og:image:width', '1200');
    this.updatePropertyTag('og:image:height', '630');
    this.updatePropertyTag('og:image:type', 'image/png');

    // Article-specific tags
    if (config.ogType === 'article') {
      if (config.publishedTime) {
        this.updatePropertyTag('article:published_time', config.publishedTime);
      }
      if (config.modifiedTime) {
        this.updatePropertyTag('article:modified_time', config.modifiedTime);
      }
      if (config.author) {
        this.updatePropertyTag('article:author', config.author);
      }
    }
  }

  /**
   * Update Twitter Card meta tags
   */
  private updateTwitterMeta(config: SeoConfig): void {
    const title = config.title ? `${config.title} - ${SITE_NAME}` : SITE_NAME;

    this.updateTag('twitter:card', config.twitterCard || DEFAULT_SEO_CONFIG.twitterCard);
    this.updateTag('twitter:site', TWITTER_SITE);
    this.updateTag('twitter:title', title);
    this.updateTag('twitter:description', config.description || DEFAULT_SEO_CONFIG.description);

    // Image
    const imageUrl = this.getAbsoluteUrl(config.ogImage || DEFAULT_SEO_CONFIG.ogImage);
    this.updateTag('twitter:image', imageUrl);
    this.updateTag('twitter:image:alt', config.ogImageAlt || DEFAULT_SEO_CONFIG.ogImageAlt);

    // Creator
    if (config.twitterCreator) {
      this.updateTag('twitter:creator', config.twitterCreator);
    }
  }

  /**
   * Set canonical URL
   */
  setCanonicalUrl(url: string): void {
    if (!this.isBrowser) {
      return;
    }

    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', this.getAbsoluteUrl(url));
  }

  /**
   * Update canonical URL based on current route
   */
  private updateCanonicalUrl(): void {
    this.setCanonicalUrl(this.getCurrentUrl());
  }

  /**
   * Update or add JSON-LD structured data
   */
  updateStructuredData(data: Record<string, unknown>): void {
    if (!this.isBrowser) {
      return;
    }

    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /**
   * Generate Website structured data
   */
  getWebsiteStructuredData(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_SEO_CONFIG.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/docs/components?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  }

  /**
   * Generate SoftwareApplication structured data
   */
  getSoftwareApplicationStructuredData(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: DEFAULT_SEO_CONFIG.description,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    };
  }

  /**
   * Generate Breadcrumb structured data
   */
  getBreadcrumbStructuredData(items: { name: string; url: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: this.getAbsoluteUrl(item.url),
      })),
    };
  }

  /**
   * Generate FAQPage structured data
   */
  getFaqStructuredData(faqs: { question: string; answer: string }[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  /**
   * Set noindex, nofollow for pages that shouldn't be indexed
   */
  setNoIndex(): void {
    this.updateTag('robots', 'noindex, nofollow');
  }

  /**
   * Reset to default indexable state
   */
  setIndex(): void {
    this.updateTag('robots', 'index, follow');
  }

  /**
   * Helper to update or create a meta tag by name
   */
  private updateTag(name: string, content: string): void {
    const existingTag = this.meta.getTag(`name="${name}"`);
    if (existingTag) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  /**
   * Helper to update or create a meta tag by property (for Open Graph)
   */
  private updatePropertyTag(property: string, content: string): void {
    const existingTag = this.meta.getTag(`property="${property}"`);
    if (existingTag) {
      this.meta.updateTag({ property, content });
    } else {
      this.meta.addTag({ property, content });
    }
  }

  /**
   * Get current URL
   */
  private getCurrentUrl(): string {
    return `${SITE_URL}${this.router.url.split('?')[0]}`;
  }

  /**
   * Convert relative URL to absolute URL
   */
  private getAbsoluteUrl(url: string): string {
    if (url.startsWith('http')) {
      return url;
    }
    return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  /**
   * Remove all custom meta tags (useful for cleanup)
   */
  resetToDefaults(): void {
    this.updateMetaTags({});
  }
}
