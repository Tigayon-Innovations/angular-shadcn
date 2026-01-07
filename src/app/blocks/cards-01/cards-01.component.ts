import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Progress,
  Separator,
  Switch,
  UiAvatar,
} from '@/lib/components/ui';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ArrowRight, Bell, Bookmark, Calendar, Check, Clock, CreditCard, Download, ExternalLink, Eye, Heart, Lock, LucideAngularModule, Mail, MapPin, MessageSquare, MoreHorizontal, Plus, Settings, Share2, Shield, Sparkles, Star, ThumbsUp, TrendingUp, User, Zap } from 'lucide-angular';

@Component({
  selector: 'app-cards-01',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    UiAvatar,
    Progress,
    Switch,
    Separator,
    LucideAngularModule,
  ],
  template: `
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Simple Card -->
      <Card>
        <CardHeader>
          <CardTitle>Simple Card</CardTitle>
          <CardDescription>A basic card with title and description</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            This is a simple card demonstrating the basic card component structure with
            header, content, and footer sections.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">Learn More</Button>
        </CardFooter>
      </Card>

      <!-- Stats Card -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
          <lucide-icon [img]="icons.CreditCard" class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">$45,231.89</div>
          <div class="flex items-center text-xs text-muted-foreground">
            <lucide-icon [img]="icons.TrendingUp" class="mr-1 h-3 w-3 text-green-500" />
            <span class="text-green-500">+20.1%</span>
            <span class="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      <!-- User Profile Card -->
      <Card>
        <CardHeader class="flex flex-row items-center gap-4">
          <ui-avatar
            src="https://github.com/shadcn.png"
            alt="User"
            fallback="JD"
          />
          <div class="flex flex-col">
            <CardTitle class="text-base">John Doe</CardTitle>
            <CardDescription>Software Engineer</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex gap-4 text-sm">
            <div class="flex items-center gap-1">
              <lucide-icon [img]="icons.MapPin" class="h-3 w-3 text-muted-foreground" />
              <span class="text-muted-foreground">San Francisco</span>
            </div>
            <div class="flex items-center gap-1">
              <lucide-icon [img]="icons.Calendar" class="h-3 w-3 text-muted-foreground" />
              <span class="text-muted-foreground">Joined 2023</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="gap-2">
          <Button size="sm" class="flex-1">Follow</Button>
          <Button size="sm" variant="outline" class="flex-1">Message</Button>
        </CardFooter>
      </Card>

      <!-- Notification Card -->
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-base">Notifications</CardTitle>
            <Badge>3 new</Badge>
          </div>
        </CardHeader>
        <CardContent class="grid gap-4">
          @for (notification of notifications; track notification.title) {
            <div class="flex items-start gap-3">
              <div class="rounded-full bg-primary/10 p-2">
                <lucide-icon [img]="notification.icon" class="h-4 w-4 text-primary" />
              </div>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium">{{ notification.title }}</p>
                <p class="text-xs text-muted-foreground">{{ notification.description }}</p>
              </div>
              <span class="text-xs text-muted-foreground">{{ notification.time }}</span>
            </div>
          }
        </CardContent>
        <CardFooter>
          <Button variant="ghost" class="w-full text-sm">
            View all notifications
            <lucide-icon [img]="icons.ArrowRight" class="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <!-- Progress Card -->
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Project Progress</CardTitle>
          <CardDescription>Q4 Development Goals</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          @for (task of tasks; track task.name) {
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span>{{ task.name }}</span>
                <span class="text-muted-foreground">{{ task.progress }}%</span>
              </div>
              <Progress [value]="task.progress" ></Progress>
            </div>
          }
        </CardContent>
      </Card>

      <!-- Feature Card -->
      <Card class="bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <CardHeader>
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <lucide-icon [img]="icons.Zap" class="h-5 w-5 text-primary-foreground" />
          </div>
          <CardTitle class="mt-4">Lightning Fast</CardTitle>
          <CardDescription>
            Experience blazing fast performance with our optimized infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm text-muted-foreground">
            @for (feature of features; track feature) {
              <li class="flex items-center gap-2">
                <lucide-icon [img]="icons.Check" class="h-4 w-4 text-green-500" />
                {{ feature }}
              </li>
            }
          </ul>
        </CardContent>
      </Card>

      <!-- Pricing Card -->
      <Card class="relative overflow-hidden">
        <div class="absolute right-0 top-0">
          <Badge class="rounded-none rounded-bl-lg">Popular</Badge>
        </div>
        <CardHeader>
          <CardTitle>Pro Plan</CardTitle>
          <CardDescription>Perfect for growing teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="mb-4">
            <span class="text-4xl font-bold">$29</span>
            <span class="text-muted-foreground">/month</span>
          </div>
          <ul class="space-y-2 text-sm">
            @for (item of pricingFeatures; track item) {
              <li class="flex items-center gap-2">
                <lucide-icon [img]="icons.Check" class="h-4 w-4 text-primary" />
                {{ item }}
              </li>
            }
          </ul>
        </CardContent>
        <CardFooter>
          <Button class="w-full">Get Started</Button>
        </CardFooter>
      </Card>

      <!-- Settings Card -->
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Settings</CardTitle>
          <CardDescription>Manage your preferences</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          @for (setting of settings; track setting.label) {
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <lucide-icon [img]="setting.icon" class="h-4 w-4 text-muted-foreground" />
                <div>
                  <p class="text-sm font-medium">{{ setting.label }}</p>
                  <p class="text-xs text-muted-foreground">{{ setting.description }}</p>
                </div>
              </div>
              <Switch [checked]="setting.enabled" />
            </div>
          }
        </CardContent>
      </Card>

      <!-- Testimonial Card -->
      <Card>
        <CardContent class="pt-6">
          <div class="flex gap-1 mb-4">
            @for (star of [1,2,3,4,5]; track star) {
              <lucide-icon [img]="icons.Star" class="h-4 w-4 fill-yellow-400 text-yellow-400" />
            }
          </div>
          <blockquote class="text-sm mb-4">
            "This product has completely transformed how our team works. The intuitive
            interface and powerful features make it indispensable."
          </blockquote>
          <div class="flex items-center gap-3">
            <ui-avatar
              class="h-8 w-8"
              src="https://i.pravatar.cc/100?img=5"
              alt="Sarah"
              fallback="SC"
            />
            <div>
              <p class="text-sm font-medium">Sarah Chen</p>
              <p class="text-xs text-muted-foreground">Product Manager at Tech Co</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Activity Feed Card -->
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            @for (activity of activities; track activity.action) {
              <div class="flex gap-3">
                <ui-avatar
                  class="h-8 w-8"
                  [src]="activity.avatar"
                  [alt]="activity.user"
                  [fallback]="activity.initials"
                />
                <div class="flex-1">
                  <p class="text-sm">
                    <span class="font-medium">{{ activity.user }}</span>
                    <span class="text-muted-foreground"> {{ activity.action }}</span>
                  </p>
                  <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
                </div>
              </div>
            }
          </div>
        </CardContent>
      </Card>

      <!-- Quick Actions Card -->
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Quick Actions</CardTitle>
          <CardDescription>Common tasks at your fingertips</CardDescription>
        </CardHeader>
        <CardContent class="grid grid-cols-2 gap-2">
          @for (action of quickActions; track action.label) {
            <Button variant="outline" class="h-auto flex-col gap-1 py-4">
              <lucide-icon [img]="action.icon" class="h-5 w-5" />
              <span class="text-xs">{{ action.label }}</span>
            </Button>
          }
        </CardContent>
      </Card>

      <!-- Engagement Card -->
      <Card>
        <CardHeader class="pb-2">
          <div class="flex items-start justify-between">
            <ui-avatar
              class="h-10 w-10"
              src="https://i.pravatar.cc/100?img=12"
              alt="Post author"
              fallback="MK"
            />
            <Button variant="ghost" size="icon">
              <lucide-icon [img]="icons.MoreHorizontal" class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-3">
          <div>
            <p class="font-medium text-sm">Mike Kim</p>
            <p class="text-xs text-muted-foreground">2 hours ago</p>
          </div>
          <p class="text-sm">
            Just shipped a major update! 🚀 Check out the new features we've been working on.
          </p>
          <div class="flex items-center gap-4 pt-2">
            <button class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <lucide-icon [img]="icons.ThumbsUp" class="h-4 w-4" />
              <span>248</span>
            </button>
            <button class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <lucide-icon [img]="icons.MessageSquare" class="h-4 w-4" />
              <span>32</span>
            </button>
            <button class="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <lucide-icon [img]="icons.Share2" class="h-4 w-4" />
              <span>Share</span>
            </button>
            <button class="ml-auto text-muted-foreground hover:text-foreground">
              <lucide-icon [img]="icons.Bookmark" class="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>

      <!-- Download Card -->
      <Card>
        <CardHeader>
          <div class="flex items-center gap-3">
            <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <lucide-icon [img]="icons.Download" class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <CardTitle class="text-base">Project_v2.zip</CardTitle>
              <CardDescription>245 MB • Uploaded 3 days ago</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <div class="flex items-center gap-1">
              <lucide-icon [img]="icons.Eye" class="h-4 w-4" />
              <span>1.2k views</span>
            </div>
            <div class="flex items-center gap-1">
              <lucide-icon [img]="icons.Download" class="h-4 w-4" />
              <span>89 downloads</span>
            </div>
          </div>
        </CardContent>
        <CardFooter class="gap-2">
          <Button class="flex-1">
            <lucide-icon [img]="icons.Download" class="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="icon">
            <lucide-icon [img]="icons.ExternalLink" class="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <!-- Security Card -->
      <Card>
        <CardHeader>
          <div class="flex items-center gap-2">
            <lucide-icon [img]="icons.Shield" class="h-5 w-5 text-green-500" />
            <CardTitle class="text-base">Security Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm">Two-factor auth</span>
            <Badge variant="outline" class="text-green-500 border-green-500">Enabled</Badge>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <span class="text-sm">Password strength</span>
            <Badge variant="outline" class="text-yellow-500 border-yellow-500">Medium</Badge>
          </div>
          <Separator />
          <div class="flex items-center justify-between">
            <span class="text-sm">Last login</span>
            <span class="text-sm text-muted-foreground">Today, 9:42 AM</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" class="w-full">
            <lucide-icon [img]="icons.Lock" class="mr-2 h-4 w-4" />
            Security Settings
          </Button>
        </CardFooter>
      </Card>

      <!-- Upgrade Card -->
      <Card class="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardHeader>
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/20">
            <lucide-icon [img]="icons.Sparkles" class="h-5 w-5" />
          </div>
          <CardTitle class="mt-4 text-primary-foreground">Upgrade to Pro</CardTitle>
          <CardDescription class="text-primary-foreground/80">
            Unlock all features and get unlimited access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm text-primary-foreground/90">
            <li class="flex items-center gap-2">
              <lucide-icon [img]="icons.Check" class="h-4 w-4" />
              Unlimited projects
            </li>
            <li class="flex items-center gap-2">
              <lucide-icon [img]="icons.Check" class="h-4 w-4" />
              Priority support
            </li>
            <li class="flex items-center gap-2">
              <lucide-icon [img]="icons.Check" class="h-4 w-4" />
              Advanced analytics
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" class="w-full">
            Upgrade Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  `,
})
export class Cards01Component {
  protected readonly icons = {
    Bell,
    Check,
    CreditCard,
    Heart,
    Mail,
    MessageSquare,
    Settings,
    Star,
    TrendingUp,
    User,
    Zap,
    ArrowRight,
    Clock,
    MapPin,
    Calendar,
    MoreHorizontal,
    Plus,
    Share2,
    Bookmark,
    ThumbsUp,
    Eye,
    Download,
    ExternalLink,
    Shield,
    Lock,
    Sparkles,
  };

  protected readonly notifications = [
    { icon: Mail, title: 'New message', description: 'You have a new message from Alex', time: '2m' },
    { icon: Bell, title: 'Reminder', description: 'Meeting in 30 minutes', time: '30m' },
    { icon: Heart, title: 'New follower', description: 'Sarah started following you', time: '1h' },
  ];

  protected readonly tasks = [
    { name: 'UI Components', progress: 85 },
    { name: 'API Integration', progress: 60 },
    { name: 'Testing', progress: 40 },
  ];

  protected readonly features = [
    'Sub-second response times',
    'Global CDN distribution',
    '99.9% uptime guarantee',
  ];

  protected readonly pricingFeatures = [
    'Unlimited projects',
    '10GB storage',
    'Priority support',
    'Advanced analytics',
    'Custom integrations',
  ];

  protected readonly settings = [
    { icon: Bell, label: 'Push Notifications', description: 'Receive push notifications', enabled: true },
    { icon: Mail, label: 'Email Updates', description: 'Get email notifications', enabled: false },
    { icon: Lock, label: 'Private Profile', description: 'Hide your profile from public', enabled: true },
  ];

  protected readonly activities = [
    { avatar: 'https://i.pravatar.cc/100?img=1', user: 'Alice', initials: 'AL', action: 'commented on your post', time: '5 min ago' },
    { avatar: 'https://i.pravatar.cc/100?img=2', user: 'Bob', initials: 'BO', action: 'liked your photo', time: '1 hour ago' },
    { avatar: 'https://i.pravatar.cc/100?img=3', user: 'Carol', initials: 'CA', action: 'started following you', time: '2 hours ago' },
  ];

  protected readonly quickActions = [
    { icon: Plus, label: 'New Project' },
    { icon: User, label: 'Add Team' },
    { icon: Settings, label: 'Settings' },
    { icon: Mail, label: 'Messages' },
  ];
}
