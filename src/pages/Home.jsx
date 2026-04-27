import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    
    // 💡 초기 상태 설정: 세션에 시작 기록이 있으면 바로 'start(대상선택)', 없으면 'landing(설명)'
    const [step, setStep] = useState(() => {
        return sessionStorage.getItem("app_started") ? "start" : "landing";
    });
    
    const [childAgeLabel, setChildAgeLabel] = useState('');
    const [childAgeId, setChildAgeId] = useState('');
    const [tempMonth, setTempMonth] = useState("");

    // 시작하기 버튼 클릭 처리
    const handleStartApp = () => {
        sessionStorage.setItem("app_started", "true");
        setStep("start");
    };

    const handleBack = () => {
        if (step === 'start') setStep('landing'); // 선택 화면에서 뒤로가면 다시 설명 페이지로
        else if (step === 'child_age') setStep('start');
        else if (step === 'child_dest') setStep('child_age');
        else if (step === 'adult_dest') setStep('start'); 
        else if (step === 'quick_hospital') setStep('start');
    };

    const handleAgeSelect = (id, label) => {
        setChildAgeId(id);
        setChildAgeLabel(label);
        sessionStorage.setItem("ageLabel_child", label);
        setStep('child_dest'); 
    };

    const handleHospitalClick = () => {
        navigate(`/question/child`);
    };

    const handlePharmacyClick = () => {
        navigate('/pharmacy-speed', { 
            state: { type: 'child', ageLabel: childAgeLabel } 
        });
    };

    const handlePregnantClick = () => {
        navigate('/question/pregnant');
    };

    return (
        <>
            {/* 뒤로가기 버튼은 landing 단계가 아닐 때만 노출 */}
            <Header onBack={step !== 'landing' ? handleBack : null} />

            <div className="container home-container">
                
                {/* 🚀 0단계: 랜딩 페이지 (처음 접속 시 설명) */}
                {step === 'landing' && (
                    <div className="step-wrapper fade-in">
                        <div className="main-title-area">
                            <img 
                                src="/images/main-icon.png" 
                                style={{ width: '40px', height: 'auto', marginBottom: '10px' }}
                                alt="로고" 
                            />
                            <h1>일본 여행 중 아플 때</h1>
                        </div>
                        
                        <div className="info-card">
                            <p>
                                일본 여행 중 <strong>갑자기 아플 때</strong> 언어의 장벽으로 어려움을 겪고 계신 분들을 위한 앱 입니다.<br/><br/>
                                내 주변 현지 <strong>약국(드럭스토어)이나 소아과, 산부인과</strong>를 안내받을 수 있습니다.<br/><br/> 
                                또한, 증상을 선택하면 일본어로 변환되어 <strong>나의 증상을 즉시 설명</strong>할 수 있습니다.<br/><br/>
                                <span className="disclaimer-span">본 서비스는 의료 행위를 목적으로 하지 않으며, 일본 현지에서 보다 신속하게 서비스를 받을 수 있도록 돕는 보조 앱입니다.</span>
                            </p>
                        </div>

                        <button className="primary-btn start-btn-large" onClick={handleStartApp}>
                            시 작 하 기
                        </button>
                    </div>
                )}

                {/* 🚀 1단계: 대상 선택 (기존의 start 단계) */}
                {step === 'start' && (
                    <div className="step-wrapper fade-in">
                        <div className="title-area">
                            <h1>누구의 증상을 설명할까요?</h1>
                            <p>정확한 번역을 위해 대상을 선택해주세요.</p>
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

                {/* 2단계 이후 (빠른 병원 찾기, 성인 목적지, 소아 연령 등)는 기존과 동일 */}
                {step === 'quick_hospital' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어떤 병원을 찾으시나요?</h1>
                            <p>현재 위치 주변의 병원을 바로 찾아드립니다.</p>
                        </div>
                        <button className="action-btn hospital-btn" onClick={() => navigate('/hospitals', { state: { category: 'pediatrics' } })}>
                            <span className="emoji-icon-large">🧸</span>
                            <span>근처 소아과 찾기</span>
                        </button>
                        <button className="action-btn hospital-btn" style={{ borderLeftColor: '#DB2777' }} onClick={() => navigate('/hospitals', { state: { category: 'obgyn' } })}>
                            <span className="emoji-icon-large">🤰🏻</span>
                            <span>근처 산부인과 찾기</span>
                        </button>
                    </div>
                )}

                {step === 'adult_dest' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어디로 가시나요?</h1>
                        </div>
                        <button className="action-btn hospital-btn" onClick={() => alert('성인 병원 진료 서비스는 준비 중입니다.')}>
                            <span className="emoji-icon-large">🏥</span>
                            <span>병원 진료 (정밀 문진)</span>
                        </button>
                        <button className="action-btn pharmacy-btn" onClick={() => navigate('/pharmacy-speed', { state: { type: 'adult' } })}>
                            <span className="emoji-icon-large">💊</span>
                            <span>약국 / 드럭스토어 (간편 소통)</span>
                        </button>
                    </div>
                )}

                {step === 'child_age' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>아이의 연령을 선택하세요</h1>
                            <p>2세 미만은 개월 수를 선택해주세요.</p>
                        </div>
                        <div className="age-select-container" style={{ backgroundColor: '#F3F4F6', padding: '20px', borderRadius: '16px', width: '100%', boxSizing: 'border-box' }}>
                            <label style={{ display: 'block', fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#374151' }}>👶 2세 미만 영유아</label>
                            <select className="month-select" onChange={(e) => setTempMonth(e.target.value)} 
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '16px', backgroundColor: 'white', marginBottom: '12px' }}>
                                <option value="" disabled selected>개월 수 선택</option>
                                {Array.from({ length: 24 }, (_, i) => (<option key={i} value={i}>{i}개월</option>))}
                            </select>
                            <button onClick={() => tempMonth !== "" ? handleAgeSelect('child', `${tempMonth}개월`) : alert("개월 수를 선택해주세요.")}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: tempMonth !== "" ? '#3B82F6' : '#9CA3AF', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                                개월 수 확정
                            </button>
                        </div>
                        <div style={{ textAlign: 'center', margin: '15px 0', color: '#9CA3AF', fontWeight: 'bold' }}>OR</div>
                        <button className="age-btn" onClick={() => handleAgeSelect('child', '2세 (24개월) 이상')}>👦 2세 (24개월) 이상</button>
                    </div>
                )}

                {step === 'child_dest' && (
                    <div className="step-wrapper">
                        <div className="title-area">
                            <h1>어디로 가시나요?</h1>
                            <p>선택한 연령: <strong>{childAgeLabel}</strong></p>
                        </div>
                        {childAgeLabel.includes('개월') && (
                            <div className="disclaimer-box" style={{ marginBottom: '10px', padding: '12px' }}>
                                <span className="alert-icon">⚠️</span>
                                <p style={{ fontSize: '12px' }}>2세 미만 영유아는 약국보다는 소아과 진료를 강력히 권장합니다.</p>
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

                {/* 하단 공통 응급 버튼 영역 */}
                <div className="btn-area home-emergency-area">
                    <button className="primary-btn" style={{ backgroundColor: '#E8F9EC', color: '#00A332', border: '1px solid #00C73C', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => window.open('https://papago.naver.com/?sk=ko&tk=ja', '_blank')}>
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