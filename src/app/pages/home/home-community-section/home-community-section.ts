import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Button } from '@/ui/button';
import { ArrowRight, Github, LucideAngularModule, Sparkles } from 'lucide-angular';

@Component({
  selector: 'home-community-section',
  standalone: true,
  imports: [RouterLink, Button, LucideAngularModule],
  templateUrl: './home-community-section.html',
  styleUrl: '../home.style.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCommunitySection {
  protected readonly arrowRightIcon = ArrowRight;
  protected readonly githubIcon = Github;
  protected readonly sparklesIcon = Sparkles;

  protected openGitHub(): void {
    window.open('https://github.com/Tigayon-Innovations/angular-shadcn', '_blank');
  }
}
