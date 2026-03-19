import { ages } from "../data/ages";
import { useNavigate } from "react-router-dom";
import AgeCard from "../components/AgeCard";

function Home() {

    const navigate = useNavigate();

    // 연령 선택 시 질문 페이지 이동
    const handleSelectAge = (ageId) => {
        navigate(`/question/${ageId}`);
    };

    return (
        <div className="container">

            <h1 className="title">SafeTrip Japan</h1>

            <p className="subtitle">
                아이의 상태를 확인하고<br />
                일본 소아과에서 사용할 설명을 만들어드립니다
            </p>

            <div className="age-list">

                {ages.map((age) => (
                    <AgeCard
                        key={age.id}
                        age={age}
                        onSelect={handleSelectAge}
                    />
                ))}

            </div>

            <div className="btn-area">

                <button 
                    className="primary-btn emergency-btn"
                    onClick={() => navigate("/emergency")}
                >
                    🚑 응급 상황
                </button>

                <button 
                    className="primary-btn location-btn"
                    onClick={() => navigate("/hospitals")}
                >
                    📍 내 주변 병원 찾기
                </button>

            </div>

        </div>
    );
}

export default Home;