import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/final-year-project-ct-scans/' // Set the base path to match your GitHub Pages URL
})
