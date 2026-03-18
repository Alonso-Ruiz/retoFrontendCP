import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/payu-api': {
        target: 'https://sandbox.api.payulatam.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payu-api/, '')
      }
    }
  }
})
