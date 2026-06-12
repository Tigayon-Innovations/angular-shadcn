import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Cards01Component } from '@/blocks/cards-01';
import { Chat01Component } from '@/blocks/chat-01';
import { Dashboard02Component } from '@/blocks/dashboard-02';
import { Login04Component } from '@/blocks/login-04';
import { Payment01Component } from '@/blocks/payment-01';
import { Pricing01Component } from '@/blocks/pricing-01';
import { Settings01Component } from '@/blocks/settings-01';

interface BlockPreview {
  label: string;
  containerH: number;
  scale: number;
}

@Component({
  selector: 'create-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Dashboard02Component,
    Login04Component,
    Pricing01Component,
    Cards01Component,
    Settings01Component,
    Payment01Component,
    Chat01Component,
  ],
  template: `
    <div class="p-6 grid grid-cols-2 gap-4" style="grid-auto-rows: auto">

      <!-- Dashboard: col 1, rows 1-2 (tall) -->
      <div class="row-span-2 relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Dashboard</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:900px;">
          <app-dashboard-02></app-dashboard-02>
        </div>
        <div style="height:450px"></div>
      </div>

      <!-- Login: col 2, row 1 -->
      <div class="relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Login</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:700px;">
          <app-login-04></app-login-04>
        </div>
        <div style="height:350px"></div>
      </div>

      <!-- Pricing: col 2, row 2 -->
      <div class="relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Pricing</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:720px;">
          <app-pricing-01></app-pricing-01>
        </div>
        <div style="height:360px"></div>
      </div>

      <!-- Cards: col 1, row 3 -->
      <div class="relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Cards</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:1000px;">
          <app-cards-01></app-cards-01>
        </div>
        <div style="height:500px"></div>
      </div>

      <!-- Settings: col 2, row 3 -->
      <div class="relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Settings</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:800px;">
          <app-settings-01></app-settings-01>
        </div>
        <div style="height:400px"></div>
      </div>

      <!-- Payment: col 1, row 4 -->
      <div class="relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Payment</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:800px;">
          <app-payment-01></app-payment-01>
        </div>
        <div style="height:400px"></div>
      </div>

      <!-- Chat: col 2, row 4 -->
      <div class="relative overflow-hidden rounded-xl border bg-muted/30 shadow-sm">
        <div class="absolute top-2 right-2 z-10 pointer-events-none">
          <span class="text-[10px] bg-background/90 backdrop-blur border rounded-full px-2 py-0.5 font-medium">Chat</span>
        </div>
        <div class="absolute"
             style="top:0; left:0; transform-origin:top left; pointer-events:none; transform:scale(0.5); width:200%; height:600px;">
          <app-chat-01></app-chat-01>
        </div>
        <div style="height:300px"></div>
      </div>

    </div>
  `,
})
export class CreateShowcase {}
