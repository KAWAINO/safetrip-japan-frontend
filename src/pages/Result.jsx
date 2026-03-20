import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    // 복사 완료 상태 관리
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
        if (!resultData) {
            navigate("/", { replace: true });
        }
    }, [resultData, navigate]);

    // 💥 [수정됨] answers 객체 기반으로 번역된 결과 리스트 생성
    const translatedResults = useMemo(() => {
        // resultData가 없거나 해당 연령의 질문 데이터가 없으면 빈 배열 반환
        if (!resultData || !questions[resultData.ageId]) return [];

        // resultData에서 현재 연령대의 질문 배열과, 사용자의 답변 객체를 꺼내옴
        const ageQuestions = questions[resultData.ageId];
        const answers = resultData.answers;
        const results = [];

        // ageQuestions 배열을 돌면서 번역 데이터 매칭
        ageQuestions.forEach((q) => {
            const answerVal = answers[q.id];

            // 💥 [핵심 안전장치] 스킵되었거나 답변이 없는 경우 무시
            if (!answerVal || (Array.isArray(answerVal) && answerVal.length === 0)) {
                return;
            }

            if (Array.isArray(answerVal)) { // 다중 선택
                answerVal.forEach(val => {
                    const option = q.options.find(o => o.value === val);
                    if (option && option.jp) {
                        results.push({ kr: option.label, jp: option.jp });
                    }
                });
            } else { // 단일 선택
                const option = q.options.find(o => o.value === answerVal);
                if (option && option.jp) {
                    results.push({ kr: option.label, jp: option.jp });
                }
            }
        });

        return results;
    }, [resultData]); // 의존성 배열에 resultData 추가

    const handleGoHome = () => {
        sessionStorage.clear();
        navigate("/");
    };

    // 클립보드 복사 함수
    const handleCopy = async () => {
        if (translatedResults.length === 0) return;

        const textToCopy = translatedResults
            .map(item => `• ${item.jp} (${item.kr})`)
            .join('\n');

        const fullText = `[症状のまとめ / 증상 요약]\n${textToCopy}`;

        try {
            await navigator.clipboard.writeText(fullText);
            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error("클립보드 복사 실패:", err);
            alert("복사 기능을 지원하지 않는 브라우저입니다.");
        }
    };

    if (!resultData) return null;

    return (
        <div className="container">
            <h2 className="title">의사에게 보여주세요</h2>

            <div className="disclaimer-box">
                <span className="alert-icon">⚠️</span>
                <p>본 번역은 소통 보조용이며, 의학적 진단을 대체하지 않습니다.<br />
                    (この翻訳はコミュニケーション補助用であり、医学的診断に代わるものではありません。)</p>
            </div>

            <div className="result-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", borderBottom: "2px solid #F3F4F6", paddingBottom: "12px" }}>
                    <h3 className="result-card-title" style={{ border: "none", margin: 0, padding: 0 }}>
                        증상 요약 (症状のまとめ)
                    </h3>

                    {/* 복사 버튼 */}
                    <button
                        onClick={handleCopy}
                        style={{
                            background: isCopied ? "#10B981" : "#F3F4F6",
                            color: isCopied ? "white" : "#374151",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "all 0.2s"
                        }}
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
                <button
                    className="primary-btn location-btn"
                    onClick={() => navigate('/hospitals')}
                >
                    📍 내 주변 병원 찾기
                </button>

                <button
                    className="primary-btn location-btn"
                    style={{ backgroundColor: '#10B981', marginBottom: '12px' }}
                    onClick={() => navigate('/pharmacies')}
                >
                    💊 근처 약국 / 드럭스토어 찾기
                </button>

                <button
                    className="primary-btn"
                    style={{ backgroundColor: '#F59E0B', color: 'white', marginBottom: '12px' }}
                    onClick={() => navigate('/medicine-guide')}
                >
                    🎒 일본 어린이 상비약 도감 보기
                </button>

                <button
                    className="primary-btn"
                    style={{ backgroundColor: "#E5E7EB", color: "#4B5563" }}
                    onClick={handleGoHome}
                >
                    🏠 처음으로 돌아가기
                </button>
            </div>
        </div>
    );
}

export default Result;