// src/pages/Hospitals.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import './Hospitals.css'; 
import LocationSearchModal from '../components/LocationSearchModal';

// 💡 스크립트 중복 로드를 방지하고 안전하게 관리하기 위한 전역 Promise
let googleMapsPromise = null;

const loadGooglePlacesService = () => {
    // 이미 구글맵이 완벽하게 로드되어 있다면 즉시 반환
    if (window.google && window.google.maps && window.google.maps.places) {
        return Promise.resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
    }

    // 로드 중이 아니라면 새로운 Promise 생성
    if (!googleMapsPromise) {
        googleMapsPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places&region=JP`;
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                // 💡 스크립트는 로드되었으나 권한 문제로 places 객체가 없을 때의 멈춤 버그 방지
                if (window.google && window.google.maps && window.google.maps.places) {
                    resolve(new window.google.maps.places.PlacesService(document.createElement('div')));
                } else {
                    reject(new Error("Google Maps API 권한 또는 로드 오류"));
                }
            };
            
            script.onerror = (error) => {
                reject(error);
            };
            
            document.head.appendChild(script);
        });
    }
    
    return googleMapsPromise;
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
            keyword: "小児科 Pediatrics", 
            targetName: "소아과", 
            themeColor: "#1D4ED8" 
        },
        obgyn: {
            title: "근처 산부인과",
            keyword: "産婦人科 レディースクリニック OBGYN", 
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

    // 1️⃣ 위치 가져오기 (마운트 시 1회 실행)
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

    // 2️⃣ 병원 검색 API 로직
    const fetchHospitals = useCallback(async (isRetry = false) => {
        if (!userLocation) return;
        
        setLoading(true);

        try {
            const placesService = await loadGooglePlacesService();
            const searchKeyword = isRetry ? '夜間休日急病診療所 救急病院' : currentContent.keyword;

            const request = {
                // 💡 버그 수정: new google.maps.LatLng 대신 안전한 순수 객체(Literal) 사용
                location: { lat: userLocation.lat, lng: userLocation.lng }, 
                radius: isRetry ? 5000 : 3500, 
                keyword: searchKeyword,
                openNow: isOpenOnly && !isRetry, 
                type: ['hospital', 'doctor', 'health'] 
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
                            addressKr: place.vicinity || "주소 정보 없음", 
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
            console.error("구글 맵 API 에러 발생:", error);
            // 💡 에러 발생 시 무한 로딩에 빠지지 않도록 처리
            setHospitals([]);
            setLoading(false);
        }
    }, [userLocation, isOpenOnly, currentContent.keyword]);

    // 💡 userLocation이 세팅되면 검색 실행
    useEffect(() => {
        if (userLocation) {
            fetchHospitals();
        }
    }, [fetchHospitals, userLocation]);

    // 3️⃣ 수동 검색 함수
    const handleManualSearch = async (keyword) => {
        try {
            const placesService = await loadGooglePlacesService();
            const request = {
                query: keyword + " 日本", 
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

    const openDirections = (hospital) => {
        const encodedName = encodeURIComponent(hospital.nameKr);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${hospital.id}&travelmode=walking`;
        window.open(url, '_blank'); 
    };

    const openFullMap = () => {
        if (!userLocation) return;
        const query = encodeURIComponent(mode === 'emergency' ? '夜間休日急病診療所 救急病院' : currentContent.keyword);
        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
        window.open(url, '_blank'); 
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container hp-container">
                
                <h2 className="title hp-title hp-page-title" style={{ color: currentContent.themeColor }}>
                    {currentContent.title}
                </h2>
                
                <div className="hp-search-wrap">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="hp-search-btn"
                    >
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

                <p style={{ fontSize: '14px', color: '#4B5563', margin: '16px 0', textAlign: 'center' }}>
                    <b>[{searchedLocationName}]</b> 에서 가장 가까운 {currentContent.targetName} 5곳
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
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <p className="hp-loading-text" style={{ color: '#6B7280', fontSize: '15px' }}>
                            {!userLocation ? '현재 위치를 확인하고 있습니다... 📍' : `주변 ${currentContent.targetName}를 찾고 있습니다... 🔍`}
                        </p>
                    </div>
                ) : hospitals.length === 0 ? (
                    <div className="hp-empty-box">
                        <p className="hp-empty-title">
                            {isOpenOnly ? `현재 진료 중인 ${currentContent.targetName} 및 응급센터가 없습니다.` : `주변에 검색된 ${currentContent.targetName}가 없습니다.`}
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
                                            현재 진료 중인 일반 {currentContent.targetName}가 없어 <br/>
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