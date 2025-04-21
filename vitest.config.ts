import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/utils/**/*.ts'],
      exclude: ['src/utils/**/*.d.ts', '**/node_modules/**'],
      thresholds: {
        lines: 70,
        branches: 70,
        functions: 90,
        statements: 70
      }
    }
  },
});