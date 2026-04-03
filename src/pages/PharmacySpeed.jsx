// src/pages/PharmacySpeed.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 💡 useLocation 추가!
import Header from '../components/Header';
import { pharmacyData } from '../data/pharmacyData'; // 💡 분리한 데이터 불러오기!

function PharmacySpeed() {
    const navigate = useNavigate();
    const location = useLocation(); // 수하물(쪽지) 확인하는 도구
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedSub, setSelectedSub] = useState(null);

    // 💡 Home에서 넘겨준 쪽지(type)를 확인. 쪽지가 없으면(ex. 주소창으로 직접 접속) 기본값으로 'adult' 설정
    const userType = location.state?.type || 'adult';
    
    // 💡 쪽지 내용에 따라 보여줄 데이터를 adult 또는 child 중에서 골라옴!
    const speedCards = pharmacyData[userType];

    const finalJp = selectedSub ? selectedSub.jp : (selectedCard?.displayJp || selectedCard?.jp);
    const finalKr = selectedSub ? `(${selectedSub.label}용)` : `(${selectedCard?.desc})`;

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ paddingBottom: '40px' }}>
                <h2 className="title">약국 직원에게 보여주세요</h2>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>
                    찾으시는 약을 선택하면 일본어 화면이 크게 표시됩니다.
                </p>

                <div style={{ 
                    backgroundColor: '#FEF2F2', border: '2px solid #EF4444', 
                    borderRadius: '16px', padding: '30px 20px', textAlign: 'center', 
                    marginBottom: '24px', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)',
                    minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center'
                }}>
                    {selectedCard ? (
                        <>
                            <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>
                                {selectedCard.icon}
                            </span>
                            <h1 style={{ 
                                fontSize: '24px', fontWeight: '900', color: '#111827', 
                                margin: '0 0 12px 0', wordBreak: 'break-word', lineHeight: '1.4' 
                            }}>
                                {finalJp}
                            </h1>
                            <p style={{ color: '#6B7280', fontSize: '15px', margin: 0 }}>
                                {selectedCard.kr} {finalKr}
                            </p>
                        </>
                    ) : (
                        <p style={{ color: '#9CA3AF', margin: 0 }}>아래에서 필요한 약 종류를 선택하세요.</p>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                    {speedCards.map(card => (
                        <button 
                            key={card.id}
                            onClick={() => {
                                setSelectedCard(card);
                                setSelectedSub(null); // 에러 고쳤던 바로 그 부분!
                            }}
                            style={{
                                backgroundColor: selectedCard?.id === card.id ? '#1F2937' : '#FFFFFF',
                                color: selectedCard?.id === card.id ? '#FFFFFF' : '#374151',
                                border: '1px solid #E5E7EB',
                                borderRadius: '12px', padding: '12px 8px', fontSize: '13px', fontWeight: '700',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                                cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '22px' }}>{card.icon}</span>
                            <span>{card.kr}</span>
                        </button>
                    ))}
                </div>

                {selectedCard?.subSymptoms && (
                    <div style={{ marginBottom: '32px', animation: 'fadeIn 0.3s ease' }}>
                        <p style={{ fontSize: '14px', fontWeight: '800', color: '#374151', marginBottom: '12px' }}>
                            💡 구체적으로 어디가 아픈가요?
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                            {selectedCard.subSymptoms.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => setSelectedSub(sub)}
                                    style={{
                                        backgroundColor: selectedSub?.id === sub.id ? '#3B82F6' : '#EFF6FF',
                                        color: selectedSub?.id === sub.id ? '#FFFFFF' : '#1D4ED8',
                                        border: 'none', borderRadius: '10px', padding: '12px',
                                        fontSize: '14px', fontWeight: '600', cursor: 'pointer'
                                    }}
                                >
                                    {sub.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <button 
                    className="primary-btn" 
                    style={{ backgroundColor: '#F59E0B', color: 'white', width: '100%' }}
                    onClick={() => navigate('/medicine-guide')}
                >
                    🎒 사진으로 찾기 (상비약 도감)
                </button>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}

export default PharmacySpeed;