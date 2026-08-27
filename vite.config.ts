import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `base` is set for the production build only, so assets resolve under the
// GitHub Pages project path (bjdealey.github.io/component-playground/). Dev
// stays at `/`.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/component-playground/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
}))
