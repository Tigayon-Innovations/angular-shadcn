import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings-01',
  imports: [],
  template: `
    <div class="container max-w-4xl py-12">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold">Settings</h1>
        <p class="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <!-- Tabs -->
      <div class="mb-6 flex gap-4 border-b">
        <button
          (click)="activeTab.set('general')"
          [class.border-b-2]="activeTab() === 'general'"
          [class.border-primary]="activeTab() === 'general'"
          [class.text-foreground]="activeTab() === 'general'"
          [class.text-muted-foreground]="activeTab() !== 'general'"
          class="px-4 py-2 text-sm font-medium"
        >
          General
        </button>
        <button
          (click)="activeTab.set('security')"
          [class.border-b-2]="activeTab() === 'security'"
          [class.border-primary]="activeTab() === 'security'"
          [class.text-foreground]="activeTab() === 'security'"
          [class.text-muted-foreground]="activeTab() !== 'security'"
          class="px-4 py-2 text-sm font-medium"
        >
          Security
        </button>
        <button
          (click)="activeTab.set('notifications')"
          [class.border-b-2]="activeTab() === 'notifications'"
          [class.border-primary]="activeTab() === 'notifications'"
          [class.text-foreground]="activeTab() === 'notifications'"
          [class.text-muted-foreground]="activeTab() !== 'notifications'"
          class="px-4 py-2 text-sm font-medium"
        >
          Notifications
        </button>
      </div>

      <!-- General Tab -->
      @if (activeTab() === 'general') {
        <div class="space-y-6">
          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">Profile Information</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value="John Doe"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value="john@example.com"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium">Bio</label>
                <textarea
                  rows="3"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">Preferences</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Language</p>
                  <p class="text-sm text-muted-foreground">
                    Select your preferred language
                  </p>
                </div>
                <select
                  class="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Timezone</p>
                  <p class="text-sm text-muted-foreground">
                    Your current timezone
                  </p>
                </div>
                <select
                  class="rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option>UTC-8 (Pacific)</option>
                  <option>UTC-5 (Eastern)</option>
                  <option>UTC+0 (London)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button
              class="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
            >
              Cancel
            </button>
            <button
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Save Changes
            </button>
          </div>
        </div>
      }

      <!-- Security Tab -->
      @if (activeTab() === 'security') {
        <div class="space-y-6">
          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">Change Password</h3>
            <div class="space-y-4">
              <div>
                <label class="mb-2 block text-sm font-medium"
                  >Current Password</label
                >
                <input
                  type="password"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium"
                  >New Password</label
                >
                <input
                  type="password"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">
              Two-Factor Authentication
            </h3>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Enable 2FA</p>
                <p class="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <button
                class="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
              >
                Enable
              </button>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Update Password
            </button>
          </div>
        </div>
      }

      <!-- Notifications Tab -->
      @if (activeTab() === 'notifications') {
        <div class="space-y-6">
          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">Email Notifications</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Marketing emails</p>
                  <p class="text-sm text-muted-foreground">
                    Receive updates about new features
                  </p>
                </div>
                <input type="checkbox" class="h-4 w-4" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Security alerts</p>
                  <p class="text-sm text-muted-foreground">
                    Important security updates
                  </p>
                </div>
                <input type="checkbox" checked class="h-4 w-4" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Product updates</p>
                  <p class="text-sm text-muted-foreground">
                    News about product changes
                  </p>
                </div>
                <input type="checkbox" class="h-4 w-4" />
              </div>
            </div>
          </div>

          <div class="rounded-lg border bg-card p-6">
            <h3 class="mb-4 text-lg font-semibold">Push Notifications</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">New messages</p>
                  <p class="text-sm text-muted-foreground">
                    Get notified about new messages
                  </p>
                </div>
                <input type="checkbox" checked class="h-4 w-4" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Project updates</p>
                  <p class="text-sm text-muted-foreground">
                    Updates on your projects
                  </p>
                </div>
                <input type="checkbox" checked class="h-4 w-4" />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button
              class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Save Preferences
            </button>
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings01Component {
  activeTab = signal<'general' | 'security' | 'notifications'>('general');
}
