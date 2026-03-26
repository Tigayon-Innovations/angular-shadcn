import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ArrowRight,
  Boxes,
  Check,
  Code2,
  Copy,
  Github,
  LucideAngularModule,
  LucideIconData,
  Palette,
  Server,
  Shield,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-angular';

interface HomeFeature {
  title: string;
  description: string;
  icon: LucideIconData;
  iconClass: string;
}

@Component({
  selector: 'home-features-section',
  imports: [LucideAngularModule],
  templateUrl: './home-features-section.html',
  styleUrl: '../home.style.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturesSection {
  protected readonly features: readonly HomeFeature[] = [
    {
      title: '60+ Components',
      description:
        'Buttons, dialogs, forms, navigation, and more - built on Radix primitives and styled the shadcn way.',
      icon: Boxes,
      iconClass: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'TypeScript First',
      description: 'Strict types throughout with great DX: autocomplete, docs, and safe APIs.',
      icon: Code2,
      iconClass: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Signal-Powered',
      description: 'Built with Angular signals for fine-grained reactivity and performance.',
      icon: Zap,
      iconClass: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Fully Themeable',
      description:
        'CSS variables for complete customization. Dark mode built-in. Your brand, your way.',
      icon: Palette,
      iconClass: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Accessible',
      description:
        'WAI-ARIA patterns, keyboard-first, screen-reader friendly - Radix-driven by design.',
      icon: Shield,
      iconClass: 'from-green-500 to-emerald-500',
    },
    {
      title: 'SSR Ready',
      description: 'Full server-side rendering support. Works seamlessly with Angular Universal.',
      icon: Server,
      iconClass: 'from-orange-500 to-amber-500',
    },
  ];
}
