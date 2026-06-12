import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExampleDashboard } from '../examples/example-dashboard.component';
import { ExampleCards } from '../examples/example-cards.component';
import { ExampleTasks } from '../examples/example-tasks.component';
import { ExampleForms } from '../examples/example-forms.component';

@Component({
  selector: 'home-examples-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, TabsList, TabsTrigger, TabsContent, ExampleDashboard, ExampleCards, ExampleTasks, ExampleForms],
  template: `
    <section class="container mx-auto px-4 py-12 md:py-16">
      <div class="mx-auto max-w-6xl">
        <div class="mb-8 text-center">
          <h2 class="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
            Build something great
          </h2>
          <p class="text-muted-foreground md:text-lg">
            Start with one of these example applications and customize to your needs.
          </p>
        </div>

        <Tabs defaultValue="dashboard" class="w-full">
          <div class="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="forms">Forms</TabsTrigger>
            </TabsList>
          </div>

          <div class="rounded-xl border bg-background shadow-lg overflow-hidden">
            <TabsContent value="dashboard" class="m-0">
              <example-dashboard />
            </TabsContent>
            <TabsContent value="cards" class="m-0">
              <example-cards />
            </TabsContent>
            <TabsContent value="tasks" class="m-0">
              <example-tasks />
            </TabsContent>
            <TabsContent value="forms" class="m-0">
              <example-forms />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  `,
})
export class HomeExamplesSection {}
