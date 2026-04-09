// src/pages/MedicineDetail.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './MedicineDetail.css';

function MedicineDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // MedicineGuide.jsx에서 클릭할 때 넘겨준 약 데이터
    const medicine = location.state?.medicine;

    // 💡 예외 처리: 약 데이터를 거치지 않고 주소창으로 직접 들어온 경우 도감 목록으로 쫓아냄
    useEffect(() => {
        if (!medicine) {
            navigate('/medicine-guide', { replace: true });
        }
    }, [medicine, navigate]);

    if (!medicine) return null;

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container detail-container">
                {/* 1. 상단 약 이미지 및 타이틀 */}
                <div className="detail-header">
                    <img src={medicine.imgUrl} alt={medicine.krName} className="detail-img" />
                    <h2 className="detail-title-kr">{medicine.krName}</h2>
                    <p className="detail-title-jp">{medicine.jpName}</p>
                    
                    <div className="detail-tags">
                        {medicine.tags && medicine.tags.split(',').map(tag => (
                            <span key={tag} className="tag">#{tag.trim()}</span>
                        ))}
                    </div>
                </div>

                {/* 🚨 2. 경고문구 (마약류 지정 성분 등 치명적인 정보) */}
                {medicine.warning && (
                    <div className="detail-warning-box">
                        <span className="warning-icon">🚨</span>
                        <p>{medicine.warning}</p>
                    </div>
                )}

                {/* 3. 상세 정보 섹션 */}
                <div className="detail-content">
                    <div className="info-section">
                        <h3>💡 약의 효능 및 특징</h3>
                        <p>{medicine.desc}</p>
                    </div>

                    {/* 구글 시트에 성분 데이터가 있을 때만 렌더링 */}
                    {medicine.ingredients && (
                        <div className="info-section">
                            <h3>💊 주요 성분</h3>
                            <p>{medicine.ingredients}</p>
                        </div>
                    )}

                    {/* 구글 시트에 용법 데이터가 있을 때만 렌더링 */}
                    {medicine.usage && (
                        <div className="info-section">
                            <h3>⏱️ 용법 및 용량</h3>
                            <p>{medicine.usage}</p>
                        </div>
                    )}

                    {/* 💡 기획자의 꿀팁 (눈에 확 띄게 파란색 박스로 처리) */}
                    {medicine.detailTip && (
                        <div className="info-section tip-section">
                            <h3>📌 기획자(약사)의 팁</h3>
                            <p>{medicine.detailTip}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MedicineDetail;