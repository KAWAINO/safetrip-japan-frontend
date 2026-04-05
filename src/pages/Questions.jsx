import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { questions } from "../data/questions";
import Header from "../components/Header";
import './Questions.css'; // 💡 CSS 임포트!

function Questions() {
    const navigate = useNavigate();
    const { ageId } = useParams();

    const ageQuestions = questions[ageId];

    const [currentIndex, setCurrentIndex] = useState(() => {
        const savedIndex = sessionStorage.getItem(`currentIndex_${ageId}`);
        return savedIndex ? parseInt(savedIndex, 10) : 0;
    });

    const [answers, setAnswers] = useState(() => {
        const savedAnswers = sessionStorage.getItem(`answers_${ageId}`);
        return savedAnswers ? JSON.parse(savedAnswers) : {};
    });

    useEffect(() => {
        if (!ageQuestions) {
            navigate("/", { replace: true });
        }
    }, [ageQuestions, navigate]);

    useEffect(() => {
        if (ageQuestions) {
            sessionStorage.setItem(`answers_${ageId}`, JSON.stringify(answers));
            sessionStorage.setItem(`currentIndex_${ageId}`, currentIndex.toString());
        }
    }, [answers, currentIndex, ageId, ageQuestions]);

    if (!ageQuestions) return null;

    const currentQuestion = ageQuestions[currentIndex];

    const goNext = (currentAnswers = answers) => {
        let nextIndex = currentIndex + 1;
        while (nextIndex < ageQuestions.length) {
            const nextQ = ageQuestions[nextIndex];
            if (!nextQ.condition) break; 

            const dependsOnAnswer = currentAnswers[nextQ.condition.dependsOn];
            const hasMatchingValue = Array.isArray(dependsOnAnswer)
                ? nextQ.condition.values.some(v => dependsOnAnswer.includes(v))
                : nextQ.condition.values.includes(dependsOnAnswer);

            if (hasMatchingValue) break;
            nextIndex++;
        }

        if (nextIndex < ageQuestions.length) {
            setCurrentIndex(nextIndex);
        } else {
            navigate(`/result/${ageId}`, { state: { answers: currentAnswers } });
        }
    };

    const handleSingleSelect = (option) => {
        const nextAnswers = { ...answers, [currentQuestion.id]: option.value };
        setAnswers(nextAnswers);
        setTimeout(() => goNext(nextAnswers), 300);
    };

    const handleMultiSelect = (option) => {
        setAnswers(prev => {
            const currentAnswers = prev[currentQuestion.id] || [];
            let updatedAnswers;
            if (currentAnswers.includes(option.value)) {
                updatedAnswers = currentAnswers.filter(val => val !== option.value);
            } else {
                updatedAnswers = [...currentAnswers, option.value];
            }
            return { ...prev, [currentQuestion.id]: updatedAnswers };
        });
    };

    const goPrev = () => {
        let prevIndex = currentIndex - 1;
        while (prevIndex >= 0) {
            const prevQ = ageQuestions[prevIndex];
            if (!prevQ.condition) break;
            const dependsOnAnswer = answers[prevQ.condition.dependsOn];
            const hasMatchingValue = Array.isArray(dependsOnAnswer)
                ? prevQ.condition.values.some(v => dependsOnAnswer.includes(v))
                : prevQ.condition.values.includes(dependsOnAnswer);

            if (hasMatchingValue) break;
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

    const isChecked = (optionValue) => {
        const currentAnswers = answers[currentQuestion.id] || [];
        return currentAnswers.includes(optionValue);
    };

    return (
        <>
            <Header onBack={goPrev} />
            <div className="container">
                <h2 className="title">{currentQuestion.question}</h2>

                <div className="options">
                    {currentQuestion.uiType === "colorPalette" ? (
                        <div className="color-grid">
                            {currentQuestion.options.map((option) => {
                                const isSelected = answers[currentQuestion.id] === option.value;
                                return (
                                    <div key={option.value} className="color-item">
                                        <button
                                            onClick={() => handleSingleSelect(option)}
                                            className="color-btn"
                                            style={{
                                                backgroundColor: option.colorCode,
                                                border: option.value === 'white' ? '2px solid #E5E7EB' : 'none',
                                                boxShadow: isSelected
                                                    ? `0 0 0 4px white, 0 0 0 7px ${option.colorCode}`
                                                    : '0 4px 6px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            {isSelected && (
                                                <span className="color-check" style={{
                                                    color: (option.value === 'white' || option.value === 'yellow') ? '#111827' : '#FFFFFF'
                                                }}>✔</span>
                                            )}
                                        </button>
                                        <span className="color-label" style={{
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
                        currentQuestion.options.map((option) => (
                            currentQuestion.type === "single" ? (
                                <button
                                    key={option.value}
                                    className={`option-btn ${answers[currentQuestion.id] === option.value ? "selected" : ""}`}
                                    onClick={() => handleSingleSelect(option)}
                                >
                                    {option.label}
                                </button>
                            ) : (
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
                                    {isChecked(option.value) && <span className="check-icon">✔</span>}
                                </label>
                            )
                        ))
                    )}
                </div>

                {currentQuestion.type === "multi" && (
                    <button className="primary-btn" onClick={() => goNext()} style={{ marginTop: "20px" }}>
                        다음
                    </button>
                )}
            </div>
        </>
    );
}

export default Questions;