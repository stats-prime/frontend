import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ['browser', 'import', 'module', 'default'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
})
