import { ages } from "../data/ages";
import { useNavigate } from "react-router-dom";
import AgeCard from "../components/AgeCard";

function Home() {

    const navigate = useNavigate();

    const handleSelectAge = (ageId) => {
        navigate(`/symptom/${ageId}`);
    };

    return (
        <div className="container">

            <h1 className="title">SafeTrip Japan</h1>

            <p className="subtitle">누가 아픈가요?</p>

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
                <button className="primary-btn emergency-btn">
                    🚑 응급 상황
                </button>

                <button className="primary-btn location-btn">
                    📍 내 주변 병원 찾기
                </button>
            </div>
        </div>
    );
}

export default Home;