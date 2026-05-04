// src/pages/Result.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import './Result.css';

// 💡 분리된 뷰 컴포넌트 임포트
import PregnantMedicalTable from "../components/result/PregnantMedicalTable";
import AdultMedicalTable from "../components/result/AdultMedicalTable";
import ChildMedicalTable from "../components/result/ChildMedicalTable";

const ageInfoMap = {
    'pregnant': { kr: '임산부 (태교 여행)', jp: '妊婦（妊娠中）' },
    'adult': { kr: '성인', jp: '成人' }
};

const AFFILIATE_LINKS = {
    flight: "https://myrealt.rip/Z3C4b4",
    // ... 기타 콜밴 링크들
};

const TAXI_LINKS = {
    go: "https://go.goinc.jp/", // GO 택시 공식 안내/다운로드
    uber: "https://m.uber.com/" // 우버 웹/앱 호출 링크
};

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

    const [isTaxiModalOpen, setIsTaxiModalOpen] = useState(false);

    const [resultData, setResultData] = useState(() => {
        if (location.state && location.state.ageId && location.state.answers) {
            return location.state;
        }
        const childAnswers = sessionStorage.getItem("answers_child");
        const pregnantAnswers = sessionStorage.getItem("answers_pregnant"); 
        const adultAnswers = sessionStorage.getItem("answers_adult");

        if (childAnswers) return { 
            ageId: "child", 
            answers: JSON.parse(childAnswers),
            ageLabel: sessionStorage.getItem("ageLabel_child")
        };
        if (pregnantAnswers) return { ageId: "pregnant", answers: JSON.parse(pregnantAnswers) };
        if (adultAnswers) return { ageId: "adult", answers: JSON.parse(adultAnswers) };

        return null;
    });

    useEffect(() => {
        if (!resultData) navigate("/", { replace: true });
    }, [resultData, navigate]);

    const currentAge = useMemo(() => {
        if (!resultData) return null;
        if (resultData.ageId === 'child') {
            const label = resultData.ageLabel || "";
            return {
                kr: label,
                jp: label.includes('개월') ? label.replace('개월', 'ヶ月') : "2歳以上"
            };
        }
        return ageInfoMap[resultData.ageId] || { kr: '기타', jp: 'その他' };
    }, [resultData]);

    const categorizedResults = useMemo(() => {
        const groups = {
            department: [], onsetTime: [], appearance: [], main: [], excretory: [], medication: [], allergy: [], pastIllness: [] 
        };

        if (!resultData || !questions[resultData.ageId]) return groups;
    
        const ageQuestions = questions[resultData.ageId];
        const answers = resultData.answers;

        ageQuestions.forEach((q) => {
            const answerVal = answers[q.id];
            if (!answerVal || (Array.isArray(answerVal) && answerVal.length === 0)) return;

            let targetGroup;
            if (q.id === 'department') targetGroup = groups.department;
            else if (q.id === 'preg_weeks') targetGroup = groups.appearance; 
            else if (q.id === 'preg_symptom') targetGroup = groups.main; 
            else if (q.id === 'onset_time') targetGroup = groups.onsetTime;
            else if (q.id === 'appearance' || q.id === 'intake') targetGroup = groups.appearance;
            else if (q.id.startsWith('stool') || q.id.startsWith('urine') || q.id.startsWith('diaper')) targetGroup = groups.excretory;
            else if (q.id === 'medication') targetGroup = groups.medication;
            else if (q.id.startsWith('allergy')) targetGroup = groups.allergy;
            else if (q.id === 'past_illness') targetGroup = groups.pastIllness;
            else targetGroup = groups.main; 

            const allOptions = q.uiType === "groupedMulti" 
                ? q.groups.flatMap(g => g.options) 
                : (q.options || []);

            const processOption = (val) => {
                const option = allOptions.find(o => o.value === val);
                if (option?.jp) targetGroup.push({ kr: option.label, jp: option.jp });
            };

            if (Array.isArray(answerVal)) answerVal.forEach(processOption);
            else processOption(answerVal);
        });

        return groups;
    }, [resultData]);

    const handleGoHome = () => {
        sessionStorage.clear();
        navigate("/");
    };

    const isPregnant = resultData?.ageId === 'pregnant';
    const isAdult = resultData?.ageId === 'adult';

    const handleCopy = async () => {
        let fullText = "";

        if (isPregnant) {
            fullText = [
                `[患者状態 / 환자 상태: ${currentAge?.jp}]`,
                categorizedResults.appearance.length > 0 ? `[妊娠週数 / 임신 주차]\n${categorizedResults.appearance.map(i => `• ${i.jp}`).join('\n')}` : '',
                `[主な症状 / 주요 증상]\n${categorizedResults.main.map(i => `• ${i.jp}`).join('\n')}`,
                `\n診察と処方をお願いします。 (진찰과 처방을 부탁드립니다.)`
            ].filter(Boolean).join('\n');
        } else if (isAdult) {
            fullText = [
                `[患者 / 환자: ${currentAge?.jp}]`,
                categorizedResults.department.length > 0 ? `[希望診療科 / 희망 진료과]\n${categorizedResults.department.map(i => `• ${i.jp}`).join('\n')}` : '',
                categorizedResults.onsetTime.length > 0 ? `[発症時期 / 증상 시작: ${categorizedResults.onsetTime.map(i => i.jp).join(', ')}]` : '',
                `[主な症状 / 주요 증상]\n${categorizedResults.main.map(i => `• ${i.jp}`).join('\n')}`,
                categorizedResults.allergy.length > 0 ? `[アレルギー / 알레르기]\n${categorizedResults.allergy.map(i => `• ${i.jp}`).join('\n')}` : '',
                `\n診察と処方をお願いします。 (진찰과 처방을 부탁드립니다.)`
            ].filter(Boolean).join('\n');
        } else {
            fullText = [
                `[患者年齢 / 환자 연령: ${currentAge?.jp}]`,
                categorizedResults.onsetTime.length > 0 ? `[発症時期 / 증상 시작: ${categorizedResults.onsetTime.map(i => i.jp).join(', ')}]` : '',
                `[症状のまとめ / 증상 요약]\n${categorizedResults.main.map(i => `• ${i.jp}`).join('\n')}`,
                categorizedResults.appearance.length > 0 ? `[患者の状態 / 환자 상태]\n${categorizedResults.appearance.map(i => `• ${i.jp}`).join('\n')}` : '',
                categorizedResults.excretory.length > 0 ? `[排泄状態 / 배설 상태]\n${categorizedResults.excretory.map(i => `• ${i.jp}`).join('\n')}` : '',
                categorizedResults.medication.length > 0 ? `[服用中の薬 / 복용중인 약]\n${categorizedResults.medication.map(i => `• ${i.jp}`).join('\n')}` : '',
                categorizedResults.allergy.length > 0 ? `[アレルギー / 알레르기]\n${categorizedResults.allergy.map(i => `• ${i.jp}`).join('\n')}` : '',
                categorizedResults.pastIllness.length > 0 ? `[既往歴 / 병력]\n${categorizedResults.pastIllness.map(i => `• ${i.jp}`).join('\n')}` : '',
                `\n診察と処方をお願いします。 (진찰과 처방을 부탁드립니다.)`
            ].filter(Boolean).join('\n');
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(fullText);
            } else {
                const textArea = document.createElement("textarea");
                textArea.value = fullText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            alert("복사 중 오류가 발생했습니다.");
        }
    };

    if (!resultData) return null;

    return (
        <div className="container">
            <h2 className="title">직원 또는 의사에게 보여주세요</h2>

            <div className="sos-message-box">
                <p className="sos-jp-text">
                    日本を旅行中の韓国人です。<br />日本語はよく話せません。<br />
                    {isPregnant ? (
                        <>妊娠中の状態と症状は以下の通りです。<br />診察が必要です。</>
                    ) : isAdult ? (
                        <>大人の患者です。<br />症状は以下の通りです。<br />診察が必要です。</>
                    ) : (
                        <>子供の年齢と症状は以下の通りです。<br />診察が必要です。</>
                    )}
                </p>
                <p className="sos-kr-text">
                    (일본을 여행 중인 한국인 입니다. 일본어를 잘 모릅니다. <br/>
                    {isPregnant ? "임신 상태와 증상은 아래와 같습니다. 진찰이 필요합니다." : 
                     isAdult ? "성인 환자이며 증상은 아래와 같습니다. 진찰이 필요합니다." : 
                     "아이의 연령과 증상은 아래와 같습니다. 진찰이 필요합니다."})
                </p>
                
                {/* 병합된 면책 조항 (UI 공간 절약) */}
                <div className="mini-disclaimer">
                    ⚠️ この翻訳はコミュニケーション補助用であり、医学的診断に代わるものではありません。<br/>
                    <span>(본 번역은 소통 보조용이며, 의학적 진단을 대체하지 않습니다.)</span>
                </div>
            </div>

            <div className="result-card medical-form">
                {!isQuestionnaireOpen ? (
                    <button 
                        onClick={() => setIsQuestionnaireOpen(true)}
                        style={{
                            width: '100%', padding: '16px', backgroundColor: '#FFFFFF', 
                            border: '2px solid #3B82F6', borderRadius: '12px', color: '#1D4ED8', 
                            fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}
                    >
                        <span>📋 완성된 증상 문진표 보기</span>
                        <span>▼</span>
                    </button>
                ) : (
                    <>
                        <div className="result-header">
                            <h3 className="result-card-title">Medical Questionnaire (問診票)</h3>
                            <button onClick={handleCopy} className={`copy-btn ${isCopied ? 'success' : 'default'}`}>
                                {isCopied ? "✓ 복사 완료" : "📋 텍스트 복사"}
                            </button>
                        </div>

                        {/* 💡 분리한 컴포넌트 렌더링 블록 */}
                        <div className="medical-table">
                            {isPregnant && <PregnantMedicalTable categorizedResults={categorizedResults} currentAge={currentAge} />}
                            {isAdult && <AdultMedicalTable categorizedResults={categorizedResults} currentAge={currentAge} />}
                            {!isPregnant && !isAdult && <ChildMedicalTable categorizedResults={categorizedResults} currentAge={currentAge} />}

                            {/* 공통 적용되는 꼬리말 섹션 */}
                            <div className="table-row">
                                <div className="table-label">備考<br/>(요청 사항)</div>
                                <div className="table-content">
                                    <p className="jp-text">診察と処方をお願いします。</p>
                                    <p className="kr-text">(진찰과 처방을 부탁드립니다.)</p>
                                </div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setIsQuestionnaireOpen(false)}
                            style={{
                                width: '100%', padding: '12px', marginTop: '16px', backgroundColor: '#F3F4F6', 
                                border: '1px solid #D1D5DB', borderRadius: '8px', color: '#4B5563', 
                                fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
                            }}
                        >
                            <span>▲ 문진표 닫기</span>
                        </button>
                    </>
                )}
            </div>

            {/* 이후 버튼들 유지 (제휴 링크 등은 이 아래에 안전하게 추가 가능) */}
            <div className="btn-area">
                <button className="primary-btn location-btn" style={{ backgroundColor: isPregnant ? '#DB2777' : '#3B82F6' }} onClick={() => navigate('/hospitals', { state: { category: isPregnant ? 'obgyn' : 'pediatrics' } })}>📍 {isPregnant ? '근처 산부인과 찾기' : '내 주변 병원 찾기'}</button>
                {!isPregnant && <button className="primary-btn location-btn" style={{ backgroundColor: '#10B981', marginBottom: '12px' }} onClick={() => navigate('/pharmacies')}>💊 근처 약국 / 드럭스토어 찾기</button>}
                
                <button className="primary-btn" style={{ backgroundColor: '#00C73C', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => window.open('https://papago.naver.com/?sk=ko&tk=ja', '_blank')}><img src="/images/papago-icon.png" alt="파파고" style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'white', padding: '2px' }} />파파고 실시간 번역기 열기</button>

                <div className="extra-service-card">
                    <h4 className="extra-title">🆘 도움이 더 필요하신가요?</h4>
                    <p className="extra-desc">귀국 항공권 조회, 콜밴 예약 및 비상 연락처</p>
                    
                    <div className="extra-grid">
                        {/* 마이리얼트립 제휴 버튼들 */}
                        <button className="extra-item" onClick={() => window.open(AFFILIATE_LINKS.flight, '_blank')}>
                            ✈️ 귀국 항공권<br/><span>편도 최저가</span>
                        </button>
                        <button className="extra-item" onClick={() => setIsTaxiModalOpen(true)}>
                            🚕 실시간 택시 호출<br/><span>우버 / GO 앱 연결</span>
                        </button>
                        
                        {/* 기존 SOS 링크들을 작은 버튼으로 통합 */}
                        <button className="extra-item sos" onClick={() => window.open('https://www.jnto.go.jp/emergency/kor/mi_guide.html', '_blank')}>
                            📞 일본관광청<br/><span>24시 콜센터 및 종합병원</span>
                        </button>
                        <button className="extra-item sos" onClick={() => window.open('https://www.iryou.teikyouseido.mhlw.go.jp/znk-web/juminkanja/S2300/initialize', '_blank')}>
                            🏥 외국어 지원<br/><span>종합병원 검색</span>
                        </button>
                    </div>
                </div>

                {isTaxiModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsTaxiModalOpen(false)}>
                        {/* 클래스명도 location-modal에서 taxi-modal로 바꾸는 걸 권장하지만, 일단 기존 CSS를 유지하려면 그대로 둬도 무방함 */}
                        <div className="location-modal" onClick={e => e.stopPropagation()}>
                            <h3>어느 택시 앱을 사용할까요?</h3>
                            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px', lineHeight: '1.4' }}>
                                일본은 길에서 택시를 잡기 어렵습니다.<br/>상황에 맞는 앱을 선택해 주세요.
                            </p>
                            <div className="location-list">
                                <button 
                                    onClick={() => window.open(TAXI_LINKS.go, '_blank')}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '14px' }}
                                >
                                    <span style={{ fontWeight: '800', fontSize: '15px' }}>🚕 GO (고)</span>
                                    <span style={{ fontSize: '12px', color: '#4B5563', fontWeight: '500' }}>일본 현지 배차 1위 (가장 빠름)</span>
                                </button>
                                <button 
                                    onClick={() => window.open(TAXI_LINKS.uber, '_blank')}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '14px' }}
                                >
                                    <span style={{ fontWeight: '800', fontSize: '15px' }}>⬛ Uber (우버)</span>
                                    <span style={{ fontSize: '12px', color: '#4B5563', fontWeight: '500' }}>한국에서 쓰던 계정 그대로 사용</span>
                                </button>
                            </div>
                            <button className="close-btn" onClick={() => setIsTaxiModalOpen(false)}>닫기</button>
                        </div>
                    </div>
                )}
                
                <button 
                    className="primary-btn" 
                    style={{ backgroundColor: "#E5E7EB", color: "#4B5563", marginTop: '10px' }} 
                    onClick={handleGoHome}>🏠 처음으로 돌아가기
                </button>

                {/* 외부 제휴/공공기관 링크 블록 */}
                {/* <div style={{ padding: '20px 16px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#374151', marginBottom: '12px', textAlign: 'center' }}>
                        🆘 도움이 더 필요하신가요?
                    </h4>

                    <button 
                        className="primary-btn" 
                        style={{ 
                            backgroundColor: '#FEFCE8', 
                            border: '1px solid #FDE047', 
                            color: '#854D0E', 
                            marginBottom: '10px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                            padding: '12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }} 
                        onClick={() => window.open('https://www.jnto.go.jp/emergency/kor/mi_guide.html', '_blank')}
                    >
                        <span style={{ fontSize: '14px', fontWeight: '700' }}>📞 일본 병원 검색 및 통역 지원이 필요하다면?</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', textAlign: 'center', wordBreak: 'keep-all', opacity: 0.9 }}>
                            일본관광청(JNTO) 공식 긴급 의료 가이드 & 24시간 콜센터
                        </span>
                    </button>

                    <button 
                        className="primary-btn" 
                        style={{ 
                            backgroundColor: '#EFF6FF', 
                            border: '1px solid #93C5FD', 
                            color: '#1E3A8A', 
                            marginBottom: '10px',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                            padding: '12px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }} 
                        onClick={() => window.open('https://www.iryou.teikyouseido.mhlw.go.jp/znk-web/juminkanja/S2300/initialize', '_blank')}
                    >
                        <span style={{ fontSize: '14px', fontWeight: '700' }}>🏥 외국어 지원 종합 병원을 찾고 싶다면?</span>
                        <span style={{ fontSize: '12px', fontWeight: '500', textAlign: 'center', wordBreak: 'keep-all', opacity: 0.9 }}>
                            일본 후생노동성 공식 지정 의료정보넷 (Navii)
                        </span>
                    </button>

                    <button 
                        className="primary-btn" 
                        style={{ 
                            backgroundColor: '#F0FDF4', 
                            border: '1px solid #6EE7B7', 
                            color: '#065F46', 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
                            padding: '12px', cursor: 'pointer'
                        }} 
                        onClick={() => window.open('http://t-o.tmnf.jp/t/13190090T9021000000000000UNYUHUKUSENKAI', '_blank')}
                    >
                        <span style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            🛡️ 일본 입국 전 보험에 가입하지 않았다면?
                        </span>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#047857', textAlign: 'center', wordBreak: 'keep-all' }}>
                            입국 후 가입 가능한 외국인 보험 (도쿄해상일동)
                            <br />
                            <span style={{ fontSize: '11px', opacity: 0.8, fontWeight: '500' }}>(※ 일본 현지 인터넷 환경에서만 접속 가능)</span>
                        </span>
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default Result;