import { SeoService } from '@/services/seo.service';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

import { CardsDemo } from '@/components/cards/cards-demo.component';

@Component({
  selector: 'HomePage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Badge, Button, RouterLink, LucideAngularModule, CardsDemo],
  styleUrl: './home.style.css',
  templateUrl: './home.component.html',
})
export class HomePage {
  private readonly seo = inject(SeoService);
  protected readonly icons = { ArrowRight };

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
