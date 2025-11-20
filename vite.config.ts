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
    port: 3000,
    strictPort: true, // 포트가 이미 사용 중이면 에러 발생 (포트 변경 방지)
    
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

