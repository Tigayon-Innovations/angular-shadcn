import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '@/ui/button';
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'home-hero-section',
  standalone: true,
  imports: [RouterLink, Button, LucideAngularModule],
  templateUrl: './home-hero-section.html',
  styleUrl: '../home.style.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeHeroSection {
  protected readonly ArrowRightIcon = ArrowRight;
}
