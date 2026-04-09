// src/pages/PharmacySpeed.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { pharmacyData } from '../data/pharmacyData';
import './PharmacySpeed.css';

// 💡 나이 번역용 사전 (Home에서 넘어온 텍스트를 일본어로 매핑)
const ageJpMap = {
    '1세 (12개월) 미만': '1歳（12ヶ月）未満',
    '1세 이상 ~ 2세 미만': '1歳以上〜2歳（24ヶ月）未満',
    '2세 (24개월) 이상': '2歳（24ヶ月）以上'
};

function PharmacySpeed() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedSubs, setSelectedSubs] = useState([]);

    const userType = location.state?.type || 'adult';
    const ageLabel = location.state?.ageLabel || ''; // 💡 Home에서 넘어온 나이 정보
    
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

                {/* 💡 소아(child) 모드일 때만 나타나는 나이 안내 박스 */}
                {userType === 'child' && ageLabel && (
                    <div style={{ backgroundColor: '#EFF6FF', border: '2px solid #BFDBFE', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                        <p style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#1D4ED8', wordBreak: 'keep-all', lineHeight: '1.4' }}>
                            この方は子供用の薬を探しています。<br/>
                            対象年齢：<span style={{ textDecoration: 'underline' }}>{ageJpMap[ageLabel] || ageLabel}</span>
                        </p>
                        <p style={{ margin: 0, fontSize: '13px', color: '#3B82F6', fontWeight: '600' }}>
                            (이 사람은 아이의 약을 찾고 있습니다. 연령대는 {ageLabel}입니다.)
                        </p>
                    </div>
                )}

                <div className="flash-card">
                    {selectedCard ? (
                        <>
                            <p className="flash-title">以下の薬を探しています。<br/><span style={{fontSize:'12px', color:'#DC2626'}}>(아래의 약을 찾고 있습니다.)</span></p>
                            
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

{selectedCard ? (
                    <button 
                        className="primary-btn guide-link-btn" 
                        onClick={() => navigate('/medicine-guide', { 
                            state: { 
                                userType: userType, 
                                categoryId: selectedCard.id, 
                                categoryName: selectedCard.kr 
                            } 
                        })}
                    >
                        🎒 [{selectedCard.kr}] 추천 상비약 보기
                    </button>
                ) : (
                    <button 
                        className="primary-btn guide-link-btn" 
                        style={{ backgroundColor: '#D1D5DB', color: '#6B7280', cursor: 'not-allowed' }}
                        disabled
                    >
                        🎒 찾으시는 약을 먼저 선택해주세요
                    </button>
                )}
            </div>
        </>
    );
}

export default PharmacySpeed;