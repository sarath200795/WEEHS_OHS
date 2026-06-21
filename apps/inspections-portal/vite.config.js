import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5183,
    strictPort: true,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy, self-contained libs into their own chunks. Route-level
        // React.lazy (see src/App.jsx) means a chunk like xlsx is only fetched
        // when its page is opened.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          const m = id.split('node_modules/')[1] || ''
          const pkg = m.startsWith('@') ? m.split('/').slice(0, 2).join('/') : m.split('/')[0]
          if (pkg === 'xlsx') return 'xlsx'
          if (pkg === 'firebase' || pkg.startsWith('@firebase')) return 'firebase'
          if (pkg === 'three' || pkg === '@react-three/fiber' || pkg === '@react-three/drei') return 'three'
          return undefined
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
})
