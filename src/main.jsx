import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/main.css' // 전역 CSS (App.css를 쓴다면 맞춰서 변경)

// PWA Service Worker 등록
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    // 앱의 새로운 버전이 배포되었을 때 사용자에게 알림을 줄 수 있는 로직
    console.log("새로운 업데이트가 있습니다.");
  },
  onOfflineReady() {
    // 오프라인 캐싱이 완료되었을 때 실행됨
    console.log("이제 오프라인에서도 앱을 사용할 수 있습니다!");
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)