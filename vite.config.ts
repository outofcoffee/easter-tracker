import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

let base = '/'
if (process.env.GITHUB_PAGES === 'true') {
  base = '/easter-tracker/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  // No special handling needed anymore
  optimizeDeps: {
    exclude: []
  },
  // Don't override Vite's environment variable handling
  // Let Vite handle VITE_* prefixed env variables automatically
})