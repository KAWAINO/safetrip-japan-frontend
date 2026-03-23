import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { questions } from "../data/questions";
import Header from "../components/Header";

function Questions() {
    const navigate = useNavigate();
    const { ageId } = useParams();

    // 연령별 질문 배열 가져오기
    const ageQuestions = questions[ageId];

    const [currentIndex, setCurrentIndex] = useState(() => {
        const savedIndex = sessionStorage.getItem(`currentIndex_${ageId}`);
        return savedIndex ? parseInt(savedIndex, 10) : 0;
    });

    const [answers, setAnswers] = useState(() => {
        const savedAnswers = sessionStorage.getItem(`answers_${ageId}`);
        return savedAnswers ? JSON.parse(savedAnswers) : {};
    });

    // 방어 로직: 잘못된 URL 접근 시 홈으로 이동
    useEffect(() => {
        if (!ageQuestions) {
            console.error("유효하지 않은 연령 ID입니다.");
            navigate("/", { replace: true });
        }
    }, [ageQuestions, navigate]);

    // 상태 업데이트 동기화: answers나 currentIndex가 바뀔 때마다 sessionStorage에 백업
    useEffect(() => {
        if (ageQuestions) {
            sessionStorage.setItem(`answers_${ageId}`, JSON.stringify(answers));
            sessionStorage.setItem(`currentIndex_${ageId}`, currentIndex.toString());
        }
    }, [answers, currentIndex, ageId, ageQuestions]);

    if (!ageQuestions) return null; // 리다이렉트 전 렌더링 방지

    const currentQuestion = ageQuestions[currentIndex];

    // 💥 [수정완료] 다음 질문 이동 (최신 답변 상태를 인자로 받도록 수정)
    const goNext = (currentAnswers = answers) => {
        let nextIndex = currentIndex + 1;

        // 다음 질문들에 조건이 걸려있는지 확인하고, 조건에 안 맞으면 건너뛰기 로직
        while (nextIndex < ageQuestions.length) {
            const nextQ = ageQuestions[nextIndex];

            if (!nextQ.condition) break; 

            // 💥 [핵심] 기존 answers가 아니라, 방금 클릭해서 넘어온 currentAnswers(최신 데이터)로 검사!
            const dependsOnAnswer = currentAnswers[nextQ.condition.dependsOn];

            const hasMatchingValue = Array.isArray(dependsOnAnswer)
                ? nextQ.condition.values.some(v => dependsOnAnswer.includes(v))
                : nextQ.condition.values.includes(dependsOnAnswer);

            if (hasMatchingValue) {
                break; // 조건에 맞으면 이 질문에서 스톱
            }

            nextIndex++; // 조건에 안 맞으면 건너뜀
        }

        if (nextIndex < ageQuestions.length) {
            setCurrentIndex(nextIndex);
        } else {
            // 마지막 질문이면 결과 페이지로 이동
            navigate(`/result/${ageId}`, { state: { answers: currentAnswers } });
        }
    };

    // 💥 [수정완료] 단일 선택 처리 (상태 업데이트 후 0.3초 딜레이 주어 자연스럽게 넘어가기)
    const handleSingleSelect = (option) => {
        const nextAnswers = {
            ...answers,
            [currentQuestion.id]: option.value
        };

        setAnswers(nextAnswers);

        // 사용자가 체크 표시를 볼 수 있게 0.3초(300ms) 딜레이 후 다음 질문으로 이동
        setTimeout(() => {
            goNext(nextAnswers);
        }, 300);
    };

    // 다중 선택 처리 (기존 로직 유지)
    const handleMultiSelect = (option) => {
        setAnswers(prev => {
            const currentAnswers = prev[currentQuestion.id] || [];
            let updatedAnswers;

            if (currentAnswers.includes(option.value)) {
                updatedAnswers = currentAnswers.filter(val => val !== option.value);
            } else {
                updatedAnswers = [...currentAnswers, option.value];
            }

            return {
                ...prev,
                [currentQuestion.id]: updatedAnswers
            };
        });
    };

    // 이전 질문으로 가기
    const goPrev = () => {
        let prevIndex = currentIndex - 1;

        while (prevIndex >= 0) {
            const prevQ = ageQuestions[prevIndex];
            if (!prevQ.condition) break;

            const dependsOnAnswer = answers[prevQ.condition.dependsOn];
            const hasMatchingValue = Array.isArray(dependsOnAnswer)
                ? prevQ.condition.values.some(v => dependsOnAnswer.includes(v))
                : prevQ.condition.values.includes(dependsOnAnswer);

            if (hasMatchingValue) {
                break;
            }
            prevIndex--;
        }

        if (prevIndex >= 0) {
            setCurrentIndex(prevIndex);
        } else {
            sessionStorage.removeItem(`answers_${ageId}`);
            sessionStorage.removeItem(`currentIndex_${ageId}`);
            navigate(-1);
        }
    };

    // 다중 선택 버튼의 체크 상태 확인용 유틸 함수
    const isChecked = (optionValue) => {
        const currentAnswers = answers[currentQuestion.id] || [];
        return currentAnswers.includes(optionValue);
    };

    // UI 렌더링 (JSX)
    return (
        <>
            <Header onBack={goPrev} />

            <div className="container">
                {/* 질문 타이틀 */}
                <h2 className="title">{currentQuestion.question}</h2>

                {/* 답변 옵션 리스트 */}
                <div className="options">
                    {currentQuestion.uiType === "colorPalette" ? (
                        // 🎨 [신규 UI] 동그란 색상 팔레트 그리드
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '16px', padding: '10px 0' }}>
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers[currentQuestion.id] === option.value;
                                return (
                                    <div key={option.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                        <button
                                            onClick={() => handleSingleSelect(option)}
                                            style={{
                                                backgroundColor: option.colorCode,
                                                width: '64px',
                                                height: '64px',
                                                borderRadius: '50%',
                                                border: option.value === 'white' ? '2px solid #E5E7EB' : 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                transition: 'all 0.2s',
                                                // 선택되었을 때 바깥쪽에 테두리 링(Ring) 효과
                                                boxShadow: isSelected
                                                    ? `0 0 0 4px white, 0 0 0 7px ${option.colorCode}`
                                                    : '0 4px 6px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {/* 선택 시 체크 표시 */}
                                            {isSelected && (
                                                <span style={{
                                                    fontSize: '24px',
                                                    fontWeight: 'bold',
                                                    color: (option.value === 'white' || option.value === 'yellow') ? '#111827' : '#FFFFFF'
                                                }}>
                                                    ✔
                                                </span>
                                            )}
                                        </button>
                                        <span style={{
                                            fontSize: '14px',
                                            color: isSelected ? '#111827' : '#6B7280',
                                            fontWeight: isSelected ? '700' : '500'
                                        }}>
                                            {option.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        // ⬜ [기존 UI] 일반 네모 버튼 / 다중 선택 체크박스
                        currentQuestion.options.map((option) => (
                            currentQuestion.type === "single" ? (
                                // 단일 선택 버튼
                                <button
                                    key={option.value}
                                    className={`option-btn ${answers[currentQuestion.id] === option.value ? "selected" : ""}`}
                                    onClick={() => handleSingleSelect(option)}
                                >
                                    {option.label}
                                </button>
                            ) : (
                                // 다중 선택 체크박스
                                <label
                                    key={option.value}
                                    className={`checkbox-option ${isChecked(option.value) ? "selected" : ""}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={isChecked(option.value)}
                                        onChange={() => handleMultiSelect(option)}
                                    />
                                    <span className="label-text">{option.label}</span>
                                    {isChecked(option.value) && (
                                        <span className="check-icon">✔</span>
                                    )}
                                </label>
                            )
                        ))
                    )}
                </div>

                {/* 다중 선택 질문일 때만 노출되는 '다음' 버튼 */}
                {currentQuestion.type === "multi" && (
                    <button
                        className="primary-btn next-btn"
                        onClick={() => goNext()}
                        style={{ marginTop: "20px" }}
                    >
                        다음
                    </button>
                )}
            </div>
        </>
    );
}

export default Questions;