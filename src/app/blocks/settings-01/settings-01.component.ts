import { Button } from '@/lib/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/ui/card';
import { Checkbox } from '@/lib/components/ui/checkbox';
import { Input } from '@/lib/components/ui/input';
import { Label } from '@/lib/components/ui/label';
import { NativeSelect } from '@/lib/components/ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/lib/components/ui/tabs';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings-01',
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Checkbox,
    Input,
    Label,
    NativeSelect,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  ],
  template: `
    <div class="container max-w-4xl py-12">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold tracking-tight">Settings</h1>
        <p class="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <!-- Tabs -->
      <Tabs [value]="activeTab()" (valueChange)="activeTab.set($any($event))">
        <TabsList class="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <!-- General Tab -->
        <TabsContent value="general">
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="name">Name</Label>
                  <Input id="name" type="text" value="John Doe" />
                </div>
                <div class="space-y-2">
                  <Label for="email">Email</Label>
                  <input
                    id="email"
                    type="email"
                    value="john@example.com"
                    class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div class="space-y-2">
                  <Label for="bio">Bio</Label>
                  <textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    rows="3"
                    class="flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                  ></textarea>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <Label>Language</Label>
                    <p class="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <NativeSelect class="w-40">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </NativeSelect>
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <Label>Timezone</Label>
                    <p class="text-sm text-muted-foreground">
                      Your current timezone
                    </p>
                  </div>
                  <NativeSelect class="w-40">
                    <option>UTC-8 (Pacific)</option>
                    <option>UTC-5 (Eastern)</option>
                    <option>UTC+0 (London)</option>
                  </NativeSelect>
                </div>
              </CardContent>
            </Card>

            <div class="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <!-- Security Tab -->
        <TabsContent value="security">
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="space-y-2">
                  <Label for="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div class="space-y-2">
                  <Label for="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div class="space-y-2">
                  <Label for="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Enable 2FA</p>
                    <p class="text-sm text-muted-foreground">
                      Protect your account with 2FA
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </CardContent>
            </Card>

            <div class="flex justify-end">
              <Button>Update Password</Button>
            </div>
          </div>
        </TabsContent>

        <!-- Notifications Tab -->
        <TabsContent value="notifications">
          <div class="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Manage your email notification preferences</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Marketing emails</p>
                    <p class="text-sm text-muted-foreground">
                      Receive updates about new features
                    </p>
                  </div>
                  <Checkbox />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Security alerts</p>
                    <p class="text-sm text-muted-foreground">
                      Important security updates
                    </p>
                  </div>
                  <Checkbox [checked]="true" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Product updates</p>
                    <p class="text-sm text-muted-foreground">
                      News about product changes
                    </p>
                  </div>
                  <Checkbox />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage your push notification preferences</CardDescription>
              </CardHeader>
              <CardContent class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">New messages</p>
                    <p class="text-sm text-muted-foreground">
                      Get notified about new messages
                    </p>
                  </div>
                  <Checkbox [checked]="true" />
                </div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">Project updates</p>
                    <p class="text-sm text-muted-foreground">
                      Updates on your projects
                    </p>
                  </div>
                  <Checkbox [checked]="true" />
                </div>
              </CardContent>
            </Card>

            <div class="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings01Component {
  activeTab = signal<'general' | 'security' | 'notifications'>('general');
}
