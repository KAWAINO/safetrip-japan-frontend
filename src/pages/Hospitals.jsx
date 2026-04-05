import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { hospitals } from "../data/hospitals";
import { calculateDistance } from "../utils/distance";
import './Hospitals.css'; // 💡 추가됨

function Hospitals() {
    const navigate = useNavigate();

    const MY_LOCATION = { lat: 35.1709, lng: 136.8815 };

    const sortedHospitals = useMemo(() => {
        const withDistance = hospitals.map(hospital => {
            const distance = calculateDistance(
                MY_LOCATION.lat, MY_LOCATION.lng, hospital.lat, hospital.lng
            );
            return { ...hospital, distance };
        });
        return withDistance.sort((a, b) => a.distance - b.distance);
    }, []);

    const openGoogleMaps = (hospital) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
        window.open(url, "_blank");
    };

    return (
        <div className="container" style={{ alignItems: "flex-start" }}>
            <div className="hospitals-top">
                <button onClick={() => navigate(-1)} className="hospitals-back">
                    ⬅ 뒤로
                </button>
            </div>

            <h2 className="title" style={{ marginBottom: "8px" }}>근처 소아과 찾기</h2>
            <p className="hospitals-desc">현재 위치(테스트: 나고야역) 기준 가까운 순</p>

            <div className="hospitals-list">
                {sortedHospitals.map(hospital => (
                    <div key={hospital.id} className="hospital-card">
                        <div className="hospital-header-row">
                            <div>
                                <h3 className="hospital-name-kr">{hospital.nameKr}</h3>
                                <p className="hospital-name-jp">{hospital.nameJp}</p>
                            </div>
                            <span className="hospital-distance">
                                {hospital.distance.toFixed(1)}km
                            </span>
                        </div>

                        <p className="hospital-address">📍 {hospital.addressKr}</p>

                        <div className="hospital-langs">
                            {hospital.languages.map(lang => (
                                <span key={lang} className="hospital-lang-badge">
                                    🗣️ {lang}
                                </span>
                            ))}
                        </div>

                        <button onClick={() => openGoogleMaps(hospital)} className="map-btn">
                            🗺️ 구글 맵으로 길찾기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hospitals;