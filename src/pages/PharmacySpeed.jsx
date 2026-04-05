// src/pages/PharmacySpeed.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { pharmacyData } from '../data/pharmacyData';
import './PharmacySpeed.css';

function PharmacySpeed() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCard, setSelectedCard] = useState(null);
    
    const [selectedSubs, setSelectedSubs] = useState([]);

    const userType = location.state?.type || 'adult';
    const speedCards = pharmacyData[userType];

    const finalJp = selectedCard?.displayJp || selectedCard?.jp;

    const toggleSub = (sub) => {
        setSelectedSubs(prev => {
            const isAlreadySelected = prev.find(s => s.id === sub.id);
            if (isAlreadySelected) {
                return prev.filter(s => s.id !== sub.id);
            } else {
                return [...prev, sub];
            }
        });
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ paddingBottom: '40px' }}>
                <h2 className="title">직원에게 보여주세요.</h2>
                <p className="speed-desc">찾으시는 약을 선택하면 일본어 화면이 크게 표시됩니다.</p>

                <div className="flash-card">
                    {selectedCard ? (
                        <>
                            <p className="flash-title">以下の薬を探しています。<br/><span style={{fontSize:'12px', color:'#DC2626'}}>(아래의 약을 찾고 있습니다.)</span></p>
                            
                            {/* 💡 다시 위아래로 시원하게 분리! */}
                            <span className="flash-icon">{selectedCard.icon}</span>
                            <h1 className="flash-jp">{finalJp}</h1>
                            
                            <p className="flash-kr">{selectedCard.kr}</p>

                            {selectedSubs.length > 0 && (
                                <div className="flash-symptoms-box">
                                    <p className="flash-symptoms-title">
                                        次のような症状を伴っています。<br/>
                                        <span>(다음 증상을 동반하고 있습니다.)</span>
                                    </p>
                                    <ul className="flash-symptoms-list">
                                        {selectedSubs.map(sub => (
                                            <li key={sub.id}>
                                                • {sub.jp} <span>({sub.label})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="flash-empty">아래에서 필요한 약 종류를 선택하세요.</p>
                    )}
                </div>

                <div className="speed-grid">
                    {speedCards.map(card => (
                        <button 
                            key={card.id}
                            onClick={() => {
                                setSelectedCard(card);
                                setSelectedSubs([]);
                            }}
                            className={`speed-btn ${selectedCard?.id === card.id ? 'active' : ''}`}
                        >
                            <span className="speed-btn-icon">{card.icon}</span>
                            <span>{card.kr}</span>
                        </button>
                    ))}
                </div>

                {selectedCard?.subSymptoms && (
                    <div className="sub-symptom-area">
                        <p className="sub-symptom-title">💡 동반하는 증상을 모두 선택하세요</p>
                        <div className="sub-grid">
                            {selectedCard.subSymptoms.map(sub => {
                                const isActive = selectedSubs.find(s => s.id === sub.id);
                                return (
                                    <button
                                        key={sub.id}
                                        onClick={() => toggleSub(sub)}
                                        className={`sub-btn ${isActive ? 'active' : ''}`}
                                    >
                                        {sub.label} {isActive && '✔'}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <button 
                    className="primary-btn guide-link-btn" 
                    onClick={() => navigate('/medicine-guide')}
                >
                    🎒 사진으로 찾기 (상비약 도감)
                </button>
            </div>
        </>
    );
}

export default PharmacySpeed;