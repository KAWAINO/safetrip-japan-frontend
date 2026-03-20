import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { questions } from "../data/questions";
import Header from "../components/Header";

function Questions() {
    const navigate = useNavigate();
    const { ageId } = useParams();

    // 연령별 질문 배열 가져오기
    const ageQuestions = questions[ageId];

    // [수정] 상태 초기화 로직: sessionStorage에서 백업된 데이터를 먼저 찾는다.
    // JSON.parse()는 문자열로 저장된 데이터를 자바스크립트 객체/배열로 되돌린다.
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

    // [수정] 상태 업데이트 동기화: answers나 currentIndex가 바뀔 때마다 sessionStorage에 백업한다.
    // JSON.stringify()는 객체/배열을 문자열로 변환하여 저장한다.
    useEffect(() => {
        if (ageQuestions) {
            sessionStorage.setItem(`answers_${ageId}`, JSON.stringify(answers));
            sessionStorage.setItem(`currentIndex_${ageId}`, currentIndex.toString());
        }
    }, [answers, currentIndex, ageId, ageQuestions]);

    if (!ageQuestions) return null; // 리다이렉트 전 렌더링 방지

    const currentQuestion = ageQuestions[currentIndex];

    // 단일 선택 처리 (함수형 업데이트 적용 및 사이드 이펙트 분리)
    const handleSingleSelect = (option) => {
        // 1. 다음 상태 계산 (goNext에 넘겨주기 위해)
        const nextAnswers = {
            ...answers,
            [currentQuestion.id]: option.value
        };

        // 2. 상태 업데이트 (이전 상태 prev를 참조하여 안전하게 업데이트)
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: option.value
        }));

        // 3. 계산된 상태를 가지고 다음으로 이동
        goNext(nextAnswers);
    };

    // 다중 선택 처리 (함수형 업데이트 적용)
    const handleMultiSelect = (option) => {
        setAnswers(prev => {
            const currentAnswers = prev[currentQuestion.id] || [];
            let updatedAnswers;

            if (currentAnswers.includes(option.value)) {
                // 이미 선택된 경우 제거 (필터링)
                updatedAnswers = currentAnswers.filter(val => val !== option.value);
            } else {
                // 새로 선택된 경우 추가 (스프레드 연산자)
                updatedAnswers = [...currentAnswers, option.value];
            }

            return {
                ...prev,
                [currentQuestion.id]: updatedAnswers
            };
        });
    };

    // 다음 질문 이동
    const goNext = () => {
        let nextIndex = currentIndex + 1;

        // 다음 질문들에 조건이 걸려있는지 확인하고, 조건에 안 맞으면 건너뛰기 로직
        while (nextIndex < ageQuestions.length) {
            const nextQ = ageQuestions[nextIndex];

            if (!nextQ.condition) break; // 조건이 없으면 이 질문에서 스톱 (화면에 띄움)

            // 조건이 있다면, 사용자가 앞서 선택한 답변과 비교
            const dependsOnAnswer = answers[nextQ.condition.dependsOn];

            // dependsOnAnswer가 배열일 수도 있고(다중선택), 단일 값일 수도 있음
            const hasMatchingValue = Array.isArray(dependsOnAnswer)
                ? nextQ.condition.values.some(v => dependsOnAnswer.includes(v))
                : nextQ.condition.values.includes(dependsOnAnswer);

            if (hasMatchingValue) {
                break; // 조건에 맞으면 이 질문에서 스톱 (화면에 띄움)
            }

            // 조건에 안 맞으면 그 다음 질문(nextIndex++)으로 조용히 넘어감
            nextIndex++;
        }

        if (nextIndex < ageQuestions.length) {
            setCurrentIndex(nextIndex);
        } else {
            // 마지막 질문이면 결과 페이지로 이동
            navigate(`/result/${ageId}`, { state: { answers } });
        }
    };

    // 이전 질문으로 가기 (조건 검사 포함)
    const goPrev = () => {
        let prevIndex = currentIndex - 1;

        // 이전으로 돌아갈 때도 조건에 안 맞는 질문은 건너뛰고 뒤로 가야 함
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
                    {currentQuestion.options.map((option) => (
                        currentQuestion.type === "single" ? (
                            // 단일 선택 버튼 (수정된 클래스명: option-btn)
                            <button
                                key={option.value}
                                className={`option-btn ${answers[currentQuestion.id] === option.value ? "selected" : ""}`}
                                onClick={() => handleSingleSelect(option)}
                            >
                                {option.label}
                            </button>
                        ) : (
                            // 다중 선택 체크박스 (클래스명: checkbox-option)
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
                    ))}
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