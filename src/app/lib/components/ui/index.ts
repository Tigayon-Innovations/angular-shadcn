// UI Components Public API

// Accordion
export {
    ACCORDION_CONTEXT,
    ACCORDION_ITEM_CONTEXT, Accordion, AccordionContent,
    AccordionItem,
    AccordionTrigger,
    type AccordionContext,
    type AccordionItemContext,
    type AccordionType
} from './accordion';

// Alert
export { Alert, AlertDescription, AlertTitle, alertVariants, type AlertVariants } from './alert';

// AlertDialog
export {
    ALERT_DIALOG_CONTEXT,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    type AlertDialogContextValue
} from './alert-dialog';

// Breadcrumb
export {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from './breadcrumb';

// AspectRatio
export { AspectRatio } from './aspect-ratio';

// Avatar
export { Avatar, AvatarFallback, AvatarImage, UiAvatar } from './avatar';

// Badge
export { Badge, badgeVariants, type BadgeVariants } from './badge';

// Button
export { Button, buttonVariants, type ButtonVariants } from './button';

// Card
export {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from './card';

// Checkbox
export { Checkbox } from './checkbox';

// Collapsible
export {
    COLLAPSIBLE_CONTEXT, Collapsible, CollapsibleContent,
    CollapsibleTrigger,
    type CollapsibleContext
} from './collapsible';

// Dialog
export {
    DIALOG_CONTEXT, Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    type DialogContextValue
} from './dialog';

// Drawer
export {
    DRAWER_CONTEXT, Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    type DrawerContextValue
} from './drawer';

// Form
export {
    FORM_CONTEXT,
    FORM_FIELD_CONTEXT, Form, FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    type FormContext,
    type FormFieldContext
} from './form';

// HoverCard
export {
    HOVER_CARD_CONTEXT,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    type HoverCardContextValue
} from './hover-card';

// Input
export { Input } from './input';

// Label
export { Label } from './label';

// Pagination
export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from './pagination';

// Popover
export {
    POPOVER_CONTEXT, Popover, PopoverAnchor,
    PopoverContent,
    PopoverTrigger,
    type PopoverContextValue
} from './popover';

// Progress
export { Progress } from './progress';

// RadioGroup
export {
    RADIO_GROUP_CONTEXT,
    RadioGroup,
    RadioGroupItem,
    type RadioGroupContext
} from './radio-group';

// Resizable
export {
    RESIZABLE_CONTEXT,
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
    type ResizableContextValue
} from './resizable';

// ScrollArea
export { ScrollArea, ScrollBar } from './scroll-area';

// Select
export {
    SELECT_CONTEXT,
    SELECT_GROUP_CONTEXT, Select, SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    type SelectContext,
    type SelectGroupContext
} from './select';

// Separator
export { Separator } from './separator';

// Sheet
export {
    SHEET_CONTEXT, Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    sheetVariants,
    type SheetContextValue,
    type SheetVariants
} from './sheet';

// Skeleton
export { Skeleton } from './skeleton';

// Slider
export { Slider } from './slider';

// Switch
export { Switch } from './switch';

// Table
export {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from './table';

// Tabs
export {
    TABS_CONTEXT, Tabs, TabsContent,
    TabsList,
    TabsTrigger,
    type TabsContext
} from './tabs';

// Textarea
export { Textarea } from './textarea';

// Toggle
export { Toggle, toggleVariants, type ToggleVariants } from './toggle';

// ToggleGroup
export {
    TOGGLE_GROUP_CONTEXT,
    ToggleGroup,
    ToggleGroupItem,
    type ToggleGroupContext
} from './toggle-group';

// Tooltip
export {
    TOOLTIP_CONTEXT, Tooltip, TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    type TooltipContextValue
} from './tooltip';

// Calendar
export { Calendar } from './calendar';

// Carousel
export {
    CAROUSEL_CONTEXT, Carousel, CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselContextValue,
    type CarouselOrientation
} from './carousel';

// Command
export {
    COMMAND_CONTEXT, Command, CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    type CommandContextValue
} from './command';

// ContextMenu
export {
    CONTEXT_MENU_CONTEXT,
    CONTEXT_MENU_RADIO_GROUP_CONTEXT,
    CONTEXT_MENU_SUB_CONTEXT,
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
    type ContextMenuContextValue,
    type ContextMenuPosition,
    type ContextMenuRadioGroupContext,
    type ContextMenuSubContext
} from './context-menu';

// DatePicker
export { DatePicker } from './date-picker';

// DropdownMenu
export {
    DROPDOWN_MENU_CONTEXT,
    DROPDOWN_MENU_RADIO_GROUP_CONTEXT,
    DROPDOWN_MENU_SUB_CONTEXT,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    type DropdownMenuContextValue,
    type DropdownMenuRadioGroupContext,
    type DropdownMenuSubContext
} from './dropdown-menu';

// InputOTP
export {
    INPUT_OTP_CONTEXT,
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
    type InputOTPContextValue
} from './input-otp';

// Menubar
export {
    MENUBAR_CONTEXT,
    MENUBAR_MENU_CONTEXT,
    MENUBAR_RADIO_GROUP_CONTEXT,
    MENUBAR_SUB_CONTEXT, Menubar, MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarLabel,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
    type MenubarContextValue,
    type MenubarMenuContextValue,
    type MenubarRadioGroupContext,
    type MenubarSubContext
} from './menubar';

// NavigationMenu
export {
    NAVIGATION_MENU_CONTEXT,
    NAVIGATION_MENU_ITEM_CONTEXT,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, NavigationMenuViewport, navigationMenuTriggerStyle, type NavigationMenuContextValue,
    type NavigationMenuItemContextValue,
    type NavigationMenuTriggerStyleProps
} from './navigation-menu';

// Toast
export {
    Toast,
    ToastAction,
    ToastDescription, ToastService,
    ToastTitle, Toaster, toastVariants,
    type ToastData,
    type ToastOptions,
    type ToastType,
    type ToastVariants
} from './toast';

// ============================================
// Phase 7: Extended Components
// ============================================

// Spinner
export { Spinner, spinnerVariants, type SpinnerVariants } from './spinner';

// Kbd
export { Kbd, kbdVariants, type KbdVariants } from './kbd';

// Empty
export {
    Empty,
    EmptyAction,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle
} from './empty';

// Typography
export {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode,
    TypographyLarge,
    TypographyLead,
    TypographyList,
    TypographyMuted,
    TypographyP,
    TypographySmall
} from './typography';

// ButtonGroup
export {
    ButtonGroup,
    buttonGroupVariants,
    type ButtonGroupVariants
} from './button-group';

// InputGroup
export {
    InputGroup,
    InputGroupAddon,
    InputGroupInput
} from './input-group';

// NativeSelect
export {
    NativeSelect,
    nativeSelectVariants,
    type NativeSelectVariants
} from './native-select';

// Segmented
export {
    SEGMENTED_CONTEXT,
    Segmented,
    SegmentedItem,
    segmentedItemVariants,
    segmentedVariants,
    type SegmentedContext,
    type SegmentedItemVariants,
    type SegmentedVariants
} from './segmented';

// Combobox
export {
    COMBOBOX_CONTEXT,
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxTrigger,
    ComboboxValue,
    type ComboboxContext,
    type ComboboxOption
} from './combobox';

// ============================================
// Phase 8: Advanced Components
// ============================================

// Sidebar
export {
    SIDEBAR_CONTEXT,
    SIDEBAR_COOKIE_MAX_AGE,
    SIDEBAR_COOKIE_NAME,
    SIDEBAR_KEYBOARD_SHORTCUT,
    SIDEBAR_MENU_CONTEXT,
    SIDEBAR_WIDTH,
    SIDEBAR_WIDTH_ICON,
    SIDEBAR_WIDTH_MOBILE,
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarInset,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarSeparator,
    SidebarTrigger,
    type SidebarCollapsible,
    type SidebarContext,
    type SidebarSide,
    type SidebarState,
    type SidebarVariant
} from './sidebar';

// DataTable
export {
    DATA_TABLE_CONTEXT,
    DataTable,
    DataTableContent,
    DataTablePagination,
    DataTableSearch,
    DataTableToolbar,
    DataTableViewOptions,
    type ColumnDef,
    type ColumnVisibilityState,
    type DataTableContext,
    type RowSelectionState,
    type SortDirection,
    type SortingState
} from './data-table';

// Chart
export {
    CHART_COLORS,
    CHART_CONTEXT,
    Chart,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
    type ChartContext,
    type ChartDataPoint,
    type ChartSeries,
    type ChartType
} from './chart';

