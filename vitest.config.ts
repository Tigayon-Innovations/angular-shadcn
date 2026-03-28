/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/app/**/*.ts'],
      exclude: ['src/app/**/*.spec.ts', 'src/app/**/*.routes.ts', 'src/app/**/*.config.ts'],
    },
  },
  optimizeDeps: {
    entries: ['src/**/*.spec.ts'],
  },
  resolve: {
    alias: [
      { find: '@/components', replacement: resolve(__dirname, './src/app/components') },
      { find: '@/services', replacement: resolve(__dirname, './src/app/services') },
      { find: '@/data', replacement: resolve(__dirname, './src/app/data') },
      { find: '@/pages', replacement: resolve(__dirname, './src/app/pages') },
      { find: '@/lib', replacement: resolve(__dirname, './src/app/lib') },
      { find: '@/ui', replacement: resolve(__dirname, './src/app/lib/components/ui') },
      { find: '@/utils', replacement: resolve(__dirname, './src/app/lib/utils') },
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
});
