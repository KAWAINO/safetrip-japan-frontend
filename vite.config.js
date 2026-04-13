import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], 
      manifest: {
        name: 'SafeTrip Japan',
        short_name: 'SafeTrip',
        description: '일본 여행 영유아 질의응답 및 병원 안내',
        theme_color: '#1F2937', 
        background_color: '#F9FAFB',
        display: 'standalone', 
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // 💡 안드로이드 아이콘 깨짐 방지 (이것만 추가함!)
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}']
      }
    })
  ]
})