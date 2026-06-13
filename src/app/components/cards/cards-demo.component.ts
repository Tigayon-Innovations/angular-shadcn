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
 * The shadcn/ui home/create card masonry — a responsive grid of component
 * demos. Mirrors apps/v4/app/(app)/(root)/cards/index.tsx column layout.
 */
@Component({
  selector: 'cards-demo',
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
      class="cards-neutral relative flex w-full max-w-none flex-col gap-6 overflow-hidden bg-muted p-6 dark:bg-background lg:p-6 xl:p-12 xl:gap-8"
    >
      <div
        class="relative z-10 mx-auto grid w-full gap-6 xl:gap-8 md:max-w-3xl md:grid-cols-2 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 xl:max-w-[1600px] min-[1700px]:grid-cols-5 min-[1700px]:max-w-[1900px] [&_[data-slot=card]]:w-full"
      >
        <div class="flex flex-col items-start gap-6 xl:gap-8">
          <card-ui-elements class="w-full" />
          <card-sidebar-nav class="w-full" />
          <card-savings-targets class="w-full" />
        </div>
        <div class="hidden flex-col gap-6 xl:gap-8 lg:flex">
          <card-contribution-history class="w-full" />
          <card-claimable-balance class="w-full" />
          <card-dividend-income class="w-full" />
        </div>
        <div class="hidden flex-col gap-6 xl:gap-8 min-[1700px]:flex">
          <card-new-milestone class="w-full" />
          <card-payout-threshold class="w-full" />
          <card-account-access class="w-full" />
        </div>
        <div class="hidden flex-col gap-6 xl:gap-8 md:flex">
          <card-qr-connect class="w-full" />
          <card-transfer-funds class="w-full" />
          <card-payments class="w-full" />
        </div>
        <div class="hidden flex-col gap-6 xl:gap-8 xl:flex">
          <card-empty-distribute-track class="w-full" />
          <card-analytics class="w-full" />
          <card-notification-settings class="w-full" />
          <card-power-usage class="w-full" />
        </div>
      </div>
      <!-- soft top/bottom fades like shadcn -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 z-[1] h-120 bg-gradient-to-b from-background via-muted to-transparent dark:hidden"
      ></div>
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-background via-muted/80 to-transparent dark:via-background/80 lg:h-72"
      ></div>
    </div>
  `,
})
export class CardsDemo {}
