// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Home() {
    const navigate = useNavigate();
    
    // 단계별 화면 전환을 위한 상태: 'start'(대상 선택) -> 'child_mode'(소아 전용 선택) -> 'hospital_age'(병원 연령 선택)
    const [step, setStep] = useState('start');

    // 뒤로가기 로직
    const handleBack = () => {
        if (step === 'child_mode') setStep('start');
        else if (step === 'hospital_age') setStep('child_mode');
    };

    return (
        <>
            {/* 첫 단계가 아닐 때만 헤더에 뒤로가기 버튼 활성화 */}
            <Header onBack={step !== 'start' ? handleBack : null} />

            <div className="container" style={{ justifyContent: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
                
                {/* 1단계: 대상 선택 및 서비스 설명 */}
                {step === 'start' && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        
                        {/* 서비스 설명 및 면책 조항 카드 */}
                        <div style={{ 
                            backgroundColor: '#F9FAFB', 
                            padding: '20px', 
                            borderRadius: '16px', 
                            border: '1px solid #E5E7EB',
                            marginBottom: '10px'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginBottom: '12px' }}>
                                🇯🇵 일본 여행 소통 도우미
                            </h2>
                            <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                                본 서비스는 <strong>의료 행위를 목적으로 하지 않습니다.</strong><br /><br />
                                일본 내에서 언어 장벽으로 어려움을 겪는 한국인들이 현지 병원이나 약국에서 
                                <strong> 보다 신속하게 의사소통 서비스를 받을 수 있도록 돕는</strong> 보조 앱입니다.
                            </p>
                        </div>

                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>누구의 증상을 설명할까요?</h1>
                        </div>

                        {/* 성인 선택 시: 바로 약국 스피드 소통으로 이동 */}
                        <button 
                            className="primary-btn" 
                            style={{ height: '90px', fontSize: '18px', backgroundColor: '#FFFFFF', color: '#111827', border: '2px solid #E5E7EB' }}
                            onClick={() => navigate('/pharmacy-speed')}
                        >
                            <span style={{ fontSize: '24px', marginRight: '10px' }}>👩</span> 성인 (본인 및 동행자)
                        </button>

                        {/* 소아 선택 시: 다음 단계(병원/약국 선택)로 이동 */}
                        <button 
                            className="primary-btn" 
                            style={{ height: '90px', fontSize: '18px', backgroundColor: '#3B82F6', color: '#FFFFFF' }}
                            onClick={() => setStep('child_mode')}
                        >
                            <span style={{ fontSize: '24px', marginRight: '10px' }}>👶</span> 소아 (어린이)
                        </button>
                    </div>
                )}

                {/* 2단계: 소아 전용 - 목적지 선택 */}
                {step === 'child_mode' && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>어디로 가시나요?</h1>
                            <p style={{ color: '#6B7280', marginTop: '8px' }}>어린이의 상태에 맞는 소통 방식을 고르세요.</p>
                        </div>

                        <button 
                            className="primary-btn" 
                            style={{ height: '100px', backgroundColor: '#3B82F6' }}
                            onClick={() => setStep('hospital_age')}
                        >
                            <span style={{ fontSize: '28px' }}>🏥</span>
                            <span style={{ marginTop: '8px' }}>소아과 진료 (정밀 문진)</span>
                        </button>

                        <button 
                            className="primary-btn" 
                            style={{ height: '100px', backgroundColor: '#10B981' }}
                            onClick={() => navigate('/pharmacy-speed')}
                        >
                            <span style={{ fontSize: '28px' }}>💊</span>
                            <span style={{ marginTop: '8px' }}>약국 / 드럭스토어 (간편 소통)</span>
                        </button>
                    </div>
                )}

                {/* 3단계: 소아 전용 - 병원 연령 선택 */}
                {step === 'hospital_age' && (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827' }}>아이의 연령을 선택하세요</h1>
                        </div>

                        <button 
                            className="primary-btn" 
                            style={{ height: '80px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #E5E7EB' }}
                            onClick={() => navigate('/question/under1')}
                        >
                            👶 1세 미만 (생후 0~11개월)
                        </button>
                        <button 
                            className="primary-btn" 
                            style={{ height: '80px', backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #E5E7EB' }}
                            onClick={() => navigate('/question/over1')}
                        >
                            🧒 1세 이상
                        </button>
                    </div>
                )}

                {/* 하단 공통 응급 버튼 */}
                <div className="btn-area" style={{ marginTop: '40px', width: '100%' }}>
                    <button className="primary-btn emergency-btn" onClick={() => navigate('/emergency')}>
                        🚨 응급 상황 (119 구급차)
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home;