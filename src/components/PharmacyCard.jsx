// src/components/PharmacyCard.jsx
import React from 'react';
import './PharmacyCard.css'; // 전용 CSS import

// Props:
// pharmacy: 약국 데이터 객체 (name, type, is24Hours, lat, lng)
// onGetDirections: 길찾기 함수
const PharmacyCard = ({ pharmacy, onGetDirections }) => {
  return (
    <div className="pharmacy-card">
      {/* 1. 상단 정보 영역 (아이콘, 이름, 운영 정보) */}
      <div className="pharmacy-info">
        <span className="pharmacy-icon">
          {pharmacy.type === 'drugstore' ? '🛒' : '💊'}
        </span>
        <div className="pharmacy-text">
          <h3 className="pharmacy-name">{pharmacy.name}</h3>
          <p className="pharmacy-status">
            {pharmacy.is24Hours ? "✅ 24시간 영업" : "주간 영업"}
          </p>
        </div>
      </div>

      {/* 2. 하단 구글맵 길찾기 버튼 (병원 카드처럼 크고 꽉 차게) */}
      <button 
        className="google-maps-btn" 
        onClick={() => onGetDirections(pharmacy.lat, pharmacy.lng)}
      >
        🗺️ 구글 맵으로 길찾기
      </button>
    </div>
  );
};

export default PharmacyCard;