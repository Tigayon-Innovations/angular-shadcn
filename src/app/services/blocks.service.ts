import { Injectable, signal } from '@angular/core';

export interface Block {
  name: string;
  slug: string;
  description: string;
  category: string;
  image?: string;
  code?: string;
  featured?: boolean;
  componentPath?: string;
}

export interface BlockCategory {
  name: string;
  slug: string;
  description: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class BlocksService {
  private blocks = signal<Block[]>([
    // Featured Blocks
    {
      name: 'Dashboard 01',
      slug: 'dashboard-01',
      description: 'A dashboard with sidebar, charts and data table.',
      category: 'dashboard',
      featured: true,
      componentPath: '@/blocks/dashboard-01',
    },
    // Sidebar Blocks
    {
      name: 'Sidebar 01',
      slug: 'sidebar-01',
      description: 'A sidebar with navigation and user profile.',
      category: 'sidebar',
      featured: true,
      componentPath: '@/blocks/sidebar-01',
    },
    {
      name: 'Sidebar 02',
      slug: 'sidebar-02',
      description: 'A collapsible sidebar with icons.',
      category: 'sidebar',
      componentPath: '@/blocks/sidebar-02',
    },
    {
      name: 'Sidebar 03',
      slug: 'sidebar-03',
      description: 'A sidebar with submenus.',
      category: 'sidebar',
      componentPath: '@/blocks/sidebar-03',
    },
    {
      name: 'Sidebar 07',
      slug: 'sidebar-07',
      description: 'A sidebar that collapses to icons.',
      category: 'sidebar',
      componentPath: '@/blocks/sidebar-07',
    },
    // Login Blocks
    {
      name: 'Login 01',
      slug: 'login-01',
      description: 'A simple login form with email and password.',
      category: 'login',
      featured: true,
      componentPath: '@/blocks/login-01',
    },
    {
      name: 'Login 02',
      slug: 'login-02',
      description: 'A login form with social login options.',
      category: 'login',
      componentPath: '@/blocks/login-02',
    },
    {
      name: 'Login 03',
      slug: 'login-03',
      description: 'A login page with a muted background color.',
      category: 'login',
      componentPath: '@/blocks/login-03',
    },
    {
      name: 'Login 04',
      slug: 'login-04',
      description: 'A login page with form and image.',
      category: 'login',
      componentPath: '@/blocks/login-04',
    },
    {
      name: 'Login 05',
      slug: 'login-05',
      description: 'A minimal email-only login page.',
      category: 'login',
      componentPath: '@/blocks/login-05',
    },
    // Signup Blocks
    {
      name: 'Signup 01',
      slug: 'signup-01',
      description: 'A simple signup form.',
      category: 'signup',
      featured: true,
      componentPath: '@/blocks/signup-01',
    },
    {
      name: 'Signup 02',
      slug: 'signup-02',
      description: 'A signup form with terms and conditions.',
      category: 'signup',
      componentPath: '@/blocks/signup-02',
    },
    // OTP Blocks
    {
      name: 'OTP 01',
      slug: 'otp-01',
      description: 'A simple OTP verification form.',
      category: 'otp',
      featured: true,
      componentPath: '@/blocks/otp-01',
    },
    {
      name: 'OTP 02',
      slug: 'otp-02',
      description: 'An OTP form with resend functionality.',
      category: 'otp',
      componentPath: '@/blocks/otp-02',
    },
    // Pricing Blocks
    {
      name: 'Pricing 01',
      slug: 'pricing-01',
      description: 'A pricing table with three tiers.',
      category: 'pricing',
      featured: true,
      componentPath: '@/blocks/pricing-01',
    },
    // Settings Blocks
    {
      name: 'Settings 01',
      slug: 'settings-01',
      description: 'A settings page with tabs for general, security, and notifications.',
      category: 'settings',
      featured: true,
      componentPath: '@/blocks/settings-01',
    },
    // Payment Blocks
    {
      name: 'Payment 01',
      slug: 'payment-01',
      description: 'A payment form with card and billing information.',
      category: 'payment',
      featured: true,
      componentPath: '@/blocks/payment-01',
    },
    // Calendar Blocks
    {
      name: 'Calendar 01',
      slug: 'calendar-01',
      description: 'A calendar with event management.',
      category: 'calendar',
      featured: true,
      componentPath: '@/blocks/calendar-01',
    },
    // Dashboard 02
    {
      name: 'Dashboard 02',
      slug: 'dashboard-02',
      description: 'An analytics dashboard with charts and stats.',
      category: 'dashboard',
      componentPath: '@/blocks/dashboard-02',
    },
    // Products
    {
      name: 'Products 01',
      slug: 'products-01',
      description: 'A product management table with filters.',
      category: 'products',
      featured: true,
      componentPath: '@/blocks/products-01',
    },
    // Chat
    {
      name: 'Chat 01',
      slug: 'chat-01',
      description: 'A chat interface with message history.',
      category: 'chat',
      featured: true,
      componentPath: '@/blocks/chat-01',
    },
  ]);

  private categories = signal<BlockCategory[]>([
    {
      name: 'Dashboard',
      slug: 'dashboard',
      description: 'Dashboard layouts with charts and data tables',
      count: 2,
    },
    {
      name: 'Sidebar',
      slug: 'sidebar',
      description: 'Sidebar navigation components',
      count: 4,
    },
    {
      name: 'Login',
      slug: 'login',
      description: 'Login and authentication forms',
      count: 5,
    },
    {
      name: 'Signup',
      slug: 'signup',
      description: 'Registration and signup forms',
      count: 2,
    },
    {
      name: 'OTP',
      slug: 'otp',
      description: 'OTP verification forms',
      count: 2,
    },
    {
      name: 'Pricing',
      slug: 'pricing',
      description: 'Pricing tables and subscription plans',
      count: 1,
    },
    {
      name: 'Settings',
      slug: 'settings',
      description: 'Settings and preferences pages',
      count: 1,
    },
    {
      name: 'Payment',
      slug: 'payment',
      description: 'Payment and checkout forms',
      count: 1,
    },
    {
      name: 'Calendar',
      slug: 'calendar',
      description: 'Calendar and scheduling components',
      count: 1,
    },
    {
      name: 'Products',
      slug: 'products',
      description: 'Product listing and management tables',
      count: 1,
    },
    {
      name: 'Chat',
      slug: 'chat',
      description: 'Chat and messaging interfaces',
      count: 1,
    },
  ]);

  getBlocks() {
    return this.blocks();
  }

  getFeaturedBlocks() {
    return this.blocks().filter((block) => block.featured);
  }

  getBlocksByCategory(category: string) {
    return this.blocks().filter((block) => block.category === category);
  }

  getBlockBySlug(slug: string) {
    return this.blocks().find((block) => block.slug === slug);
  }

  getCategories() {
    return this.categories();
  }

  getCategoryBySlug(slug: string) {
    return this.categories().find((category) => category.slug === slug);
  }
}
