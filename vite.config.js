import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6969,
    host: 'localhost',
    // Configure proxy for API calls if needed
    proxy: {
      // Uncomment to proxy API calls to backend server
      // '/api': {
      //   target: 'http://localhost:8080',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  }
})
