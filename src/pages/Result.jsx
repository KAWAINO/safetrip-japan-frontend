// src/pages/Result.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import './Result.css';

const ageInfoMap = {
    'pregnant': { kr: '임산부 (태교 여행)', jp: '妊婦（妊娠중）' }
};

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    
    // 💡 신규 추가: 문진표 펼치기/접기 상태 관리 (초기값: false로 접어둠)
    const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);

    const [resultData, setResultData] = useState(() => {
        if (location.state && location.state.ageId && location.state.answers) {
            return location.state;
        }
        const childAnswers = sessionStorage.getItem("answers_child");
        const pregnantAnswers = sessionStorage.getItem("answers_pregnant"); 

        if (childAnswers) return { 
            ageId: "child", 
            answers: JSON.parse(childAnswers),
            ageLabel: sessionStorage.getItem("ageLabel_child")
        };
        if (pregnantAnswers) return { ageId: "pregnant", answers: JSON.parse(pregnantAnswers) };

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
            onsetTime: [], appearance: [], main: [], excretory: [], medication: [], allergy: [], pastIllness: [] 
        };

        if (!resultData || !questions[resultData.ageId]) return groups;
    
        const ageQuestions = questions[resultData.ageId];
        const answers = resultData.answers;

        ageQuestions.forEach((q) => {
            const answerVal = answers[q.id];
            if (!answerVal || (Array.isArray(answerVal) && answerVal.length === 0)) return;

            let targetGroup;
            if (q.id === 'preg_weeks') targetGroup = groups.appearance; 
            else if (q.id === 'preg_symptom') targetGroup = groups.main; 
            else if (q.id === 'onset_time') targetGroup = groups.onsetTime;
            else if (q.id === 'appearance' || q.id === 'intake') targetGroup = groups.appearance;
            else if (q.id.startsWith('stool') || q.id.startsWith('urine') || q.id.startsWith('diaper')) targetGroup = groups.excretory;
            else if (q.id === 'medication') targetGroup = groups.medication;
            else if (q.id === 'allergy') targetGroup = groups.allergy;
            else if (q.id === 'past_illness') targetGroup = groups.pastIllness;
            else targetGroup = groups.main;

            const processOption = (val) => {
                const option = q.options.find(o => o.value === val);
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

    const handleCopy = async () => {
        let fullText = "";

        if (isPregnant) {
            fullText = [
                `[患者状態 / 환자 상태: ${currentAge?.jp}]`,
                categorizedResults.appearance.length > 0 ? `[妊娠週数 / 임신 주차]\n${categorizedResults.appearance.map(i => `• ${i.jp}`).join('\n')}` : '',
                `[主な症状 / 주요 증상]\n${categorizedResults.main.map(i => `• ${i.jp}`).join('\n')}`,
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
                `\n診察과 처방을 부탁드립니다. (診察と処方をお願いします。)`
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
                    {isPregnant ? "妊娠中の状態と症状は以下の通りです。診察が必要です。" : "年齢と症状は以下の通りです。診察が必要です。"}
                </p>
                <p className="sos-kr-text">
                    (일본을 여행 중인 한국인 입니다. 일본어를 잘 모릅니다. <br/>
                    {isPregnant ? "임신 상태와 증상은 아래와 같습니다. 진찰이 필요합니다." : "연령과 증상은 아래와 같습니다. 진찰이 필요합니다."})
                </p>
            </div>

            <div className="disclaimer-box">
                <span className="alert-icon">⚠️</span>
                <p>본 번역은 소통 보조용이며, 의학적 진단을 대체하지 않습니다.<br />
                    (この翻訳はコミュニケーション補助用であり、医学的診断に代わるものではありません。)</p>
            </div>

            {/* 💡 핵심: 문진표 아코디언 영역 */}
            <div className="result-card medical-form">
                {!isQuestionnaireOpen ? (
                    // 닫혀있을 때 보여줄 버튼
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
                    // 열려있을 때 보여줄 전체 문진표 내용
                    <>
                        <div className="result-header">
                            <h3 className="result-card-title">Medical Questionnaire (問診票)</h3>
                            <button onClick={handleCopy} className={`copy-btn ${isCopied ? 'success' : 'default'}`}>
                                {isCopied ? "✓ 복사 완료" : "📋 텍스트 복사"}
                            </button>
                        </div>

                        <div className="medical-table">
                            {isPregnant ? (
                                <>
                                    <div className="table-row">
                                        <div className="table-label">환자 상태<br/>(患者状態)</div>
                                        <div className="table-content highlight">
                                            <span className="jp-main">{currentAge?.jp}</span>
                                            <span className="kr-sub">({currentAge?.kr})</span>
                                        </div>
                                    </div>
                                    
                                    {categorizedResults.appearance.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">임신 주차<br/>(妊娠週数)</div>
                                            <div className="table-content">
                                                {categorizedResults.appearance.map((item, i) => (
                                                    <div key={i}><span className="jp-text">{item.jp}</span><br/><span className="kr-text">({item.kr})</span></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="table-row">
                                        <div className="table-label">주요 증상<br/>(主な症状)</div>
                                        <div className="table-content">
                                            <ul className="medical-result-list">
                                                {categorizedResults.main.map((item, i) => (
                                                    <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-text">({item.kr})</span></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="table-row">
                                        <div className="table-label">환자 연령<br/>(患者年齢)</div>
                                        <div className="table-content highlight">
                                            <span className="jp-main">{currentAge?.jp}</span>
                                            <span className="kr-sub">({currentAge?.kr})</span>
                                        </div>
                                    </div>

                                    {categorizedResults.onsetTime.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">증상 시작<br/>(発症時期)</div>
                                            <div className="table-content">
                                                {categorizedResults.onsetTime.map((item, i) => (
                                                    <div key={i}><span className="jp-text">{item.jp}</span><br/><span className="kr-text">({item.kr})</span></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {categorizedResults.appearance.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">환자 상태<br/>(患者状態)</div>
                                            <div className="table-content">
                                                <ul className="medical-result-list">
                                                    {categorizedResults.appearance.map((item, i) => (
                                                        <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-text">({item.kr})</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    <div className="table-row">
                                        <div className="table-label">주요 증상<br/>(主な症状)</div>
                                        <div className="table-content">
                                            {categorizedResults.main.length === 0 ? (
                                                <p className="empty-text">선택된 증상이 없습니다.</p>
                                            ) : (
                                                <ul className="medical-result-list">
                                                    {categorizedResults.main.map((item, i) => (
                                                        <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-text">({item.kr})</span></li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {categorizedResults.excretory.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">소변/대변<br/>(排泄状態)</div>
                                            <div className="table-content">
                                                <ul className="medical-result-list">
                                                    {categorizedResults.excretory.map((item, i) => (
                                                        <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-text">({item.kr})</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {categorizedResults.medication.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">복용중인 약<br/>(服用中の薬)</div>
                                            <div className="table-content">
                                                <ul className="medical-result-list">
                                                    {categorizedResults.medication.map((item, i) => (
                                                        <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-sub">({item.kr})</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {categorizedResults.allergy.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">알레르기<br/>(アレルギー)</div>
                                            <div className="table-content">
                                                <ul className="medical-result-list">
                                                    {categorizedResults.allergy.map((item, i) => (
                                                        <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-text">({item.kr})</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {categorizedResults.pastIllness.length > 0 && (
                                        <div className="table-row">
                                            <div className="table-label">병력<br/>(既往歴)</div>
                                            <div className="table-content">
                                                <ul className="medical-result-list">
                                                    {categorizedResults.pastIllness.map((item, i) => (
                                                        <li key={i} className="medical-item"><span className="jp-text">・ {item.jp}</span><span className="kr-text">({item.kr})</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="table-row">
                                <div className="table-label">요청 사항<br/>(備考)</div>
                                <div className="table-content">
                                    <p className="jp-text">診察と処方をお願いします。</p>
                                    <p className="kr-text">(진찰과 처방을 부탁드립니다.)</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* 💡 문진표 하단 접기 버튼 */}
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

            {/* 핵심 기능 영역 */}
            <div className="btn-area">
                <button className="primary-btn location-btn" style={{ backgroundColor: isPregnant ? '#DB2777' : '#3B82F6' }} onClick={() => navigate('/hospitals', { state: { category: isPregnant ? 'obgyn' : 'pediatrics' } })}>📍 {isPregnant ? '근처 산부인과 찾기' : '내 주변 병원 찾기'}</button>
                {!isPregnant && <button className="primary-btn location-btn" style={{ backgroundColor: '#10B981', marginBottom: '12px' }} onClick={() => navigate('/pharmacies')}>💊 근처 약국 / 드럭스토어 찾기</button>}
                
                <button className="primary-btn" style={{ backgroundColor: '#00C73C', color: 'white', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => window.open('https://papago.naver.com/?sk=ko&tk=ja', '_blank')}><img src="/images/papago-icon.png" alt="파파고" style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: 'white', padding: '2px' }} />파파고 실시간 번역기 열기</button>
                <button className="primary-btn" style={{ backgroundColor: "#E5E7EB", color: "#4B5563", marginBottom: '32px' }} onClick={handleGoHome}>🏠 처음으로 돌아가기</button>

                {/* 외부 지원/정부 서비스 그룹 */}
                <div style={{ padding: '20px 16px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
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
                </div>
            </div>
        </div>
    );
}

export default Result;