// src/pages/Pharmacies.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import './Pharmacies.css'; 
import LocationSearchModal from '../components/LocationSearchModal'; 
import CouponModal from '../components/CouponModal';

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

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

function Pharmacies() {
    const navigate = useNavigate();
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(Boolean(navigator.geolocation));
    const [isNight] = useState(() => {
        const currentHour = new Date().getHours();
        return currentHour >= 20 || currentHour < 9;
    });
    const [searchType, setSearchType] = useState('drugstore'); 

    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(!navigator.geolocation);

    const [isModalOpen, setIsModalOpen] = useState(false);
    // 컴포넌트 상단에 쿠폰 모달 상태 추가 
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [searchedLocationName, setSearchedLocationName] = useState("내 주변");

    useEffect(() => {
        if (!navigator.geolocation) return;

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
        
    }, []);

    useEffect(() => {
        if (!userLocation) return;

        const fetchPharmacies = async () => {
            setLoading(true);
            try {
                const placesService = await loadGooglePlacesService();
                const keywordTarget = searchType === 'drugstore' ? '薬局' : '調剤薬局';

                const request = {
                    location: userLocation,
                    radius: searchType === 'drugstore' ? 2000 : 3000, 
                    keyword: keywordTarget, 
                    openNow: isNight 
                };

                placesService.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                        const formattedData = results.map(place => {
                            const distance = calculateDistance(
                                userLocation.lat, userLocation.lng,
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
    }, [userLocation, searchType, isNight]);

    const handleManualSearch = async (keyword) => {
        try {
            const placesService = await loadGooglePlacesService();
            const request = {
                query: keyword + " 일본", 
                fields: ['name', 'geometry']
            };

            placesService.findPlaceFromQuery(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                    const place = results[0];
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
                    const locationName = place.name || keyword;

                    setUserLocation({ lat, lng }); 
                    setSearchedLocationName(locationName); 
                    setIsModalOpen(false); 
                } else {
                    alert("검색 결과가 없습니다. 지역명을 더 정확히 입력해주세요.");
                }
            });
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
            alert("검색 중 오류가 발생했습니다.");
        }
    };

    const openDirections = (pharmacy) => {
        const encodedName = encodeURIComponent(pharmacy.nameKr);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${pharmacy.id}`;
        window.location.assign(url);
    };

    const openFullMap = () => {
        if (!userLocation) return;
        const query = encodeURIComponent(searchType === 'drugstore' ? '薬局' : '調剤薬局');
        const url = `https://www.google.com/maps/search/${query}/@${userLocation.lat},${userLocation.lng},15z`;
        window.location.assign(url);
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ alignItems: "flex-start" }}>
                
                <h2 className="title" style={{ marginBottom: '12px', width: '100%', textAlign: 'center' }}>
                    어떤 곳을 찾으시나요?
                </h2>
                
                {/* 💡 여기가 핵심입니다! justifyContent를 'center'로 변경했습니다. */}
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '16px' }}>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #CBD5E1', backgroundColor: '#ffffff', fontSize: '13px', color: '#334155', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                    >
                        🔍 다른 지역 검색
                    </button>
                </div>

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
                            <span className="sub-desc">(일부 상비약/생활용품을 파는 곳도 있으나, 처방약 조제가 메인입니다.)</span><br/>
                            {isNight && "🌙 심야에는 영업 중인 조제약국이 거의 없을 수 있습니다."}
                        </p>
                    </div>
                )}


                {/* 💸 [수익화 파이프라인] 드럭스토어 탭일 때만 보이는 제휴 배너! */}
                {searchType === 'drugstore' && (
                    <div 
                        className="affiliate-banner"
                        onClick={() => setIsCouponModalOpen(true)} 
                    >
                        <div className="affiliate-content">
                            <span className="affiliate-badge">관광객 전용 혜택</span>
                            <h4 className="affiliate-title">🎁 일본 필수 쇼핑 할인 쿠폰북</h4>
                            <p className="affiliate-desc">마츠키요, 돈키호테 등 면세+추가 할인!</p>
                        </div>
                        <div className="affiliate-icon">🛍️</div>
                    </div>
                )}


                {!locationError && userLocation && (
                    <p style={{ width: '100%', textAlign: 'center', fontSize: '15px', color: '#334155', marginBottom: '16px' }}>
                        <b>[{searchedLocationName}]</b> 에서 가장 가까운 5곳
                    </p>
                )}

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

            <LocationSearchModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSearch={handleManualSearch} 
            />

            {/* 💡 새로 추가한 쿠폰 모달 렌더링 */}
            <CouponModal 
                isOpen={isCouponModalOpen} 
                onClose={() => setIsCouponModalOpen(false)} 
            />
        </>
    );
}

export default Pharmacies;