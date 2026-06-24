import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // Served from the domain root by default (Netlify, local dev). The GitHub
  // Pages workflow sets VITE_BASE=/cmc-website/ so the project site resolves
  // its assets and routes under that sub-path.
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
