import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  // Build configuration
  build: {
    rollupOptions: {
      input: {
        main: 'index.html'  // Specifies the main entry point
      }
    }
  },
  // Server configuration
  server: {
    port: 5173,  // Sets the development server port
    hmr: {
      overlay: true
    }
  }
})
