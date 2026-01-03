/// <reference types="vitest" />
import angular from '@analogjs/vitest-angular';
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
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/app/lib'),
      '@/ui': resolve(__dirname, './src/app/lib/components/ui'),
      '@/utils': resolve(__dirname, './src/app/lib/utils'),
    },
  },
});
