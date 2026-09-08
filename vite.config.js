import { defineConfig } from 'vite'

export default defineConfig({
  base: '/grok-bot-demo/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
