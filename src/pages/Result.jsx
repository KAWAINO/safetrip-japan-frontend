// src/pages/Result.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";
import './Result.css';

// 💡 연령대 매핑 사전 (의사용으로 정중한 표현 사용)
const ageInfoMap = {
    'under1': { kr: '1세 (12개월) 미만', jp: '1歳（12ヶ月）未満' },
    'over1': { kr: '1세 (12개월) 이상', jp: '1歳（12ヶ月）以上' }
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

        if (under1Answers) return { ageId: "under1", answers: JSON.parse(under1Answers) };
        if (over1Answers) return { ageId: "over1", answers: JSON.parse(over1Answers) };

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
        
        // 💡 복사할 때 연령 정보도 같이 포함되도록 수정
        const currentAge = ageInfoMap[resultData.ageId];
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

    return (
        
        <div className="container">
            <h2 className="title">직원 또는 의사에게 보여주세요</h2>

            {/* 💡 SOS 아이스브레이킹 메시지 박스 */}
            <div className="sos-message-box">
                <p className="sos-jp-text">
                    日本を旅行中の韓国人です。日本語はよく話せません。<br />
                    年齢と症状は以下の通りです。診察が必要です。
                </p>
                <p className="sos-kr-text">
                    (일본을 여행 중인 한국인 입니다. 일본어를 잘 모릅니다. 연령과 증상은 아래와 같습니다. 진찰이 필요합니다.)
                </p>
            </div>

            <div className="disclaimer-box">
                <span className="alert-icon">⚠️</span>
                <p>본 번역은 소통 보조용이며, 의학적 진단을 대체하지 않습니다.<br />
                    (この翻訳はコミュニケーション補助用であり、医学的診断に代わるものではありません。)</p>
            </div>

            {/* 💡 소아과 의사가 바로 볼 수 있는 환자 연령대 알림 박스 추가! */}
            {currentAge && (
                <div style={{ backgroundColor: '#EFF6FF', border: '2px solid #BFDBFE', borderRadius: '12px', padding: '16px', marginBottom: '24px', textAlign: 'left', width: '100%', boxSizing: 'border-box' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800', color: '#1D4ED8', wordBreak: 'keep-all', lineHeight: '1.4' }}>
                        患者の年齢層：<span style={{ textDecoration: 'underline' }}>{currentAge.jp}</span>
                    </p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#3B82F6', fontWeight: '600' }}>
                        (환자의 연령대: {currentAge.kr})
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
                <button className="primary-btn location-btn" onClick={() => navigate('/hospitals')}>
                    📍 내 주변 병원 찾기
                </button>
                <button className="primary-btn location-btn" style={{ backgroundColor: '#10B981', marginBottom: '12px' }} onClick={() => navigate('/pharmacies')}>
                    💊 근처 약국 / 드럭스토어 찾기
                </button>
                <button className="primary-btn" style={{ backgroundColor: '#F59E0B', color: 'white', marginBottom: '12px' }} onClick={() => navigate('/medicine-guide')}>
                    🎒 일본 어린이 상비약 도감 보기
                </button>
                <button className="primary-btn" style={{ backgroundColor: "#E5E7EB", color: "#4B5563" }} onClick={handleGoHome}>
                    🏠 처음으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default Result;