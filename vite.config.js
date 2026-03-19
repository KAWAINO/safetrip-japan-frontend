import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // 앱이 업데이트되면 자동으로 브라우저 캐시 갱신
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], // 아이콘들 (나중에 추가해야 함)
      manifest: {
        name: 'SafeTrip Japan',
        short_name: 'SafeTrip',
        description: '일본 여행 영유아 질의응답 및 병원 안내',
        theme_color: '#1F2937', // 우리가 방금 CSS에 적용한 다크 그레이 색상
        background_color: '#F9FAFB',
        display: 'standalone', // 브라우저 UI(주소창 등)를 숨기고 네이티브 앱처럼 보이게 함
        icons: [
          // 앱 아이콘 설정 (추후 실제 이미지 파일로 교체해야 함)
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // 빌드 시 생성되는 모든 JS, CSS, HTML 파일을 오프라인용으로 캐싱함
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ]
})