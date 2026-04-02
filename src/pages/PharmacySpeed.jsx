// src/pages/PharmacySpeed.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

// 약국용 스피드 질문 데이터
const speedCards = [
    { id: 'fever', icon: '🌡️', kr: '어린이 해열제는 어디 있나요?', jp: '子供用の解熱剤はどこですか？' },
    { id: 'cold', icon: '🤧', kr: '어린이 감기약(기침/콧물) 주세요.', jp: '子供用の風邪薬（咳・鼻水）をください。' },
    { id: 'stomach', icon: '💩', kr: '어린이 정장제(설사약) 있나요?', jp: '子供用の整腸剤（下痢止め）はありますか？' },
    { id: 'bug', icon: '🦟', kr: '벌레 물린 데 바르는 연고 주세요.', jp: '虫刺されの薬（塗り薬）をください。' },
    { id: 'wound', icon: '🩹', kr: '어린이용 상처 밴드/소독약 어딨나요?', jp: '子供用の絆創膏と消毒液はどこですか？' }
];

function PharmacySpeed() {
    const navigate = useNavigate();
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ paddingBottom: '40px' }}>
                <h2 className="title">약국 직원에게 보여주세요</h2>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '24px' }}>
                    찾으시는 약을 선택하면 일본어 화면이 크게 표시됩니다.
                </p>

                {/* 플래시 카드 뷰 (선택된 카드가 크게 표시됨) */}
                {selectedCard ? (
                    <div style={{ 
                        backgroundColor: '#FEF2F2', border: '2px solid #EF4444', 
                        borderRadius: '16px', padding: '30px 20px', textAlign: 'center', 
                        marginBottom: '24px', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)' 
                    }}>
                        <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>{selectedCard.icon}</span>
                        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: '0 0 12px 0', wordBreak: 'keep-all' }}>
                            {selectedCard.jp}
                        </h1>
                        <p style={{ color: '#6B7280', fontSize: '15px', margin: 0 }}>({selectedCard.kr})</p>
                    </div>
                ) : (
                    <div style={{ 
                        backgroundColor: '#F3F4F6', borderRadius: '16px', padding: '40px 20px', 
                        textAlign: 'center', marginBottom: '24px', color: '#9CA3AF' 
                    }}>
                        아래에서 필요한 약을 선택하세요.
                    </div>
                )}

                {/* 증상 선택 버튼 그리드 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '32px' }}>
                    {speedCards.map(card => (
                        <button 
                            key={card.id}
                            onClick={() => setSelectedCard(card)}
                            style={{
                                backgroundColor: selectedCard?.id === card.id ? '#10B981' : '#FFFFFF',
                                color: selectedCard?.id === card.id ? '#FFFFFF' : '#374151',
                                border: selectedCard?.id === card.id ? 'none' : '1px solid #E5E7EB',
                                borderRadius: '12px', padding: '16px', fontSize: '15px', fontWeight: '600',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>{card.icon}</span>
                            <span>{card.kr.split(' ')[1]}</span> {/* '해열제는', '감기약(기침/콧물)' 등 키워드만 표시 */}
                        </button>
                    ))}
                </div>

                {/* 직원이 못 알아들을 때를 대비한 도감 연결 */}
                <button 
                    className="primary-btn" 
                    style={{ backgroundColor: '#F59E0B', color: 'white', width: '100%' }}
                    onClick={() => navigate('/medicine-guide')}
                >
                    🎒 직원이 모른다면? 상비약 사진 보여주기
                </button>
            </div>
        </>
    );
}

export default PharmacySpeed;