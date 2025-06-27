import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-6vwahx6d.js']
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
