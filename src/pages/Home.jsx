// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // 헤더 재사용

function Home() {
    const navigate = useNavigate();
    // 모드 상태 관리: 'main'(첫 화면) -> 'hospital'(연령 선택)
    const [mode, setMode] = useState('main');

    const handleAgeSelect = (ageId) => {
        // 기존 병원용 상세 문진 로직으로 이동
        navigate(`/question/${ageId}`);
    };

    return (
        <>
            {/* 병원 모드일 때만 뒤로가기(메인으로) 버튼 표시 */}
            <Header onBack={mode === 'hospital' ? () => setMode('main') : null} />

            <div className="container" style={{ justifyContent: 'center', paddingTop: '80px' }}>
                
                {mode === 'main' && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#111827', margin: '0 0 10px 0' }}>어디로 가시나요?</h1>
                            <p style={{ color: '#6B7280', margin: 0, fontSize: '15px' }}>목적지에 맞춰 맞춤형 소통을 도와드릴게요.</p>
                        </div>

                        {/* 1. 약국용 (스피드 소통) */}
                        <button 
                            className="primary-btn" 
                            style={{ height: '100px', fontSize: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', backgroundColor: '#10B981' }}
                            onClick={() => navigate('/pharmacy-speed')}
                        >
                            <span style={{ fontSize: '28px' }}>💊</span>
                            <span>약국 / 드럭스토어 (빠른 소통)</span>
                        </button>

                        {/* 2. 병원용 (상세 문진) */}
                        <button 
                            className="primary-btn" 
                            style={{ height: '100px', fontSize: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', backgroundColor: '#3B82F6' }}
                            onClick={() => setMode('hospital')}
                        >
                            <span style={{ fontSize: '28px' }}>🏥</span>
                            <span>소아과 진료 (상세 문진)</span>
                        </button>

                    </div>
                )}

                {mode === 'hospital' && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: '0 0 10px 0' }}>아이의 연령을 선택하세요</h1>
                        </div>

                        <button 
                            className="primary-btn" 
                            style={{ height: '80px', fontSize: '18px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #E5E7EB' }}
                            onClick={() => handleAgeSelect('under1')}
                        >
                            👶 1세 미만 (생후 0~11개월)
                        </button>
                        <button 
                            className="primary-btn" 
                            style={{ height: '80px', fontSize: '18px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #E5E7EB' }}
                            onClick={() => handleAgeSelect('over1')}
                        >
                            🧒 1세 이상
                        </button>
                    </div>
                )}

                {/* 하단 고정 버튼들 (응급/병원찾기) */}
                <div className="btn-area" style={{ marginTop: '40px' }}>
                    <button className="primary-btn emergency-btn" onClick={() => navigate('/emergency')}>
                        🚨 응급 상황 (119 구급차)
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;