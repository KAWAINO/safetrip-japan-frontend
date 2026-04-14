// src/components/LocationSearchModal.jsx
import React, { useState } from 'react';
import './LocationSearchModal.css';

function LocationSearchModal({ isOpen, onClose, onSearch }) {
    const [keyword, setKeyword] = useState('');

    if (!isOpen) return null;

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (!keyword.trim()) return alert("지역명을 입력해주세요.");
        onSearch(keyword);
        setKeyword(''); // 입력창 초기화
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>🔍 다른 지역 검색</h3>
                
                <div className="notice-box">
                    <p>⚠️ 인터넷 연결이 불안정하거나<br/>GPS 위치가 부정확할 때 이용해주세요.</p>
                </div>

                <form onSubmit={handleSearchSubmit}>
                    <input 
                        type="text" 
                        className="search-input"
                        placeholder="예: 오사카 도톤보리, 신주쿠역"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button type="submit" className="search-submit-btn">검색하기</button>
                </form>

                <button className="modal-close-btn" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
}

export default LocationSearchModal;