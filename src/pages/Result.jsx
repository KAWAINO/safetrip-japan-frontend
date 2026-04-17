// src/pages/Result.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import './Result.css';

// 💡 1. 연령대 매핑 사전에 '임산부' 추가
const ageInfoMap = {
    'under1': { kr: '1세 (12개월) 미만', jp: '1歳（12ヶ月）未満' },
    'over1': { kr: '1세 (12개월) 이상', jp: '1歳（12ヶ月）以上' },
    'pregnant': { kr: '임산부 (태교 여행)', jp: '妊婦（妊娠中）' } // 신규 추가!
};

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);

    const [resultData, setResultData] = useState(() => {
        if (location.state && location.state.ageId && location.state.answers) {
            return location.state;
        }
        const under1Answers = sessionStorage.getItem("answers_under1");
        const over1Answers = sessionStorage.getItem("answers_over1");
        // 💡 2. 임산부 세션 데이터도 허용!
        const pregnantAnswers = sessionStorage.getItem("answers_pregnant"); 

        if (under1Answers) return { ageId: "under1", answers: JSON.parse(under1Answers) };
        if (over1Answers) return { ageId: "over1", answers: JSON.parse(over1Answers) };
        if (pregnantAnswers) return { ageId: "pregnant", answers: JSON.parse(pregnantAnswers) };

        return null;
    });

    useEffect(() => {
        if (!resultData) navigate("/", { replace: true });
    }, [resultData, navigate]);

    const translatedResults = useMemo(() => {
        if (!resultData || !questions[resultData.ageId]) return [];
        const ageQuestions = questions[resultData.ageId];
        const answers = resultData.answers;
        const results = [];

        ageQuestions.forEach((q) => {
            const answerVal = answers[q.id];
            if (!answerVal || (Array.isArray(answerVal) && answerVal.length === 0)) return;

            if (Array.isArray(answerVal)) {
                answerVal.forEach(val => {
                    const option = q.options.find(o => o.value === val);
                    if (option && option.jp) results.push({ kr: option.label, jp: option.jp });
                });
            } else {
                const option = q.options.find(o => o.value === answerVal);
                if (option && option.jp) results.push({ kr: option.label, jp: option.jp });
            }
        });
        return results;
    }, [resultData]);

    const handleGoHome = () => {
        sessionStorage.clear();
        navigate("/");
    };

    const handleCopy = async () => {
        if (translatedResults.length === 0) return;
        
        const currentAge = ageInfoMap[resultData.ageId];
        // 💡 일본어로 나이/환자 상태 명시 (임산부면 '환자 연령대: 임부(임신중)'으로 예쁘게 나옴)
        const ageText = currentAge ? `[患者の年齢層 / 환자 연령대: ${currentAge.jp}]\n` : '';
        const textToCopy = translatedResults.map(item => `• ${item.jp} (${item.kr})`).join('\n');
        const fullText = `${ageText}[症状のまとめ / 증상 요약]\n${textToCopy}`;

        try {
            await navigator.clipboard.writeText(fullText);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            alert("복사 기능을 지원하지 않는 브라우저입니다.", err);
        }
    };

    if (!resultData) return null;

    const currentAge = ageInfoMap[resultData.ageId];
    
    // 💡 임산부 여부 확인 (버튼 등에서 활용)
    const isPregnant = resultData.ageId === 'pregnant';

    return (
        <div className="container">
            <h2 className="title">직원 또는 의사에게 보여주세요</h2>

            {/* 💡 SOS 아이스브레이킹 메시지 박스 */}
            <div className="sos-message-box">
                <p className="sos-jp-text">
                    日本を旅行中の韓国人です。日本語はよく話せません。<br />
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

            {/* 💡 의사가 바로 볼 수 있는 환자 상태 알림 박스 */}
            {currentAge && (
                <div style={{ backgroundColor: isPregnant ? '#FDF2F8' : '#EFF6FF', border: `2px solid ${isPregnant ? '#FBCFE8' : '#BFDBFE'}`, borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: isPregnant ? '#BE185D' : '#1D4ED8', wordBreak: 'keep-all', lineHeight: '1.4' }}>
                        {isPregnant ? '患者の状態：' : '患者の年齢層：'}<span style={{ textDecoration: 'underline' }}>{currentAge.jp}</span>
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: isPregnant ? '#DB2777' : '#3B82F6', fontWeight: '600' }}>
                        ({isPregnant ? '환자의 상태' : '환자의 연령대'}: {currentAge.kr})
                    </p>
                </div>
            )}

            <div className="result-card">
                <div className="result-header">
                    <h3 className="result-card-title">증상 요약 (症状のまとめ)</h3>
                    <button
                        onClick={handleCopy}
                        className={`copy-btn ${isCopied ? 'success' : 'default'}`}
                    >
                        {isCopied ? "✓ 복사 완료" : "📋 텍스트 복사"}
                    </button>
                </div>

                {translatedResults.length === 0 ? (
                    <p className="empty-text">선택된 증상이 없습니다.</p>
                ) : (
                    <ul className="result-list">
                        {translatedResults.map((item, index) => (
                            <li key={index} className="result-item">
                                <p className="jp-text">{item.jp}</p>
                                <p className="kr-text">{item.kr}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="btn-area">
                {/* 💡 임산부일 경우 산부인과 찾기로 문구 변경! */}
                <button 
                    className="primary-btn location-btn" 
                    style={{ backgroundColor: isPregnant ? '#DB2777' : '#3B82F6' }}
                    onClick={() => navigate('/hospitals', { state: { category: isPregnant ? 'obgyn' : 'pediatrics' } })}
                >
                    📍 {isPregnant ? '근처 산부인과 찾기' : '내 주변 병원 찾기'}
                </button>

                {/* 💡 수정: 임산부가 아닐 때만 약국 찾기 버튼 표시 */}
                {!isPregnant && (
                    <button 
                        className="primary-btn location-btn" 
                        style={{ backgroundColor: '#10B981', marginBottom: '12px' }} 
                        onClick={() => navigate('/pharmacies')}
                    >
                        💊 근처 약국 / 드럭스토어 찾기
                    </button>
                )}

                <button className="primary-btn" style={{ backgroundColor: "#E5E7EB", color: "#4B5563" }} onClick={handleGoHome}>
                    🏠 처음으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default Result;