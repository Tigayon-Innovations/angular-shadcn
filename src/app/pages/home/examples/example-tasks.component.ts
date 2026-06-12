import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Input } from '@/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Circle,
  CircleHelp,
  LucideAngularModule,
  MoreHorizontal,
  SlidersHorizontal,
  Timer,
} from 'lucide-angular';

type TaskStatus = 'Todo' | 'In Progress' | 'Done' | 'Backlog';
type TaskPriority = 'Low' | 'Medium' | 'High';
type TaskType = 'Bug' | 'Feature' | 'Documentation';

interface Task {
  id: string;
  type: TaskType;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}

@Component({
  selector: 'example-tasks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Badge,
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    LucideAngularModule,
  ],
  template: `
    <div class="flex flex-col gap-4 p-4 md:p-8">
      <!-- Heading -->
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p class="text-muted-foreground">Here's a list of your tasks for this month.</p>
      </div>

      <!-- Toolbar -->
      <div class="flex items-center justify-between gap-2">
        <input Input placeholder="Filter tasks..." class="h-8 w-[150px] lg:w-[250px]" />
        <Button variant="outline" size="sm" class="ml-auto h-8 gap-2">
          <lucide-icon [img]="icons.SlidersHorizontal" class="h-4 w-4" />
          View
        </Button>
      </div>

      <!-- Table -->
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead class="w-10">
                <Checkbox aria-label="Select all" />
              </TableHead>
              <TableHead class="w-[100px]">Task</TableHead>
              <TableHead>Title</TableHead>
              <TableHead class="w-[140px]">Status</TableHead>
              <TableHead class="w-[120px]">Priority</TableHead>
              <TableHead class="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            @for (task of tasks; track task.id) {
              <TableRow>
                <TableCell>
                  <Checkbox [attr.aria-label]="'Select task ' + task.id" />
                </TableCell>
                <TableCell class="font-medium text-muted-foreground">{{ task.id }}</TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">{{ task.type }}</Badge>
                    <span class="max-w-[320px] truncate font-medium lg:max-w-[480px]">
                      {{ task.title }}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <lucide-icon [img]="statusIcon(task.status)" class="h-4 w-4" />
                    <span class="text-sm">{{ task.status }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div class="flex items-center gap-2 text-muted-foreground">
                    <lucide-icon [img]="priorityIcon(task.priority)" class="h-4 w-4" />
                    <span class="text-sm">{{ task.priority }}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" class="h-8 w-8">
                        <lucide-icon [img]="icons.MoreHorizontal" class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-40">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Make a copy</DropdownMenuItem>
                      <DropdownMenuItem>Favorite</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </div>

      <!-- Pagination footer -->
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm text-muted-foreground">0 of {{ tasks.length }} row(s) selected.</p>
        <div class="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  `,
})
export class ExampleTasks {
  protected readonly icons = { SlidersHorizontal, MoreHorizontal };

  protected readonly tasks: Task[] = [
    {
      id: 'TASK-8782',
      type: 'Documentation',
      title: "You can't compress the program without quantifying the open-source SSD pixel!",
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 'TASK-7878',
      type: 'Documentation',
      title: 'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
      status: 'Backlog',
      priority: 'Medium',
    },
    {
      id: 'TASK-7839',
      type: 'Bug',
      title: 'We need to bypass the neural TCP card!',
      status: 'Todo',
      priority: 'High',
    },
    {
      id: 'TASK-5562',
      type: 'Feature',
      title: 'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
      status: 'Backlog',
      priority: 'Medium',
    },
    {
      id: 'TASK-8686',
      type: 'Feature',
      title: "I'll parse the wireless SSL protocol, that should driver the API panel!",
      status: 'Done',
      priority: 'Medium',
    },
    {
      id: 'TASK-1280',
      type: 'Bug',
      title: 'Use the digital TLS panel, then you can transmit the haptic system!',
      status: 'Done',
      priority: 'High',
    },
    {
      id: 'TASK-7262',
      type: 'Feature',
      title: 'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
      status: 'Done',
      priority: 'High',
    },
    {
      id: 'TASK-1138',
      type: 'Feature',
      title: "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 'TASK-7184',
      type: 'Feature',
      title: 'We need to program the back-end THX pixel!',
      status: 'Todo',
      priority: 'Low',
    },
    {
      id: 'TASK-5160',
      type: 'Documentation',
      title: "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
      status: 'In Progress',
      priority: 'High',
    },
  ];

  protected statusIcon(status: TaskStatus) {
    switch (status) {
      case 'Todo':
        return Circle;
      case 'In Progress':
        return Timer;
      case 'Done':
        return CheckCircle2;
      case 'Backlog':
        return CircleHelp;
    }
  }

  protected priorityIcon(priority: TaskPriority) {
    switch (priority) {
      case 'Low':
        return ArrowDown;
      case 'Medium':
        return ArrowRight;
      case 'High':
        return ArrowUp;
    }
  }
}
