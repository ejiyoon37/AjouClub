import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://ajouclubserver.shop',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), 
        secure: false,//개발 끝나면 true로
      },
    },
  },
})