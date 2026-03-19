import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { hospitals } from "../data/hospitals";
import { calculateDistance } from "../utils/distance";

function Hospitals() {
    const navigate = useNavigate();

    // 테스트용 하드코딩된 내 위치 (나고야역)
    const MY_LOCATION = {
        lat: 35.1709,
        lng: 136.8815
    };

    // 거리가 계산된 병원 리스트를 거리순으로 정렬
    const sortedHospitals = useMemo(() => {
        const withDistance = hospitals.map(hospital => {
            const distance = calculateDistance(
                MY_LOCATION.lat, 
                MY_LOCATION.lng, 
                hospital.lat, 
                hospital.lng
            );
            return { ...hospital, distance };
        });

        // 거리 오름차순(가까운 순) 정렬
        return withDistance.sort((a, b) => a.distance - b.distance);
    }, []);

    // 구글 맵 앱으로 연결하는 URL 생성 함수 (길찾기)
    const openGoogleMaps = (hospital) => {
        // 도착지 좌표로 구글 맵 웹/앱 열기
        const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.lat},${hospital.lng}`;
        window.open(url, "_blank");
    };

    return (
        <div className="container" style={{ textAlign: "left" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", fontSize: "16px" }}>
                    ⬅ 뒤로
                </button>
            </div>

            <h2 className="title" style={{ marginBottom: "8px" }}>근처 소아과 찾기</h2>
            <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "24px" }}>
                현재 위치(테스트: 나고야역) 기준 가까운 순
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {sortedHospitals.map(hospital => (
                    <div key={hospital.id} style={{ background: "white", padding: "20px", borderRadius: "16px", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                            <div>
                                <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#111827" }}>{hospital.nameKr}</h3>
                                <p style={{ margin: 0, fontSize: "14px", color: "#4B5563" }}>{hospital.nameJp}</p>
                            </div>
                            <span style={{ background: "#EFF6FF", color: "#1D4ED8", padding: "4px 8px", borderRadius: "8px", fontSize: "14px", fontWeight: "bold" }}>
                                {hospital.distance.toFixed(1)}km
                            </span>
                        </div>

                        <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#6B7280" }}>
                            📍 {hospital.addressKr}
                        </p>

                        <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                            {hospital.languages.map(lang => (
                                <span key={lang} style={{ background: "#F3F4F6", color: "#374151", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
                                    🗣️ {lang}
                                </span>
                            ))}
                        </div>

                        <button 
                            onClick={() => openGoogleMaps(hospital)}
                            style={{ width: "100%", padding: "12px", background: "#3B82F6", color: "white", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", cursor: "pointer" }}
                        >
                            🗺️ 구글 맵으로 길찾기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hospitals;