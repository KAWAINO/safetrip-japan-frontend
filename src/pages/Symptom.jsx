import { useParams } from "react-router-dom";
import { symptoms } from "../data/symptoms";

function Symptom() {

  const { age } = useParams();

  return (
    <div className="container">

      <h1 className="title">증상을 선택하세요</h1>

      <p className="subtitle">
        선택된 연령: {age}
      </p>

      <div className="age-list">

        {symptoms.map((symptom) => (

          <div key={symptom.id} className="age-card">

            <div className="age-icon">
              {symptom.icon}
            </div>

            <div className="age-desc">
              {symptom.label}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Symptom;