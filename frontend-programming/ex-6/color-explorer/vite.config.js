import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true, // automatically open browser on server start
    host: true  // listen on all local IPs
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for better debugging
    sourcemap: true,
    // Optimize dependencies
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunk
          vendor: []
        }
      }
    }
  },
  css: {
    // Enable CSS source maps in development
    devSourcemap: true
  }
})