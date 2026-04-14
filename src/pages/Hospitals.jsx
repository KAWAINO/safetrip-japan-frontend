// src/pages/Hospitals.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import './Hospitals.css'; 
import LocationSearchModal from '../components/LocationSearchModal';

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

// 💡 에러 해결 1: 화면 렌더링과 상관없는 계산 함수는 컴포넌트 바깥으로 뺐습니다.
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
    const [hospitals, setHospitals] = useState([]);
    
    // 💡 에러 해결 3: GPS 권한에 따라 초기 로딩/에러 상태를 동적으로 세팅
    const [loading, setLoading] = useState(Boolean(navigator.geolocation));
    const [locationError, setLocationError] = useState(!navigator.geolocation);
    
    const [isOpenOnly, setIsOpenOnly] = useState(true);
    const [mode, setMode] = useState('normal'); 
    const [showAmbulanceMsg, setShowAmbulanceMsg] = useState(false);

    const [userLocation, setUserLocation] = useState(null);
    
    // 수동 검색 모달 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 현재 검색된 지역 이름
    const [searchedLocationName, setSearchedLocationName] = useState("내 주변");

    // 1️⃣ 위치 가져오기
    useEffect(() => {
        if (!navigator.geolocation) return; // GPS 미지원 시 즉시 종료

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

    // 2️⃣ 약국 검색 API
    useEffect(() => {
        if (!userLocation) return; 

        const fetchHospitals = async (isRetry = false) => {
            setLoading(true);
            try {
                const placesService = await loadGooglePlacesService();
                const searchKeyword = isRetry ? '夜間休日急病診療所 救急病院' : '小児科';

                const request = {
                    location: userLocation, 
                    radius: isRetry ? 5000 : 3000, 
                    keyword: searchKeyword,
                    openNow: isOpenOnly 
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
        };

        fetchHospitals();
    }, [userLocation, isOpenOnly]); 

    // 3️⃣ 수동 검색 함수
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

    // 💡 에러 해결 2: window.location.assign() 사용으로 변경
    const openDirections = (hospital) => {
        const encodedName = encodeURIComponent(hospital.nameKr);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${hospital.id}`;
        window.location.assign(url); 
    };

    const openFullMap = () => {
        if (!userLocation) return;
        const query = encodeURIComponent(mode === 'emergency' ? '夜間休日急病診療所 救急病院' : '小児科');
        const url = `https://www.google.com/maps/search/${query}/@${userLocation.lat},${userLocation.lng},15z`;
        window.location.assign(url); 
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container hp-container">
                
                {/* 💡 CSS로 깔끔하게 분리된 상단 영역 */}
                <h2 className="title hp-title hp-page-title">근처 소아과</h2>
                
                <div className="hp-search-wrap">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="hp-search-btn"
                    >
                        🔍 다른 지역 검색
                    </button>
                </div>
                {/* ------------------------------------- */}
                
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

                <p>
                    <b>[{searchedLocationName}]</b> 에서 가장 가까운 소아과 5곳
                </p>

                {locationError ? (
                    <div className="hp-empty-box">
                        <span className="alert-icon" style={{fontSize: '30px', display: 'block', margin: '0 auto 10px'}}>📍</span>
                        <p className="hp-empty-title" style={{color: '#111827'}}>위치 정보를 가져올 수 없습니다.</p>
                        <p className="hp-empty-desc">
                            내 주변 병원을 찾으려면 스마트폰 설정에서<br/>웹사이트의 <b>[위치(GPS) 권한]</b>을 허용해 주세요.
                        </p>
                        <button 
                            onClick={() => window.location.reload()} 
                            style={{marginTop: '16px', padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#3B82F6', color: 'white', fontWeight: 'bold'}}
                        >
                            새로고침
                        </button>
                    </div>
                ) : loading || !userLocation ? ( 
                    <p className="hp-loading-text">
                        {!userLocation ? '현재 위치를 확인하고 있습니다... 📍' : '주변 소아과를 찾고 있습니다... 🔍'}
                    </p>
                ) : hospitals.length === 0 ? (
                    <div className="hp-empty-box">
                        <p className="hp-empty-title">
                            {isOpenOnly ? "현재 진료 중인 소아과 및 응급센터가 없습니다." : "주변에 검색된 소아과가 없습니다."}
                        </p>
                        {isOpenOnly && (
                            <p className="hp-empty-desc">
                                상단의 필터를 끄고 전체 병원을 확인하거나,<br/>응급 상황 시 119를 이용해 주세요.
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="hospitals-list hp-list-wrap">
                        {mode === 'emergency' && (
                            <div className="disclaimer-box hp-emergency-box">
                                <div className="hp-emergency-header">
                                    <span className="alert-icon hp-emergency-icon">🚨</span>
                                    <div className="hp-emergency-text">
                                        <p className="hp-emergency-title">
                                            현재 진료 중인 일반 소아과가 없어 <br/>
                                            [야간/휴일 응급센터] 위주로 검색되었습니다.
                                        </p>
                                        <p className="hp-emergency-sub">
                                            위급한 상황이라면 주변 현지인(호텔 프론트 등)에게 도움을 요청해 119를 부르세요.
                                        </p>
                                    </div>
                                </div>

                                <button 
                                    className="hp-sos-btn"
                                    onClick={() => setShowAmbulanceMsg(!showAmbulanceMsg)}
                                >
                                    🆘 현지인에게 119 요청하기
                                </button>

                                {showAmbulanceMsg && (
                                    <div className="hp-sos-msg-box">
                                        <p className="hp-sos-msg-guide">주변 일본인에게 이 화면을 보여주세요</p>
                                        <p className="hp-sos-msg-jp">救急車を呼んでください。</p>
                                        <p className="hp-sos-msg-kr">(구급차를 불러주세요.)</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {hospitals.map(hospital => (
                            <div key={hospital.id} className={`hospital-card ${hospital.isEmergency ? 'hp-card-emergency' : ''}`}>
                                <div className="hospital-header-row hp-card-header">
                                    <div>
                                        <h3 className="hospital-name-kr hp-card-name">{hospital.nameKr}</h3>
                                        {hospital.isEmergency && (
                                            <span className="hp-badge-emergency">야간/응급</span>
                                        )}
                                    </div>
                                    <span className="hospital-distance hp-card-dist">
                                        {hospital.distance.toFixed(1)}km
                                    </span>
                                </div>

                                <p className="hospital-address hp-card-addr">📍 {hospital.addressKr}</p>

                                <button 
                                    onClick={() => openDirections(hospital)} 
                                    className={`map-btn ${hospital.isEmergency ? 'hp-btn-emergency' : 'hp-btn-normal'}`}
                                >
                                    🗺️ 길찾기 시작
                                </button>
                            </div>
                        ))}

                        <button 
                            onClick={openFullMap} 
                            className={`full-map-btn ${mode === 'emergency' ? 'hp-full-btn-emergency' : 'hp-full-btn-normal'}`}
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
        </>
    );
}

export default Hospitals;