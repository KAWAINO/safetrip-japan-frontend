import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import './Pharmacies.css'; 

const loadGooglePlacesService = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};

function Pharmacies() {
    const navigate = useNavigate();
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNight, setIsNight] = useState(false);
    const [searchType, setSearchType] = useState('drugstore'); 

    // 💡 테스트용 고정 위치 (나고야역)
    const MY_LOCATION = { lat: 35.1709, lng: 136.8815 };

    useEffect(() => {
        const currentHour = new Date().getHours();
        const nightMode = currentHour >= 20 || currentHour < 9;
        setIsNight(nightMode);

        const fetchPharmacies = async () => {
            setLoading(true);
            try {
                // ----------------------------------------------------
                // 🚨 실전 배포 시 아래 주석을 풀고 GPS 위치를 사용해!
                // ----------------------------------------------------
                /*
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const currentPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    // ... (아래 API 호출 로직이 이 안으로 들어와야 함) ...
                }, (error) => {
                    console.error("위치 정보 에러:", error);
                    // 위치 허용 거부 시 기본 위치(MY_LOCATION) 사용 로직 등 추가 필요
                });
                */
                // ----------------------------------------------------

                // 지금은 테스트를 위해 고정 위치 사용
                const currentPos = MY_LOCATION;
                const placesService = await loadGooglePlacesService();

                const keywordTarget = searchType === 'drugstore' ? '薬局' : '調剤薬局';

                const request = {
                    location: currentPos,
                    radius: searchType === 'drugstore' ? 2000 : 3000, 
                    keyword: keywordTarget, 
                    openNow: nightMode 
                };

                placesService.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                        const formattedData = results.map(place => {
                            const distance = calculateDistance(
                                currentPos.lat, currentPos.lng, 
                                place.geometry.location.lat(), place.geometry.location.lng()
                            );
                            return {
                                id: place.place_id,
                                nameKr: place.name,
                                addressKr: place.vicinity, 
                                distance: distance,
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng()
                            };
                        });

                        formattedData.sort((a, b) => a.distance - b.distance);
                        setPharmacies(formattedData.slice(0, 5)); 
                    } else {
                        setPharmacies([]); 
                    }
                    setLoading(false);
                });

            } catch (error) {
                console.error("API 로드 에러:", error);
                setLoading(false);
            }
        };

        fetchPharmacies();
    }, [searchType]); 

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; 
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const openDirections = (pharmacy) => {
        const encodedName = encodeURIComponent(pharmacy.nameKr);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${pharmacy.id}`;
        window.open(url, "_self"); // 모바일 유령 탭 방지 (_self 역할)
    };

    const openFullMap = () => {
        const query = encodeURIComponent(searchType === 'drugstore' ? '薬局' : '調剤薬局');
        const url = `https://www.google.com/maps/search/${query}/@${MY_LOCATION.lat},${MY_LOCATION.lng},15z`;
        window.open(url, "_self"); 
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ alignItems: "flex-start" }}>
                <h2 className="title" style={{ marginBottom: "16px" }}>어떤 곳을 찾으시나요?</h2>

                {/* 💡 탭 버튼 UI (CSS 클래스로 분리) */}
                <div className="tab-container">
                    <button 
                        onClick={() => setSearchType('drugstore')}
                        className={`tab-btn ${searchType === 'drugstore' ? 'active-drugstore' : ''}`}
                    >
                        💊 약국 (드럭스토어)
                    </button>
                    <button 
                        onClick={() => setSearchType('pharmacy')}
                        className={`tab-btn ${searchType === 'pharmacy' ? 'active-pharmacy' : ''}`}
                    >
                        🏥 조제 약국
                    </button>
                </div>
                
                {/* 💡 안내 문구 (CSS 클래스 활용) */}
                {searchType === 'drugstore' ? (
                    <div className="disclaimer-box day-alert alert-drugstore">
                        <span className="alert-icon">💊</span>
                        <p>
                            <b>일반 상비약</b>을 구매할 수 있습니다.<br/>
                            {isNight && "🌙 현재 영업 중인 곳만 표시됩니다. 약사 부재 시 일부 약(1류 의약품)은 구매가 불가할 수 있습니다."}
                        </p>
                    </div>
                ) : (
                    <div className="disclaimer-box day-alert alert-pharmacy">
                        <span className="alert-icon">🏥</span>
                        <p>
                            병원 <b>처방전</b>이 있어야 약을 지을 수 있습니다.<br/>
                            <span className="sub-desc">
                                (일부 상비약/생활용품을 파는 곳도 있으나, 처방약 조제가 메인입니다.)
                            </span><br/>
                            {isNight && "🌙 심야에는 영업 중인 조제약국이 거의 없을 수 있습니다."}
                        </p>
                    </div>
                )}

                {loading ? (
                    <p className="loading-text">
                        {searchType === 'drugstore' ? '주변 약국을' : '주변 조제약국을'} 찾고 있습니다... 🔍
                    </p>
                ) : pharmacies.length === 0 ? (
                    <p className="loading-text">주변에 영업 중인 곳이 없습니다.</p>
                ) : (
                    <div className="pharmacy-list-wrap">
                        {pharmacies.map(pharmacy => (
                            <div key={pharmacy.id} className="hospital-card">
                                <div className="hospital-header-row">
                                    <div>
                                        <h3 className="hospital-name-kr">{pharmacy.nameKr}</h3>
                                    </div>
                                    <span className={`hospital-distance ${searchType === 'drugstore' ? 'dist-drugstore' : 'dist-pharmacy'}`}>
                                        {pharmacy.distance.toFixed(1)}km
                                    </span>
                                </div>

                                <p className="hospital-address">📍 {pharmacy.addressKr}</p>

                                <button 
                                    onClick={() => openDirections(pharmacy)} 
                                    className={`map-btn ${searchType === 'drugstore' ? 'btn-drugstore' : 'btn-pharmacy'}`}
                                >
                                    🗺️ 길찾기 시작
                                </button>
                            </div>
                        ))}

                        <button 
                            onClick={openFullMap} 
                            className={`full-map-btn ${searchType === 'drugstore' ? 'btn-drugstore' : 'btn-pharmacy-dark'}`}
                        >
                            📍 구글 맵에서 전체 보기
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Pharmacies;