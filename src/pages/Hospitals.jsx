// src/pages/Hospitals.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import './Hospitals.css'; 
import LocationSearchModal from '../components/LocationSearchModal';

// 💡 스크립트 중복 로드 방지를 위한 전역 변수
let isGoogleMapsLoading = false;

const loadGooglePlacesService = () => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps && window.google.maps.places) {
      resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
      return;
    }
    
    if (isGoogleMapsLoading) {
      const checkInterval = setInterval(() => {
        if (window.google && window.google.maps && window.google.maps.places) {
          clearInterval(checkInterval);
          resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
        }
      }, 100);
      return;
    }

    isGoogleMapsLoading = true;
    const script = document.createElement('script');
    // 💡 region=JP와 libraries=places를 명시하여 일본 내 검색 최적화
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&region=JP`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isGoogleMapsLoading = false;
      resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
    };
    script.onerror = (error) => {
      isGoogleMapsLoading = false;
      reject(error);
    };
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

function Hospitals() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const category = location.state?.category || 'pediatrics';

    const contentMap = {
        pediatrics: {
            title: "근처 소아과",
            keyword: "小児科 Pediatrics", // 💡 영문 키워드 혼용으로 검색량 증대
            targetName: "소아과",
            themeColor: "#1D4ED8"
        },
        obgyn: {
            title: "근처 산부인과",
            keyword: "産婦인과 産婦人科 OBGYN レディースクリニック", // 💡 일본에서 흔히 쓰는 '레이디스 클리닉' 추가
            targetName: "산부인과",
            themeColor: "#DB2777"
        }
    };

    const currentContent = contentMap[category];

    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locationError, setLocationError] = useState(false);
    const [isOpenOnly, setIsOpenOnly] = useState(true);
    const [mode, setMode] = useState('normal'); 
    const [showAmbulanceMsg, setShowAmbulanceMsg] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedLocationName, setSearchedLocationName] = useState("내 주변");

    // 1️⃣ 위치 가져오기
    useEffect(() => {
        if (!navigator.geolocation) {
          setLocationError(true);
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLocationError(false);
            },
            (error) => {
                console.error("GPS 권한 에러:", error);
                setLocationError(true);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, []);

    // 2️⃣ 병원 검색 API (useCallback으로 최적화)
    const fetchHospitals = useCallback(async (isRetry = false) => {
        if (!userLocation) return;
        setLoading(true);

        try {
            const placesService = await loadGooglePlacesService();
            const searchKeyword = isRetry ? '夜間休日急病診療所 救急病院 Emergency Hospital' : currentContent.keyword;

            const request = {
                location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
                radius: isRetry ? 5000 : 3500, // 💡 반경 약간 확대
                keyword: searchKeyword,
                openNow: isOpenOnly && !isRetry, // 응급 재검색 시에는 영업시간 제한 해제 고려
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
                            lng: place.geometry.location.lng(),
                            isEmergency: isRetry
                        };
                    });

                    formattedData.sort((a, b) => a.distance - b.distance);
                    setHospitals(formattedData.slice(0, 5));
                    setMode(isRetry ? 'emergency' : 'normal'); 
                    setLoading(false);
                } else {
                    // 검색 결과가 없는 경우 응급 모드 재시도
                    if (!isRetry && isOpenOnly) {
                        fetchHospitals(true); 
                    } else {
                        setHospitals([]);
                        setMode('normal');
                        setLoading(false);
                    }
                }
            });
        } catch (error) {
            console.error("API 에러:", error);
            setLoading(false);
        }
    }, [userLocation, isOpenOnly, currentContent.keyword]);

    useEffect(() => {
        fetchHospitals();
    }, [fetchHospitals]);

    // 3️⃣ 수동 지역 검색
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
                    setUserLocation({ lat, lng });
                    setSearchedLocationName(place.name || keyword);
                    setIsModalOpen(false); 
                } else {
                    alert("검색 결과가 없습니다. 지역명을 더 정확히 입력해주세요.");
                }
            });
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    };

    // 💡 정식 Google Maps Directions URL로 수정
    const openDirections = (hospital) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hospital.nameKr)}&destination_place_id=${hospital.id}&travelmode=walking`;
        window.open(url, '_blank');
    };

    // 💡 정식 Google Maps Search URL로 수정
    const openFullMap = () => {
        if (!userLocation) return;
        const query = encodeURIComponent(mode === 'emergency' ? '夜間休日急病診療所' : currentContent.keyword);
        const url = `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${userLocation.lat},${userLocation.lng}`;
        window.open(url, '_blank');
    };

    // ... (이하 렌더링 JSX는 기존과 동일하되, loading 상태 처리가 개선됨)
    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container hp-container">
                <h2 className="title hp-title hp-page-title" style={{ color: currentContent.themeColor }}>
                    {currentContent.title}
                </h2>
                
                <div className="hp-search-wrap">
                    <button onClick={() => setIsModalOpen(true)} className="hp-search-btn">
                        🔍 다른 지역 검색
                    </button>
                </div>

                <div className="hp-filter-box">
                    <span className="hp-filter-text">🏥 현재 진료 중인 곳만 보기</span>
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={isOpenOnly} 
                            onChange={() => setIsOpenOnly(!isOpenOnly)} 
                            disabled={locationError} 
                        />
                        <span className="slider round"></span>
                    </label>
                </div>

                <p className="hp-location-info">
                    <b>[{searchedLocationName}]</b> 주변 {currentContent.targetName} 5곳
                </p>

                {locationError ? (
                    <div className="hp-empty-box">
                        <span className="alert-icon" style={{fontSize: '30px', display: 'block', margin: '0 auto 10px'}}>📍</span>
                        <p className="hp-empty-title" style={{color: '#111827'}}>위치 정보를 가져올 수 없습니다.</p>
                        <p className="hp-empty-desc">웹사이트의 <b>[위치 권한]</b>을 허용해 주세요.</p>
                        <button onClick={() => window.location.reload()} className="hp-retry-btn">새로고침</button>
                    </div>
                ) : loading ? ( 
                    <div className="hp-loading-wrap">
                        <p className="hp-loading-text">주변 {currentContent.targetName}를 찾고 있습니다... 🔍</p>
                    </div>
                ) : hospitals.length === 0 ? (
                    <div className="hp-empty-box">
                        <p className="hp-empty-title">검색된 병원이 없습니다.</p>
                        <p className="hp-empty-desc">현재 진료 시간 외이거나 주변에 병원이 없을 수 있습니다.</p>
                    </div>
                ) : (
                    <div className="hospitals-list hp-list-wrap">
                        {mode === 'emergency' && (
                            <div className="disclaimer-box hp-emergency-box">
                                <div className="hp-emergency-header">
                                    <span className="alert-icon">🚨</span>
                                    <div className="hp-emergency-text">
                                        <p className="hp-emergency-title">일반 병원이 모두 문을 닫아 [응급센터]를 안내합니다.</p>
                                    </div>
                                </div>
                                <button className="hp-sos-btn" onClick={() => setShowAmbulanceMsg(!showAmbulanceMsg)}>🆘 119 요청 화면 보기</button>
                                {showAmbulanceMsg && (
                                    <div className="hp-sos-msg-box">
                                        <p className="hp-sos-msg-jp">救急車를 불러주세요: 救急車を呼んでください。</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {hospitals.map(hospital => (
                            <div key={hospital.id} className={`hospital-card ${hospital.isEmergency ? 'hp-card-emergency' : ''}`}>
                                <div className="hospital-header-row hp-card-header">
                                    <div className="hp-card-name-group">
                                        <h3 className="hospital-name-kr hp-card-name">{hospital.nameKr}</h3>
                                        {hospital.isEmergency && <span className="hp-badge-emergency">야간/응급</span>}
                                    </div>
                                    <span className="hospital-distance hp-card-dist">{hospital.distance.toFixed(1)}km</span>
                                </div>
                                <p className="hospital-address hp-card-addr">📍 {hospital.addressKr}</p>
                                <button onClick={() => openDirections(hospital)} className="map-btn hp-btn-normal">🗺️ 길찾기 시작</button>
                            </div>
                        ))}

                        <button onClick={openFullMap} className="full-map-btn hp-full-btn-normal">📍 구글 맵에서 전체 보기</button>
                    </div>
                )}
            </div>

            <LocationSearchModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSearch={handleManualSearch} 
            />
        </>
    );
}

export default Hospitals;