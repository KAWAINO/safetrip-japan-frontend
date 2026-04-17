// src/components/CouponModal.jsx
import React, { useState } from 'react';
import './CouponModal.css';
import { couponData } from '../data/couponData'; 

function CouponModal({ isOpen, onClose }) {
    const [selectedBrand, setSelectedBrand] = useState(null);
    // 💡 활성화된 탭 상태 관리 (기본값은 드럭스토어)
    const [activeTab, setActiveTab] = useState('drug'); 

    if (!isOpen) return null;

    // 💡 현재 선택된 탭(카테고리)에 해당하는 쿠폰만 필터링합니다.
    const filteredCoupons = couponData.filter(coupon => 
        coupon.categories.includes(activeTab)
    );

    const handleClose = () => {
        setSelectedBrand(null);
        setActiveTab('drug'); // 닫을 때 탭 초기화
        onClose();
    };

    return (
        <div className="coupon-modal-overlay" onClick={handleClose}>
            <div className="coupon-modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* 1. 쿠폰 목록 화면 */}
                {!selectedBrand ? (
                    <>
                        <div className="coupon-list-header">
                            <h2>일본 쇼핑 할인 쿠폰팩 🎁</h2>
                            <p>원하는 카테고리를 선택해 주세요.</p>
                            
                            {/* 💡 카테고리 탭 영역 추가 */}
                            <div className="coupon-tabs">
                                <button 
                                    className={`tab-btn ${activeTab === 'drug' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('drug')}
                                >💊 드럭스토어</button>
                                <button 
                                    className={`tab-btn ${activeTab === 'electronics' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('electronics')}
                                >💻 가전/잡화</button>
                                <button 
                                    className={`tab-btn ${activeTab === 'department' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('department')}
                                >🛍️ 백화점/아울렛</button>
                            </div>
                        </div>

                        {/* 💡 여기에 CS 방어용 안내 문구 박스를 추가합니다! */}
                        <div className="coupon-notice-box">
                            <div className="notice-title">🚨 쿠폰 이용 전 필독 안내</div>
                            <ul className="notice-list">
                                <li>발급 전 연결된 페이지(패키지 옵션 → 패키지 정보)에서 정확한 사용처 및 유의사항을 반드시 확인해 주세요.</li>
                                <li>대형 브랜드 쿠폰은 특정 지역이 표기되어 있어도 일본 전국 매장에서 사용 가능합니다.</li>
                            </ul>
                        </div>

                        <div className="coupon-list-body">
                            {/* 필터링된 쿠폰이 있을 때만 리스트를 그려줍니다 */}
                            {filteredCoupons.length > 0 ? (
                                filteredCoupons.map(brand => (
                                    <button key={brand.id} className="brand-select-btn" onClick={() => setSelectedBrand(brand)}>
                                        <div className="brand-info">
                                            <div className="brand-title-row">
                                                <h3>{brand.name}</h3>
                                                {/* 💡 region 데이터가 있으면 예쁜 뱃지를 그려줍니다 */}
                                                {brand.region && <span className="region-badge">{brand.region}</span>}
                                            </div>
                                            <p>{brand.discount}</p>
                                        </div>
                                        <span>👉</span>
                                    </button>
                                ))
                            ) : (
                                /* 데이터가 없는 탭을 눌렀을 때의 빈 화면 처리 */
                                <div className="empty-coupon-message">
                                    해당 카테고리의 쿠폰을 열심히 준비 중입니다! 🙇‍♂️
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                /* 2. 개별 쿠폰 상세 화면 (이전 코드와 동일하되 지역 정보만 윗부분에 추가) */
                    <>
                        <div className="coupon-detail-header">
                            <button className="back-btn" onClick={() => setSelectedBrand(null)}>⬅ 목록으로</button>
                            
                            <div className="detail-title-wrapper">
                                <h2>{selectedBrand.name}</h2>
                                {selectedBrand.region && <span className="region-badge">{selectedBrand.region}</span>}
                            </div>
                            
                            <p className="highlight-discount">{selectedBrand.discount}</p>
                        </div>
                        
                        {/* <div className="coupon-detail-body">
                            <div className="link-container">
                                <p className="instruction">아래 버튼을 눌러 모바일 쿠폰을 발급받으세요.</p>
                                <a 
                                    href={selectedBrand.linkUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="open-link-btn"
                                >
                                    🔗 할인 쿠폰 페이지 열기
                                </a>
                            </div>

                            <div className="conditions-box">
                                <h4>유의사항</h4>
                                <ul>
                                    {selectedBrand.conditions.map((cond, idx) => (
                                        <li key={idx}>{cond}</li>
                                    ))}
                                </ul>
                            </div>
                        </div> */}
                        <div className="coupon-detail-body">
                            {/* 1. 쿠폰 바코드 이미지 영역 (UX 최우선) */}
                            <div className="barcode-container">
                                <p className="instruction">계산 시 점원에게 아래 화면을 보여주세요 📱</p>
                                {selectedBrand.type === 'image' && selectedBrand.imageUrl ? (
                                    <img 
                                        src={selectedBrand.imageUrl} 
                                        alt={`${selectedBrand.name} 쿠폰 바코드`} 
                                        className="real-barcode-img" 
                                    />
                                ) : (
                                    /* 링크 방식이 남아있을 경우를 대비한 폴백(Fallback) */
                                    <a href={selectedBrand.linkUrl} target="_blank" rel="noopener noreferrer" className="open-link-btn">
                                        🔗 할인 쿠폰 페이지 열기
                                    </a>
                                )}
                            </div>

                            {/* 💡 2. 수익화 전용 배너 영역 (여기가 돈이 나오는 곳입니다!) */}
                            <div className="sponsor-banner-container">
                                <p className="sponsor-title">🛫 일본 여행 필수품 준비하셨나요?</p>
                                <a 
                                    href="https://affiliate.klook.com/기획자님_eSIM_제휴링크" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="sponsor-link-btn esim-btn"
                                >
                                    데이터 빵빵한 일본 eSIM 10% 할인받기 📶
                                </a>
                                <a 
                                    href="https://기획자님_우버_제휴링크" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="sponsor-link-btn uber-btn"
                                >
                                    일본 우버(Uber) 택시 첫 탑승 무료 쿠폰 🚕
                                </a>
                            </div>

                            {/* 3. 기존 유의사항 영역 */}
                            <div className="conditions-box">
                                <h4>유의사항</h4>
                                <ul>
                                    {selectedBrand.conditions.map((cond, idx) => (
                                        <li key={idx}>{cond}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}

                <button className="coupon-close-btn" onClick={handleClose}>닫기</button>
            </div>
        </div>
    );
}

export default CouponModal;