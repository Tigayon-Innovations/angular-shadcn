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
    <article class="prose prose-invert max-w-2xl space-y-4">
      <TypographyH1 class="block">The Joke Tax Chronicles</TypographyH1>
      <TypographyLead class="block">
        Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging
        on his throne.
      </TypographyLead>
      <TypographyH2 class="block mt-8">The King's Plan</TypographyH2>
      <TypographyP class="block">
        The king thought it was a brilliant idea to tax jokes. "After all," he said, "everyone
        enjoys a good joke, so why not profit from it?"
      </TypographyP>
      <TypographyP class="block">
        He decreed that every joke told would be taxed at a rate of:
        <TypographyInlineCode>const tax = 0.1</TypographyInlineCode> gold coins.
      </TypographyP>
      <TypographyBlockquote class="block my-6">
        "After all," he said, "everyone enjoys a good joke, so it's only fair that the kingdom
        benefits too."
      </TypographyBlockquote>
      <TypographyH3 class="block mt-8">The Consequences</TypographyH3>
      <TypographyP class="block">
        The people were not happy. Comedians went underground, jesters fled the kingdom, and
        laughter became a rare commodity.
      </TypographyP>
      <div class="mt-6 flex items-center gap-4">
        <TypographySmall>Note: This is a fictional story.</TypographySmall>
        <span class="text-muted-foreground">•</span>
        <TypographyMuted>Last updated: 3 days ago</TypographyMuted>
      </div>
    </article>
  `,
})
export class TypographyDemo {}
