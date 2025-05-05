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
    sourcemap: true,
    rollupOptions: {
      // Avoid bundling modules that are loaded at runtime
      external: ['@geo-maps/earth-lands-1km', '@geo-maps/earth-lands-1km/map.geo.json']
    }
  },
  resolve: {
    // Tell Vite not to try to resolve the GeoJSON module during bundling
    alias: {
      '@geo-maps/earth-lands-1km': 'empty-module.js',
      '@geo-maps/earth-lands-1km/map.geo.json': 'empty-module.js'
    }
  },
  define: {
    'import.meta.env': JSON.stringify(process.env)
  }
})