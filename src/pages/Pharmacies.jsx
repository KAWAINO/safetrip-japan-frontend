// src/pages/Pharmacies.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PharmacyCard from "../components/PharmacyCard"; // [💥추가] 새로 만든 컴포넌트 import
import { pharmacies } from "../data/pharmacies";

function Pharmacies() {
    const navigate = useNavigate();
    const [isNight, setIsNight] = useState(false);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        // 현재 스마트폰의 시간(시)을 가져옴 (0~23)
        const currentHour = new Date().getHours();
        
        // 밤 8시(20시)부터 아침 9시(9시 미만)까지를 야간으로 판정
        const nightMode = currentHour >= 20 || currentHour < 9;
        setIsNight(nightMode);

        if (nightMode) {
            // 야간: 24시간 운영하는 곳만 필터링
            setFilteredList(pharmacies.filter(p => p.is24Hours));
        } else {
            // 주간: 모든 약국/드럭스토어 표시
            setFilteredList(pharmacies);
        }
    }, []);

    // 구글맵 길찾기 열기 함수 (컴포넌트로 전달됨)
    const openGoogleMaps = (lat, lng) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container">
                <h2 className="title">근처 약국 및 드럭스토어</h2>
                
                {/* 시간대별 안내 문구 분기 처리 */}
                {isNight ? (
                    <div className="disclaimer-box" style={{ backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }}>
                        <span className="alert-icon">🌙</span>
                        <p style={{ color: '#B45309' }}>
                            <b>현재 야간/새벽 시간대입니다.</b><br/>
                            24시간 드럭스토어만 안내합니다. 단, 매장에 '등록판매자(登録販売者)'가 부재중일 경우 의약품 구매가 거절될 수 있으니 주의하세요.
                        </p>
                    </div>
                ) : (
                    <div className="disclaimer-box" style={{ backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }}>
                        <span className="alert-icon">☀️</span>
                        <p style={{ color: '#1D4ED8' }}>
                            현재 영업 중인 약국 및 드럭스토어입니다. 병원 처방전이 없다면 드럭스토어를 방문해 상비약을 구매하세요.
                        </p>
                    </div>
                )}

                {/* [💥수정: 개편된 리스트 출력] 기존 age-list/age-card 구조를 버리고 전용 컴포넌트 사용 */}
                <div style={{ width: '100%', marginTop: '24px' }}>
                    {filteredList.map((pharmacy) => (
                        <PharmacyCard 
                            key={pharmacy.id} 
                            pharmacy={pharmacy} 
                            onGetDirections={openGoogleMaps} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Pharmacies;