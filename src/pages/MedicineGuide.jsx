// src/pages/MedicineGuide.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import drugsData from '../data/drugs.json'; // 💡 JSON 파일 직접 임포트!
import './MedicineGuide.css';

function MedicineGuide() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const passedUserType = location.state?.userType || 'adult';
    const categoryId = location.state?.categoryId || null;
    const categoryName = location.state?.categoryName || '';

    const [activeTab, setActiveTab] = useState(passedUserType);

    // 💡 별도의 useEffect나 fetch 없이 JSON 데이터를 즉시 필터링
    const currentData = drugsData.filter(medicine => {
        const isMatchTab = medicine.target === activeTab;
        const isMatchCategory = categoryId ? medicine.category === categoryId : true;
        return isMatchTab && isMatchCategory;
    });

    const handleCardClick = (medicine) => {
        navigate(`/medicine-detail/${medicine.id}`, { state: { medicine } });
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container guide-container">
                <div className="title-area guide-title-area">
                    <h1 className="title">🎒 일본 국민 상비약 도감</h1>
                    <p className="guide-desc">
                        {categoryId ? `지금 선택하신 '${categoryName}' 추천 리스트입니다.` : '드럭스토어에서 가장 많이 찾는 필수 상비약입니다.'}
                    </p>
                </div>

                {!categoryId && (
                    <div className="tab-container">
                        <button 
                            className={`tab-btn ${activeTab === 'adult' ? 'active' : ''}`}
                            onClick={() => setActiveTab('adult')}
                        >
                            👩 성인용
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'child' ? 'active' : ''}`}
                            onClick={() => setActiveTab('child')}
                        >
                            👶 어린이용
                        </button>
                    </div>
                )}

                <div className="medicine-list">
                    {currentData.length > 0 ? (
                        currentData.map((medicine, index) => (
                            <div 
                                key={medicine.id || index} 
                                className="medicine-card"
                                onClick={() => handleCardClick(medicine)}
                            >
                                {medicine.warning && (
                                    <div className="warning-badge">
                                        🚨 {medicine.warning}
                                    </div>
                                )}
                                <div className="medicine-header">
                                    <img 
                                        src={medicine.imgUrl} 
                                        alt={medicine.krName} 
                                        className="medicine-img" 
                                    />
                                    <div className="medicine-info">
                                        <h3 className="medicine-name-kr">{medicine.krName}</h3>
                                        <p className="medicine-name-jp">{medicine.jpName}</p>
                                        <div className="medicine-tags">
                                            {medicine.tags && medicine.tags.split(',').map(tag => (
                                                <span key={tag} className="tag">#{tag.trim()}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-link">
                                    자세히 보기 ➡️
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <p>해당 카테고리의 추천 상비약 데이터가 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MedicineGuide;