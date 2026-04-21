// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    
    // 💡 단계: start(시작) -> child_age / adult_dest / quick_hospital(신규!)
    const [step, setStep] = useState('start');
    
    // 선택한 아이의 연령 정보 저장
    const [childAgeLabel, setChildAgeLabel] = useState('');
    const [childAgeId, setChildAgeId] = useState('');

    const handleBack = () => {
        if (step === 'child_age') setStep('start');
        else if (step === 'child_dest') setStep('child_age');
        else if (step === 'adult_dest') setStep('start'); 
        else if (step === 'quick_hospital') setStep('start'); // 💡 빠른 병원 찾기에서 뒤로가기
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

                        <div className="main-title-area">
                            <img 
                                src="/images/main-icon.png" 
                                style={{ width: '30px', height: 'auto' }}
                                alt="일본 여행 중 아플 때 일본 병원 약국 증상 번역 서비스 -  일본 약국, 병원, 소아과, 산부인과 증상 번역" 
                            />
                            <h1>일본 여행 중 아플 때</h1>
                        </div>
                        <div className="info-card">
                            <p>
                                일본 여행 중 <strong>갑자기 아플 때</strong> 언어의 장벽으로 어려움을 겪고 계신 분들을 위한 앱 입니다.<br/><br/>
                                내 주변 현지 <strong>약국(드럭스토어)이나 소아과, 산부인과</strong>를 안내받을 수 있습니다.<br/><br/> 
                                또한, 증상을 선택하면 일본어로 변환되어 <strong>나의 증상을 즉시 설명</strong>할 수 있습니다.<br/><br/>
                                <span>본 서비스는 의료 행위를 목적으로 하지 않으며, 일본 현지에서 보다 신속하게 서비스를 받을 수 있도록 돕는 보조 앱입니다.</span>
                            </p>
                        </div>

                        <div className="title-area">
                            <h1>누구의 증상을 설명할까요?</h1>
                        </div>

                        <button className="target-btn" onClick={() => setStep('child_age')}>
                            <span className="emoji-icon">🧸</span> 소아 (어린이)
                        </button>

                        <button className="target-btn" onClick={handlePregnantClick}>
                            <span className="emoji-icon">🤰🏻</span> 임산부 (태교 여행)
                        </button>

                        <button className="target-btn" onClick={() => setStep('adult_dest')}>
                            <span className="emoji-icon">💼</span> 성인 (본인 및 동행자)
                        </button>

                        {/* 빠른 찾기 영역 */}
                        <div style={{ marginTop: '32px', width: '100%' }}>
                            <h3 style={{ fontSize: '15px', color: '#6B7280', marginBottom: '12px', textAlign: 'center' }}>
                                📍 번역 없이 내 주변 시설 바로 찾기
                            </h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {/* 💡 수정: 바로 넘어가지 않고 quick_hospital 단계로 이동 */}
                                <button 
                                    onClick={() => setStep('quick_hospital')}
                                    style={{ 
                                        flex: 1, padding: '14px 10px', borderRadius: '12px', 
                                        backgroundColor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', 
                                        fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' 
                                    }}>
                                    🏥 근처 병원
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

                {/* 💡 신규 추가: 빠른 병원 찾기 - 소아과 vs 산부인과 선택 */}
                {step === 'quick_hospital' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어떤 병원을 찾으시나요?</h1>
                            <p>현재 위치 주변의 병원을 바로 찾아드립니다.</p>
                        </div>

                        <button 
                            className="action-btn hospital-btn" 
                            onClick={() => navigate('/hospitals', { state: { category: 'pediatrics' } })}
                        >
                            <span className="emoji-icon-large">🧸</span>
                            <span>근처 소아과 찾기</span>
                        </button>

                        <button 
                            className="action-btn hospital-btn" 
                            style={{ borderLeftColor: '#DB2777' }} /* 임산부 핑크색 포인트 테두리 */
                            onClick={() => navigate('/hospitals', { state: { category: 'obgyn' } })}
                        >
                            <span className="emoji-icon-large">🤰🏻</span>
                            <span>근처 산부인과 찾기</span>
                        </button>
                    </div>
                )}

                {/* 성인 전용 - 목적지 선택 */}
                {step === 'adult_dest' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어디로 가시나요?</h1>
                        </div>

                        <button 
                            className="action-btn hospital-btn" 
                            onClick={() => alert('성인 병원 진료(정밀 문진) 서비스는 현재 준비 중입니다. 🙇‍♂️\n조금만 기다려 주세요!')}
                        >
                            <span className="emoji-icon-large">🏥</span>
                            <span>병원 진료 (정밀 문진)</span>
                        </button>

                        <button 
                            className="action-btn pharmacy-btn" 
                            onClick={() => navigate('/pharmacy-speed', { state: { type: 'adult' } })}
                        >
                            <span className="emoji-icon-large">💊</span>
                            <span>약국 / 드럭스토어 (간편 소통)</span>
                        </button>
                    </div>
                )}

                {/* 소아 전용 - 연령 우선 선택 */}
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

                {/* 소아 전용 - 목적지 선택 */}
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

                    <button 
                        className="primary-btn" 
                        style={{ 
                            backgroundColor: '#E8F9EC', 
                            color: '#00A332', 
                            border: '1px solid #00C73C', 
                            marginBottom: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }} 
                        onClick={() => window.open('https://papago.naver.com/?sk=ko&tk=ja', '_blank')}
                    >
                        <img src="/images/papago-icon.png" alt="파파고" style={{ width: '18px', height: '18px' }} />
                        현지인과 대화가 필요하다면? (파파고)
                    </button>

                    <button className="primary-btn emergency-btn" onClick={() => navigate('/emergency')}>
                        🚨 응급 상황 (119 구급차)
                    </button>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default Home;