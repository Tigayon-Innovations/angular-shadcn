import { Button } from '@/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/ui/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'CardDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button],
  template: `
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p class="text-sm text-muted-foreground">
          Your new project will be created and ready to use.
        </p>
      </CardContent>
      <CardFooter class="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  `,
})
export class CardDemo {}
