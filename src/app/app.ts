import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <div class="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main class="flex-1">
        <router-outlet />
      </main>
      <SiteFooter />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class App {}
