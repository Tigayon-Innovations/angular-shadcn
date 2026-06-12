import { SeoService } from '@/services/seo.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HomeHeroSection } from './home-hero-section/home-hero-section';
import { HomeFeaturesSection } from './home-features-section/home-features-section';
import { HomePerformanceSection } from './home-performance-section/home-performance-section';
import { HomeCommunitySection } from './home-community-section/home-community-section';
import { HomeExamplesSection } from './home-examples-section/home-examples-section';

@Component({
  selector: 'HomePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HomeHeroSection, HomeFeaturesSection, HomePerformanceSection, HomeCommunitySection, HomeExamplesSection],
  styleUrl: './home.style.css',
  templateUrl: './home.component.html',
})
export class HomePage {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.updateMetaTags({
      title: 'Radix + shadcn UI for Angular',
      description:
        'A modern Angular UI kit combining Radix primitives with the shadcn approach. Accessible, composable, themeable, and ready to ship.',
      keywords: [
        'angular',
        'shadcn',
        'radix',
        'ui components',
        'tailwind css',
        'typescript',
        'accessible',
        'open source',
        'angular components',
        'design system',
        'component library',
        'headless ui',
      ],
      ogType: 'website',
      structuredData: this.seo.getWebsiteStructuredData(),
    });
  }
}
