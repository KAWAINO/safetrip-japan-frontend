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
    
    // 💡 핵심: 현재 선택된 탭 상태 (기본값은 수요가 가장 많은 '드럭스토어')
    const [searchType, setSearchType] = useState('drugstore'); 

    const MY_LOCATION = { lat: 35.1709, lng: 136.8815 };

    useEffect(() => {
        const currentHour = new Date().getHours();
        const nightMode = currentHour >= 20 || currentHour < 9;
        setIsNight(nightMode);

        const fetchPharmacies = async () => {
            setLoading(true); // 탭을 바꿀 때마다 로딩 표시
            try {
                const currentPos = MY_LOCATION;
                const placesService = await loadGooglePlacesService();

                // 💡 탭에 따라 검색 키워드 완벽 분리
                const keywordTarget = searchType === 'drugstore' ? 'ドラッグストア' : '薬局';

                const request = {
                    location: currentPos,
                    radius: searchType === 'drugstore' ? 2000 : 3000, // 드럭스토어는 2km, 약국은 조금 더 넓게 3km
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
                        setPharmacies([]); // 결과가 없을 때 리스트 비우기
                    }
                    setLoading(false);
                });

            } catch (error) {
                console.error("API 로드 에러:", error);
                setLoading(false);
            }
        };

        fetchPharmacies();
    }, [searchType]); // 💡 searchType이 바뀔 때마다 useEffect 다시 실행!

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
        window.open(url, "_self");
    };

    const openFullMap = () => {
        const query = encodeURIComponent(searchType === 'drugstore' ? 'ドラッグストア' : '薬局');
        const url = `https://www.google.com/maps/search/${query}/@${MY_LOCATION.lat},${MY_LOCATION.lng},15z`;
        window.open(url, "_self");
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ alignItems: "flex-start" }}>
                <h2 className="title" style={{ marginBottom: "16px" }}>어떤 약이 필요하신가요?</h2>

                {/* 💡 목적별 탭 UI 추가 */}
                <div style={{ display: 'flex', width: '100%', gap: '10px', marginBottom: '20px' }}>
                    <button 
                        onClick={() => setSearchType('drugstore')}
                        style={{ 
                            flex: 1, padding: '12px 5px', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', transition: '0.2s',
                            backgroundColor: searchType === 'drugstore' ? '#10B981' : '#E5E7EB',
                            color: searchType === 'drugstore' ? 'white' : '#6B7280'
                        }}
                    >
                        💊 상비약 (드럭스토어)
                    </button>
                    <button 
                        onClick={() => setSearchType('pharmacy')}
                        style={{ 
                            flex: 1, padding: '12px 5px', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', border: 'none', cursor: 'pointer', transition: '0.2s',
                            backgroundColor: searchType === 'pharmacy' ? '#3B82F6' : '#E5E7EB',
                            color: searchType === 'pharmacy' ? 'white' : '#6B7280'
                        }}
                    >
                        🏥 처방약 (조제약국)
                    </button>
                </div>
                
                {/* 💡 탭에 따른 맞춤형 안내 문구 */}
                {searchType === 'drugstore' ? (
                    <div className="disclaimer-box day-alert" style={{ backgroundColor: '#ECFDF5', borderColor: '#10B981' }}>
                        <span className="alert-icon">💊</span>
                        <p style={{ color: '#047857' }}>
                            호빵맨 시럽, 해열패치 등 <b>일반 상비약</b>을 구매할 수 있습니다. <br/>
                            {isNight && "🌙 현재 영업 중인 곳만 표시됩니다. 등록판매자 부재 시 일부 약은 못 살 수 있습니다."}
                        </p>
                    </div>
                ) : (
                    <div className="disclaimer-box day-alert" style={{ backgroundColor: '#EFF6FF', borderColor: '#3B82F6' }}>
                        <span className="alert-icon">🏥</span>
                        <p style={{ color: '#1D4ED8' }}>
                            병원에서 받은 <b>처방전</b>이 있어야 약을 지을 수 있는 곳입니다. <br/>
                            {isNight && "🌙 심야에는 문을 연 조제약국이 거의 없을 수 있습니다."}
                        </p>
                    </div>
                )}

                {loading ? (
                    <p style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                        {searchType === 'drugstore' ? '주변 드럭스토어를' : '주변 조제약국을'} 찾고 있습니다... 🔍
                    </p>
                ) : pharmacies.length === 0 ? (
                    <p style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                        주변에 영업 중인 곳이 없습니다.
                    </p>
                ) : (
                    <div className="pharmacy-list-wrap">
                        {pharmacies.map(pharmacy => (
                            <div key={pharmacy.id} className="hospital-card">
                                <div className="hospital-header-row">
                                    <div>
                                        <h3 className="hospital-name-kr" style={{ wordBreak: 'keep-all' }}>{pharmacy.nameKr}</h3>
                                    </div>
                                    <span className="hospital-distance" style={{ 
                                        backgroundColor: searchType === 'drugstore' ? '#ECFDF5' : '#EFF6FF', 
                                        color: searchType === 'drugstore' ? '#059669' : '#1D4ED8' 
                                    }}>
                                        {pharmacy.distance.toFixed(1)}km
                                    </span>
                                </div>

                                <p className="hospital-address">📍 {pharmacy.addressKr}</p>

                                <button onClick={() => openDirections(pharmacy)} className="map-btn" style={{ 
                                    backgroundColor: searchType === 'drugstore' ? '#10B981' : '#3B82F6' 
                                }}>
                                    🗺️ 길찾기 시작
                                </button>
                            </div>
                        ))}

                        <button 
                            onClick={openFullMap} 
                            style={{ 
                                width: '100%', padding: '16px', marginTop: '8px', marginBottom: '40px',
                                backgroundColor: searchType === 'drugstore' ? '#059669' : '#2563EB', 
                                color: 'white', border: 'none', 
                                borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', 
                                cursor: 'pointer' 
                            }}
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