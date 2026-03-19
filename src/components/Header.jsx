// src/components/Header.jsx
import React from 'react';

// Props:
// onBack: 뒤로가기 함수 (있을 때만 버튼 노출)
// onMenuClick: 햄버거 메뉴 클릭 함수 (나중에 연결 예정)
const Header = ({ onBack, onMenuClick }) => {
  return (
    <header className="app-header">
      {/* 1. 왼쪽 영역 (뒤로가기) */}
      <div className="header-left">
        {onBack && (
          <button onClick={onBack} className="back-btn" aria-label="뒤로가기">
            ⬅ 뒤로
          </button>
        )}
      </div>

      {/* 2. 중앙 영역 (나중에 로고나 타이틀이 들어갈 수 있음. 현재는 공백) */}
      <div className="header-center">
        {/* <h1 className="header-title">SafeTrip</h1> */}
      </div>

      {/* 3. 오른쪽 영역 (햄버거 메뉴) */}
      <div className="header-right">
        <button onClick={onMenuClick} className="menu-btn" aria-label="메뉴 열기">
          {/* HTML 엔티티를 이용한 삼선(햄버거) 아이콘 */}
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;