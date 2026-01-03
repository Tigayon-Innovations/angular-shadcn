import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'TabsDemo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabsContent, TabsList, TabsTrigger],
  template: `
    <Tabs defaultValue="account" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" class="p-4 border rounded-lg mt-2">
        <h3 class="font-semibold mb-2">Account</h3>
        <p class="text-sm text-muted-foreground">
          Make changes to your account here. Click save when you're done.
        </p>
      </TabsContent>
      <TabsContent value="password" class="p-4 border rounded-lg mt-2">
        <h3 class="font-semibold mb-2">Password</h3>
        <p class="text-sm text-muted-foreground">
          Change your password here. After saving, you'll be logged out.
        </p>
      </TabsContent>
    </Tabs>
  `,
})
export class TabsDemo {}
