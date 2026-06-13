import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CardUiElements } from './ui-elements.card';
import { CardSidebarNav } from './sidebar-nav.card';
import { CardSavingsTargets } from './savings-targets.card';
import { CardContributionHistory } from './contribution-history.card';
import { CardClaimableBalance } from './claimable-balance.card';
import { CardDividendIncome } from './dividend-income.card';
import { CardNewMilestone } from './new-milestone.card';
import { CardPayoutThreshold } from './payout-threshold.card';
import { CardAccountAccess } from './account-access.card';
import { CardQrConnect } from './qr-connect.card';
import { CardTransferFunds } from './transfer-funds.card';
import { CardPayments } from './payments.card';
import { CardEmptyDistributeTrack } from './empty-distribute-track.card';
import { CardAnalytics } from './analytics.card';
import { CardNotificationSettings } from './notification-settings.card';
import { CardPowerUsage } from './power-usage.card';

/**
 * The shadcn/ui `/create` preview canvas. Mirrors
 * registry/bases/radix/blocks/preview-02/index.tsx — a fixed-width canvas
 * (so the cards keep their real proportions) laid out in columns, centered,
 * and horizontally clipped/scrolled by the preview frame.
 */
@Component({
  selector: 'cards-canvas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardUiElements,
    CardSidebarNav,
    CardSavingsTargets,
    CardContributionHistory,
    CardClaimableBalance,
    CardDividendIncome,
    CardNewMilestone,
    CardPayoutThreshold,
    CardAccountAccess,
    CardQrConnect,
    CardTransferFunds,
    CardPayments,
    CardEmptyDistributeTrack,
    CardAnalytics,
    CardNotificationSettings,
    CardPowerUsage,
  ],
  template: `
    <div
      class="cards-neutral no-scrollbar size-full overflow-x-auto overflow-y-hidden bg-muted dark:bg-background"
    >
      <div class="flex w-full min-w-max justify-center">
        <div
          class="grid w-[2400px] grid-cols-6 items-start gap-8 bg-muted p-8 dark:bg-background min-[1900px]:w-[2700px] min-[1900px]:gap-10 [&_[data-slot=card]]:w-full"
        >
          <!-- Column 1 -->
          <div class="flex flex-col gap-8 p-1 min-[1900px]:gap-10">
            <card-contribution-history />
            <card-dividend-income />
            <card-qr-connect />
          </div>
          <!-- Column 2 -->
          <div class="flex flex-col gap-8 p-1 min-[1900px]:gap-10">
            <card-payout-threshold />
            <card-claimable-balance />
            <card-new-milestone />
          </div>
          <!-- Column 3 -->
          <div class="flex flex-col gap-8 p-1 min-[1900px]:gap-10">
            <card-savings-targets />
            <card-sidebar-nav />
          </div>
          <!-- Column 4 -->
          <div class="flex flex-col gap-8 p-1 min-[1900px]:gap-10">
            <card-account-access />
            <card-transfer-funds />
            <card-empty-distribute-track />
          </div>
          <!-- Column 5 -->
          <div class="flex flex-col gap-8 p-1 min-[1900px]:gap-10">
            <card-power-usage />
            <card-notification-settings />
            <card-analytics />
          </div>
          <!-- Column 6 -->
          <div class="flex flex-col gap-8 p-1 min-[1900px]:gap-10">
            <card-payments />
            <card-ui-elements />
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CardsCanvas {}
