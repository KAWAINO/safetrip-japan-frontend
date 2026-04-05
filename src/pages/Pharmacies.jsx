import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PharmacyCard from "../components/PharmacyCard";
import { pharmacies } from "../data/pharmacies";
import './Pharmacies.css'; // 💡 추가됨

function Pharmacies() {
    const navigate = useNavigate();
    const [isNight, setIsNight] = useState(false);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        const currentHour = new Date().getHours();
        const nightMode = currentHour >= 20 || currentHour < 9;
        setIsNight(nightMode);

        if (nightMode) {
            setFilteredList(pharmacies.filter(p => p.is24Hours));
        } else {
            setFilteredList(pharmacies);
        }
    }, []);

    const openGoogleMaps = (lat, lng) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container">
                <h2 className="title">근처 약국 및 드럭스토어</h2>
                
                {isNight ? (
                    <div className="disclaimer-box night-alert">
                        <span className="alert-icon">🌙</span>
                        <p>
                            <b>현재 야간/새벽 시간대입니다.</b><br/>
                            24시간 드럭스토어만 안내합니다. 단, 매장에 '등록판매자(登録販売者)'가 부재중일 경우 의약품 구매가 거절될 수 있으니 주의하세요.
                        </p>
                    </div>
                ) : (
                    <div className="disclaimer-box day-alert">
                        <span className="alert-icon">☀️</span>
                        <p>
                            현재 영업 중인 약국 및 드럭스토어입니다. 병원 처방전이 없다면 드럭스토어를 방문해 상비약을 구매하세요.
                        </p>
                    </div>
                )}

                <div className="pharmacy-list-wrap">
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