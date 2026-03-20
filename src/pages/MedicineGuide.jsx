// src/pages/MedicineGuide.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { medicines } from "../data/medicines";
import './MedicineGuide.css'; // 전용 CSS

function MedicineGuide() {
    const navigate = useNavigate();

    return (
        <>
            <Header onBack={() => navigate(-1)} />
            
            <div className="container" style={{ paddingBottom: '40px' }}>
                <h2 className="title">어린이 상비약 도감</h2>
                
                {/* 면책 조항 (매우 중요) */}
                <div className="disclaimer-box" style={{ marginBottom: '24px' }}>
                    <span className="alert-icon">⚠️</span>
                    <p>
                        본 도감은 일본에서 널리 쓰이는 일반의약품(OTC) 정보입니다. <b>반드시 구매 전 매장 직원이나 등록판매자에게 아이의 개월 수와 알레르기 여부를 확인</b> 후 구매하세요. (이 화면을 직원에게 보여주세요.)
                    </p>
                </div>

                <div className="medicine-list">
                    {medicines.map((med) => (
                        <div key={med.id} className="medicine-card">
                            {/* 약 이미지 대체 영역 (나중에 실제 img 태그로 교체) */}
                            <div className="medicine-img-placeholder" style={{ backgroundColor: med.imgColor }}>
                                <span className="medicine-emoji">{med.emoji}</span>
                            </div>
                            
                            <div className="medicine-info">
                                <span className="medicine-category">{med.category} · {med.type}</span>
                                
                                {/* 한국어 이름 */}
                                <h3 className="medicine-kr-name">{med.krName}</h3>
                                
                                {/* 일본어 이름 (점원에게 보여주는 용도라 가장 크고 굵게) */}
                                <p className="medicine-jp-name">{med.jpName}</p>
                                
                                <p className="medicine-desc">{med.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default MedicineGuide;