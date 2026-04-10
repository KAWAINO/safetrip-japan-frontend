import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { calculateDistance } from "../utils/distance"; // 💡 아래에 함수를 직접 넣어서 주석 처리했습니다.
import './Hospitals.css';

// 💡 1. 구글 API 스크립트 로드 함수
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

function Hospitals() {
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    // 💡 [기획자님 요청사항] 테스트용 나고야역 고정 위치 
    const MY_LOCATION = { lat: 35.1856, lng: 136.9016 };

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                // ----------------------------------------------------
                // 🚨 나중에 일본 가시거나 실전 배포할 때 아래 주석을 푸세요!
                // ----------------------------------------------------
                
                // navigator.geolocation.getCurrentPosition(async (position) => {
                //     const currentPos = {
                //         lat: position.coords.latitude,
                //         lng: position.coords.longitude
                //     };
                //     const placesService = await loadGooglePlacesService();

                //     const request = {
                //         location: currentPos,
                //         radius: 3000, // 3km 이내
                //         keyword: '小児科' // 소아과
                //     };

                //     placesService.nearbySearch(request, (results, status) => {
                //         if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                            
                //             // 데이터 가공 및 거리 계산
                //             const formattedData = results.map(place => {
                //                 const distance = calculateDistance(
                //                     currentPos.lat, currentPos.lng, 
                //                     place.geometry.location.lat(), place.geometry.location.lng()
                //                 );
                //                 return {
                //                     id: place.place_id,
                //                     nameKr: place.name, // 구글이 제공하는 이름 (주로 일본어)
                //                     nameJp: place.vicinity, // 주소로 활용
                //                     addressKr: place.vicinity, 
                //                     distance: distance,
                //                     lat: place.geometry.location.lat(),
                //                     lng: place.geometry.location.lng()
                //                 };
                //             });

                //             // 💡 거리순 정렬 후, [가장 가까운 5곳]만 잘라내기
                //             formattedData.sort((a, b) => a.distance - b.distance);
                //             setHospitals(formattedData.slice(0, 5)); 
                //             setLoading(false);
                //         } else {
                //             setLoading(false);
                //         }
                //     });
                // });
                
                // ----------------------------------------------------

                // 지금은 테스트를 위해 MY_LOCATION(나고야역)을 사용합니다.
                const currentPos = MY_LOCATION;
                const placesService = await loadGooglePlacesService();

                const request = {
                    location: currentPos,
                    radius: 3000, // 3km 이내
                    keyword: '小児科' // 소아과
                };

                placesService.nearbySearch(request, (results, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
                        
                        // 데이터 가공 및 거리 계산
                        const formattedData = results.map(place => {
                            const distance = calculateDistance(
                                currentPos.lat, currentPos.lng, 
                                place.geometry.location.lat(), place.geometry.location.lng()
                            );
                            return {
                                id: place.place_id,
                                nameKr: place.name, // 구글이 제공하는 이름 (주로 일본어)
                                nameJp: place.vicinity, // 주소로 활용
                                addressKr: place.vicinity, 
                                distance: distance,
                                lat: place.geometry.location.lat(),
                                lng: place.geometry.location.lng()
                            };
                        });

                        // 💡 거리순 정렬 후, [가장 가까운 5곳]만 잘라내기
                        formattedData.sort((a, b) => a.distance - b.distance);
                        setHospitals(formattedData.slice(0, 5)); 
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                });

            } catch (error) {
                console.error("API 로드 에러:", error);
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    // 거리 계산 함수 (Haversine 공식)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // 지구 반지름 (km)
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    // 💡 [최종 수정] 길찾기 시에도 목적지를 더 명확히 표시
const openDirections = (hospital) => {
    const encodedName = encodeURIComponent(hospital.nameKr);
    
    // travelmode를 생략하여 '추천(최적) 경로'로 설정합니다.
    // destination_place_id를 포함하여 엉뚱한 사무실이 아닌 '정확한 병원'이 찍히게 합니다.
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodedName}&destination_place_id=${hospital.id}`;
    
    window.open(url, "_blank");
};

    // 💡 [최종 수정] 줌 레벨과 위치를 강제로 고정하는 경로 기반 URL
    const openFullMap = () => {
        // 💡 /maps/search/검색어/@위도,경도,줌z 형식을 사용합니다.
        // 이 방식은 구글 맵이 열릴 때 해당 좌표로 화면을 '강제 이동'시키고 '줌인'합니다.
        const query = encodeURIComponent("小児科");
        const url = `https://www.google.com/maps/search/${query}/@${MY_LOCATION.lat},${MY_LOCATION.lng},14z`;
        
        window.open(url, "_blank");
    };

    return (
        <div className="container" style={{ alignItems: "flex-start" }}>
            <div className="hospitals-top">
                <button onClick={() => navigate(-1)} className="hospitals-back">
                    ⬅ 뒤로
                </button>
            </div>

            <h2 className="title" style={{ marginBottom: "8px" }}>근처 소아과 찾기</h2>
            <p className="hospitals-desc">내 주변에서 가장 가까운 소아과 5곳</p>

            {loading ? (
                <p style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                    주변 소아과를 찾고 있습니다... 🔍
                </p>
            ) : hospitals.length === 0 ? (
                <p style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#6B7280' }}>
                    주변에 검색된 소아과가 없습니다.
                </p>
            ) : (
                <div className="hospitals-list">
                    {hospitals.map(hospital => (
                        <div key={hospital.id} className="hospital-card">
                            <div className="hospital-header-row">
                                <div>
                                    <h3 className="hospital-name-kr" style={{ wordBreak: 'keep-all' }}>{hospital.nameKr}</h3>
                                </div>
                                <span className="hospital-distance">
                                    {hospital.distance.toFixed(1)}km
                                </span>
                            </div>

                            <p className="hospital-address">📍 {hospital.addressKr}</p>

                            {/* 💡 언어 지원 여부는 API에서 알 수 없으므로 번역앱 안내 문구로 대체했습니다 */}
                            <div className="hospital-langs">
                                <span className="hospital-lang-badge" style={{ backgroundColor: '#FEF3C7', color: '#D97706' }}>
                                    💡 방문 전 파파고 등 번역앱을 준비하세요
                                </span>
                            </div>

                            <button onClick={() => openDirections(hospital)} className="map-btn">
                                🗺️ 이 병원으로 길찾기
                            </button>
                        </div>
                    ))}

                    {/* 💡 기획자님이 제안하신 대망의 '지도에서 보기' 버튼 */}
                    <button 
                        onClick={openFullMap} 
                        style={{ 
                            width: '100%', padding: '16px', marginTop: '8px', marginBottom: '40px',
                            backgroundColor: '#10B981', color: 'white', border: 'none', 
                            borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', 
                            cursor: 'pointer', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' 
                        }}
                    >
                        📍 구글 맵에서 전체 보기
                    </button>
                </div>
            )}
        </div>
    );
}

export default Hospitals;