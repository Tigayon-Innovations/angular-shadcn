import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'AccordionDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Accordion, AccordionContent, AccordionItem, AccordionTrigger],
  template: `
    <Accordion type="single" collapsible class="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern for accordions, with
          proper keyboard navigation and focus management.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match the shadcn/ui aesthetic.
          You can customize it with Tailwind CSS classes.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default with smooth expand/collapse transitions
          powered by CSS animations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  `,
})
export class AccordionDemo {}
