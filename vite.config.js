import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project under the repository name.
  base: '/Cookie-Clicker/',
  plugins: [react()],
})
