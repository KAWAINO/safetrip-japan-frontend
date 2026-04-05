// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [step, setStep] = useState('start');

    const handleBack = () => {
        if (step === 'child_mode') setStep('start');
        else if (step === 'hospital_age') setStep('child_mode');
    };

    return (
        <>
            <Header onBack={step !== 'start' ? handleBack : null} />

            <div className="container home-container">
                
                {/* 1단계: 대상 선택 및 서비스 설명 */}
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

                        {/* 성인 / 소아 버튼 디자인 통일 */}
                        <button className="target-btn" onClick={() => navigate('/pharmacy-speed', { state: { type: 'adult' } })}>
                            <span className="emoji-icon">👩</span> 성인 (본인 및 동행자)
                        </button>

                        <button className="target-btn" onClick={() => setStep('child_mode')}>
                            <span className="emoji-icon">👶</span> 소아 (어린이)
                        </button>
                    </div>
                )}

                {/* 2단계: 소아 전용 - 목적지 선택 */}
                {step === 'child_mode' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어디로 가시나요?</h1>
                            <p>어린이의 상태에 맞는 소통 방식을 고르세요.</p>
                        </div>

                        <button className="action-btn hospital-btn" onClick={() => setStep('hospital_age')}>
                            <span className="emoji-icon-large">🏥</span>
                            <span>소아과 진료 (정밀 문진)</span>
                        </button>

                        <button className="action-btn pharmacy-btn" onClick={() => navigate('/pharmacy-speed', { state: { type: 'child' } })}>
                            <span className="emoji-icon-large">💊</span>
                            <span>약국 / 드럭스토어 (간편 소통)</span>
                        </button>
                    </div>
                )}

                {/* 3단계: 소아 전용 - 병원 연령 선택 */}
                {step === 'hospital_age' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>아이의 연령을 선택하세요</h1>
                        </div>

                        <button className="age-btn" onClick={() => navigate('/question/under1')}>
                            👶 1세 미만 (생후 0~11개월)
                        </button>
                        <button className="age-btn" onClick={() => navigate('/question/over1')}>
                            🧒 1세 이상
                        </button>
                    </div>
                )}

                {/* 하단 공통 응급 버튼 (기존 클래스명 유지) */}
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