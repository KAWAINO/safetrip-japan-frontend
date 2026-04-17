// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    
    // 💡 단계: start(시작) -> child_age(나이 선택) -> child_dest(소아 목적지) / adult_dest(성인 목적지)
    const [step, setStep] = useState('start');
    
    // 💡 선택한 아이의 연령 정보 저장
    const [childAgeLabel, setChildAgeLabel] = useState('');
    const [childAgeId, setChildAgeId] = useState('');

    const handleBack = () => {
        if (step === 'child_age') setStep('start');
        else if (step === 'child_dest') setStep('child_age');
        else if (step === 'adult_dest') setStep('start'); // 💡 성인 목적지에서 뒤로가기
    };

    const handleAgeSelect = (id, label) => {
        setChildAgeId(id);
        setChildAgeLabel(label);
        setStep('child_dest'); 
    };

    const handleHospitalClick = () => {
        const questionPath = childAgeId === 'under1' ? 'under1' : 'over1';
        navigate(`/question/${questionPath}`);
    };

    const handlePharmacyClick = () => {
        navigate('/pharmacy-speed', { 
            state: { 
                type: 'child', 
                ageLabel: childAgeLabel 
            } 
        });
    };

    // 임산부 선택 시 문진표 페이지
    const handlePregnantClick = () => {
        navigate('/question/pregnant');
    };

    return (
        <>
            <Header onBack={step !== 'start' ? handleBack : null} />

            <div className="container home-container">
                
                {/* 1단계: 대상 선택 */}
                {step === 'start' && (
                    <div className="step-wrapper">
                        <div className="info-card">
                            <h2>🇯🇵 일본 여행 소통 도우미</h2>
                            <p>
                                본 서비스는 <strong>의료 행위를 목적으로 하지 않습니다.</strong><br /><br />
                                일본 내에서 언어 장벽으로 어려움을 겪는 한국인들이 현지 병원이나 약국에서 
                                <strong> 보다 신속하게 의사소통 서비스를 받을 수 있도록 돕는</strong> 보조 앱입니다.
                            </p>
                        </div>

                        <div className="title-area">
                            <h1>누구의 증상을 설명할까요?</h1>
                        </div>

                        <button className="target-btn" onClick={() => setStep('child_age')}>
                            <span className="emoji-icon">🧸</span> 소아 (어린이)
                        </button>

                        {/* 💡 신규 추가: 임산부 버튼 (태교 여행 타겟) */}
                        <button className="target-btn" onClick={handlePregnantClick}>
                            <span className="emoji-icon">🤰🏻</span> 임산부 (태교 여행)
                        </button>

                        {/* 💡 성인 클릭 시 adult_dest 단계로 이동하도록 변경 */}
                        <button className="target-btn" onClick={() => setStep('adult_dest')}>
                            <span className="emoji-icon">💼</span> 성인 (본인 및 동행자)
                        </button>

                        {/* 빠른 찾기 영역 */}
                        <div style={{ marginTop: '32px', width: '100%' }}>
                            <h3 style={{ fontSize: '15px', color: '#6B7280', marginBottom: '12px', textAlign: 'center' }}>
                                📍 번역 없이 내 주변 시설 바로 찾기
                            </h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                    onClick={() => navigate('/hospitals')}
                                    style={{ 
                                        flex: 1, padding: '14px 10px', borderRadius: '12px', 
                                        backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', 
                                        fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' 
                                    }}>
                                    🏥 근처 소아과
                                </button>
                                <button 
                                    onClick={() => navigate('/pharmacies')}
                                    style={{ 
                                        flex: 1, padding: '14px 10px', borderRadius: '12px', 
                                        backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', 
                                        fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' 
                                    }}>
                                    💊 근처 약국
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 💡 신규 추가: 성인 전용 - 목적지 선택 */}
                {step === 'adult_dest' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어디로 가시나요?</h1>
                        </div>

                        {/* 서비스 준비 중 알림 버튼 */}
                        <button 
                            className="action-btn hospital-btn" 
                            onClick={() => alert('성인 병원 진료(정밀 문진) 서비스는 현재 준비 중입니다. 🙇‍♂️\n조금만 기다려 주세요!')}
                        >
                            <span className="emoji-icon-large">🏥</span>
                            <span>병원 진료 (정밀 문진)</span>
                        </button>

                        {/* 기존 성인 약국 이동 로직 연결 */}
                        <button 
                            className="action-btn pharmacy-btn" 
                            onClick={() => navigate('/pharmacy-speed', { state: { type: 'adult' } })}
                        >
                            <span className="emoji-icon-large">💊</span>
                            <span>약국 / 드럭스토어 (간편 소통)</span>
                        </button>
                    </div>
                )}

                {/* 2단계: 소아 전용 - 연령 우선 선택 */}
                {step === 'child_age' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>아이의 연령을 선택하세요</h1>
                            <p>정확한 약 처방을 위해 나이 확인이 필요해요.</p>
                        </div>

                        <button className="age-btn" onClick={() => handleAgeSelect('under1', '1세 (12개월) 미만')}>
                            👶 1세 (12개월) 미만
                        </button>
                        <button className="age-btn" onClick={() => handleAgeSelect('1to2', '1세 이상 ~ 2세 미만')}>
                            🧒 1세 이상 ~ 2세 (24개월) 미만
                        </button>
                        <button className="age-btn" onClick={() => handleAgeSelect('over2', '2세 (24개월) 이상')}>
                            👦 2세 (24개월) 이상
                        </button>
                    </div>
                )}

                {/* 3단계: 소아 전용 - 목적지 선택 */}
                {step === 'child_dest' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어디로 가시나요?</h1>
                        </div>

                        {(childAgeId === 'under1' || childAgeId === '1to2') && (
                            <div className="disclaimer-box" style={{ marginBottom: '10px', padding: '12px' }}>
                                <span className="alert-icon">⚠️</span>
                                <p style={{ fontSize: '12px' }}>
                                    2세 미만 영유아는 시판 약 복용 시 부작용 위험이 있어, <b>약국보다는 소아과 진료를 강력히 권장</b>합니다.
                                </p>
                            </div>
                        )}

                        <button className="action-btn hospital-btn" onClick={handleHospitalClick}>
                            <span className="emoji-icon-large">🏥</span>
                            <span>소아과 진료 (정밀 문진)</span>
                        </button>

                        <button className="action-btn pharmacy-btn" onClick={handlePharmacyClick}>
                            <span className="emoji-icon-large">💊</span>
                            <span>약국 / 드럭스토어 (간편 소통)</span>
                        </button>
                    </div>
                )}

                {/* 하단 공통 응급 버튼 */}
                <div className="btn-area home-emergency-area">
                    <button className="primary-btn emergency-btn" onClick={() => navigate('/emergency')}>
                        🚨 응급 상황 (119 구급차)
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;