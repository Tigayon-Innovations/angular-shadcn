import {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyInlineCode,
    TypographyLead,
    TypographyMuted,
    TypographyP,
    TypographySmall,
} from '@/ui/typography';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'TypographyDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyP,
    TypographyBlockquote,
    TypographyInlineCode,
    TypographyLead,
    TypographySmall,
    TypographyMuted,
  ],
  template: `
    <div class="space-y-6">
      <TypographyH1>The Joke Tax Chronicles</TypographyH1>
      <TypographyLead>
        Once upon a time, in a far-off land, there was a very lazy king.
      </TypographyLead>
      <TypographyH2>The King's Plan</TypographyH2>
      <TypographyP>
        The king thought it was a brilliant idea to tax jokes.
        <TypographyInlineCode>const tax = 0.1</TypographyInlineCode>
      </TypographyP>
      <TypographyBlockquote>
        "After all," he said, "everyone enjoys a good joke, so it's only fair."
      </TypographyBlockquote>
      <TypographyH3>The Consequences</TypographyH3>
      <TypographySmall>Note: This is a fictional story.</TypographySmall>
      <TypographyMuted>Last updated: 3 days ago</TypographyMuted>
    </div>
  `,
})
export class TypographyDemo {}
