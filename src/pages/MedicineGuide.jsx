// src/pages/MedicineGuide.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import './MedicineGuide.css';

function MedicineGuide() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const passedUserType = location.state?.userType || 'adult';
    const categoryId = location.state?.categoryId || null;
    const categoryName = location.state?.categoryName || '';

    const [activeTab, setActiveTab] = useState(passedUserType);
    const [medicines, setMedicines] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQjJv4lF5YAC3ppghOH2Q4_YtAB_XK5xKTozfGDJ55hLuoPacFCLK4yrWSry5q4t-mFjPJ4lizPxmLE/pub?output=csv';

    const parseCSV = (csvText) => {
        const rows = csvText.split('\n');
        const headers = rows[0].split(',');
        
        return rows.slice(1).map(row => {
            if (!row.trim()) return null;
            const values = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            const obj = {};
            
            headers.forEach((header, index) => {
                let val = values[index] || '';
                val = val.replace(/^"|"$/g, '').replace(/""/g, '"').trim();
                obj[header.trim()] = val;
            });
            return obj;
        }).filter(Boolean);
    };

    // 💡 오프라인 캐싱이 완벽하게 적용된 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. 인터넷을 통해 최신 데이터 가져오기 시도
                const response = await fetch(GOOGLE_SHEET_CSV_URL);
                if (!response.ok) throw new Error('네트워크 응답이 없습니다.');
                
                const csvData = await response.text();
                const jsonData = parseCSV(csvData);
                
                // 2. 통신 성공 시 화면에 띄우고 스마트폰(localStorage)에 몰래 저장해둠
                setMedicines(jsonData);
                localStorage.setItem('cachedMedicines', JSON.stringify(jsonData));
                setIsLoading(false);
                
            } catch (error) {
                // 🚨 3. 인터넷이 끊겼거나 에러 시 저장된 오프라인 데이터를 불러옴
                console.warn('인터넷이 끊겼습니다. 저장된 오프라인 데이터를 불러옵니다.', error);
                
                const savedData = localStorage.getItem('cachedMedicines');
                
                if (savedData) {
                    // 저장된 데이터가 있으면 그걸로 화면 렌더링
                    setMedicines(JSON.parse(savedData));
                } else {
                    // 인터넷도 안 되고 예전 데이터도 없으면 빈 화면
                    setMedicines([]);
                }
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const currentData = medicines.filter(medicine => {
        const isMatchTab = medicine.target === activeTab;
        const isMatchCategory = categoryId ? medicine.category === categoryId : true;
        return isMatchTab && isMatchCategory;
    });

    const handleCardClick = (medicine) => {
        navigate(`/medicine-detail/${medicine.id}`, { state: { medicine } });
    };

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container guide-container">
                <div className="title-area guide-title-area">
                    <h1 className="title">🎒 일본 국민 상비약 도감</h1>
                    <p className="guide-desc">
                        {categoryId ? `지금 선택하신 '${categoryName}' 추천 리스트입니다.` : '드럭스토어에서 가장 많이 찾는 필수 상비약입니다.'}
                    </p>
                </div>

                {!categoryId && (
                    <div className="tab-container">
                        <button 
                            className={`tab-btn ${activeTab === 'adult' ? 'active' : ''}`}
                            onClick={() => setActiveTab('adult')}
                        >
                            👩 성인용
                        </button>
                        <button 
                            className={`tab-btn ${activeTab === 'child' ? 'active' : ''}`}
                            onClick={() => setActiveTab('child')}
                        >
                            👶 어린이용
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p className="loading-text">최신 상비약 정보를<br/>불러오는 중입니다...</p>
                    </div>
                ) : (
                    <div className="medicine-list">
                        {currentData.length > 0 ? (
                            currentData.map((medicine, index) => (
                                <div 
                                    key={medicine.id || index} 
                                    className="medicine-card"
                                    onClick={() => handleCardClick(medicine)}
                                >
                                    {medicine.warning && (
                                        <div className="warning-badge">
                                            🚨 {medicine.warning}
                                        </div>
                                    )}
                                    <div className="medicine-header">
                                        <img 
                                            src={medicine.imgUrl} 
                                            alt={medicine.krName} 
                                            className="medicine-img" 
                                        />
                                        <div className="medicine-info">
                                            <h3 className="medicine-name-kr">{medicine.krName}</h3>
                                            <p className="medicine-name-jp">{medicine.jpName}</p>
                                            <div className="medicine-tags">
                                                {medicine.tags && medicine.tags.split(',').map(tag => (
                                                    <span key={tag} className="tag">#{tag.trim()}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="medicine-desc">
                                        💡 {medicine.desc}
                                    </div> */}
                                    
                                    <div className="detail-link">
                                        자세히 보기 ➡️
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>해당 카테고리의 추천 상비약 데이터가 없습니다.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default MedicineGuide;