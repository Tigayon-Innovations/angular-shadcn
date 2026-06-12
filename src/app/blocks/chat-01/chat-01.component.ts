import { UiAvatar } from '@/ui/avatar';
import { Button } from '@/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/ui/card';
import { Input } from '@/ui/input';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LucideAngularModule, Send } from 'lucide-angular';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'me' | 'them';
}

@Component({
  selector: 'app-chat-01',
  imports: [Button, Card, CardContent, CardFooter, CardHeader, Input, LucideAngularModule, UiAvatar],
  template: `
    <div class="flex min-h-svh w-full items-center justify-center bg-muted p-6 md:p-10">
      <Card class="flex w-full max-w-md flex-col">
        <!-- Header -->
        <CardHeader class="border-b">
          <div class="flex items-center gap-3">
            <ui-avatar
              class="h-10 w-10"
              src="https://i.pravatar.cc/100?img=10"
              alt="Sofia Davis"
              fallback="SD"
            />
            <div class="flex-1">
              <p class="text-sm font-medium leading-none">Sofia Davis</p>
              <p class="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
                Online
              </p>
            </div>
          </div>
        </CardHeader>

        <!-- Messages -->
        <CardContent class="flex-1 overflow-y-auto py-4">
          <div class="flex h-80 flex-col gap-3 overflow-y-auto pr-1">
            @for (message of messages; track message.id) {
              <div
                [class]="
                  message.sender === 'me'
                    ? 'ml-auto max-w-[75%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground'
                    : 'mr-auto max-w-[75%] rounded-lg bg-muted px-3 py-2 text-sm'
                "
              >
                {{ message.text }}
              </div>
            }
          </div>
        </CardContent>

        <!-- Footer -->
        <CardFooter class="border-t pt-4">
          <form class="flex w-full items-center gap-2">
            <input Input type="text" placeholder="Type your message..." class="flex-1" />
            <Button type="submit" size="icon">
              <lucide-icon [img]="icons.Send" class="h-4 w-4" />
              <span class="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Chat01Component {
  protected readonly icons = { Send };

  protected readonly messages: ChatMessage[] = [
    { id: 1, text: 'Hi, how can I help you today?', sender: 'them' },
    { id: 2, text: "Hey, I'm having trouble with my account.", sender: 'me' },
    { id: 3, text: 'What seems to be the problem?', sender: 'them' },
    { id: 4, text: "I can't log in, it says my password is incorrect.", sender: 'me' },
    { id: 5, text: 'Have you tried resetting your password from the login page?', sender: 'them' },
    { id: 6, text: "Yes, but I never received the reset email.", sender: 'me' },
    { id: 7, text: 'Let me check that for you. One moment please.', sender: 'them' },
    { id: 8, text: 'Thank you, I appreciate it!', sender: 'me' },
  ];
}
