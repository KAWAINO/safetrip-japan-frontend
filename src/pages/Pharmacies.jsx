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

    // 💡 추가됨: 사용자 실제 위치 상태 및 에러 상태
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(false);

    // 💡 테스트용 고정 위치 (나고야역)
    const MY_LOCATION = { lat: 35.1709, lng: 136.8815 };

    // 1️⃣ 컴포넌트 마운트 시 위치 가져오기 및 주/야간 모드 설정
    useEffect(() => {
        const currentHour = new Date().getHours();
        const nightMode = currentHour >= 20 || currentHour < 9;
        setIsNight(nightMode);

        // ------------------------------------------------------------------
        // 🚨 [테스트 모드] 한국에서 일본 검색을 테스트하고 싶다면 아래 두 줄의 주석을 푸세요!
        // ------------------------------------------------------------------
        // setUserLocation(MY_LOCATION);
        // return; 
        // ------------------------------------------------------------------

        // ✅ [실전 모드] 실제 스마트폰 GPS 로직
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("GPS 권한 에러:", error);
                    setLocationError(true);
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setLocationError(true);
            setLoading(false);
        }
    }, []);

    // 2️⃣ 위치(userLocation)가 파악되면 약국 검색 API 실행하기
    useEffect(() => {
        if (!userLocation) return;

        const fetchPharmacies = async () => {
            setLoading(true);
            try {
                const placesService = await loadGooglePlacesService();

                const keywordTarget = searchType === 'drugstore' ? '薬局' : '調剤薬局';

                const request = {
                    location: userLocation, // 💡 내 위치 적용
                    radius: searchType === 'drugstore' ? 2000 : 3000, 
                    keyword: keywordTarget, 
                    openNow: isNight // 야간일 때만 강제로 '현재 영업 중' 필터 적용
                };

                placesService.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                        const formattedData = results.map(place => {
                            const distance = calculateDistance(
                                userLocation.lat, userLocation.lng, // 💡 내 위치 적용
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
    }, [userLocation, searchType, isNight]); // 💡 위치, 탭, 주야간 상태가 바뀔 때마다 실행

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
        window.location.href = url; 
    };

    const openFullMap = () => {
        if (!userLocation) return;
        const query = encodeURIComponent(searchType === 'drugstore' ? '薬局' : '調剤薬局');
        const url = `https://www.google.com/maps/search/${query}/@${userLocation.lat},${userLocation.lng},15z`;
        window.location.href = url; 
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ alignItems: "flex-start" }}>
                <h2 className="title" style={{ marginBottom: "16px" }}>어떤 곳을 찾으시나요?</h2>

                {/* 💡 탭 버튼 UI */}
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
                
                {/* 💡 안내 문구 */}
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

                {/* 💡 위치 권한 거부 시 안내 메시지 */}
                {locationError ? (
                    <div style={{ width: '100%', textAlign: 'center', padding: '40px 0' }}>
                        <span className="alert-icon" style={{fontSize: '30px', display: 'block', margin: '0 auto 10px'}}>📍</span>
                        <p style={{color: '#111827', fontWeight: 'bold', marginBottom: '8px'}}>위치 정보를 가져올 수 없습니다.</p>
                        <p style={{fontSize: '14px', color: '#6B7280'}}>
                            내 주변 약국을 찾으려면 스마트폰 설정에서<br/>웹사이트의 <b>[위치(GPS) 권한]</b>을 허용해 주세요.
                        </p>
                        <button 
                            onClick={() => window.location.reload()} 
                            style={{marginTop: '16px', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold'}}
                        >
                            새로고침
                        </button>
                    </div>
                ) : loading || !userLocation ? ( 
                    <p className="loading-text">
                        {!userLocation ? '현재 위치를 확인하고 있습니다... 📍' : (searchType === 'drugstore' ? '주변 약국을 찾고 있습니다... 🔍' : '주변 조제약국을 찾고 있습니다... 🔍')}
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