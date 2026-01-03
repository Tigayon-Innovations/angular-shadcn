import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/ui/collapsible';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Separator } from '@/ui/separator';
import { Skeleton } from '@/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';
import { Textarea } from '@/ui/textarea';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertCircle, ChevronsUpDown, LucideAngularModule, Moon, Sun, Terminal } from 'lucide-angular';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    Input,
    Label,
    Badge,
    Separator,
    Skeleton,
    Alert,
    AlertTitle,
    AlertDescription,
    Avatar,
    AvatarImage,
    AvatarFallback,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Textarea,
    LucideAngularModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('shadcn-angular');
  protected readonly isDark = signal(false);
  protected readonly collapsibleOpen = signal(false);

  protected readonly icons = { Terminal, AlertCircle, Sun, Moon, ChevronsUpDown };

  toggleDarkMode() {
    this.isDark.update((v) => !v);
    document.documentElement.classList.toggle('dark', this.isDark());
  }
}

