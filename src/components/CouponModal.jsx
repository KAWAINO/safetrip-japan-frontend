// src/components/CouponModal.jsx
import React, { useState } from 'react';
import './CouponModal.css';

function CouponModal({ isOpen, onClose }) {
    // 어떤 브랜드의 쿠폰을 볼지 선택하는 상태 (초기값은 목록을 보여주기 위해 null)
    const [selectedBrand, setSelectedBrand] = useState(null);

    if (!isOpen) return null;

    // 💡 나중에 진짜 바코드 이미지 경로를 구하시면 imageUrl에 넣으시면 됩니다!
    const couponData = [
        {
            id: 'matsukiyo',
            name: '마츠모토키요시',
            discount: '면세 10% + 최대 7% 추가 할인',
            type: 'link',
            imageUrl: 'https://www.japanreadygo.com/drugstore/matsukiyo', // 예: '/images/matsukiyo-coupon.png'
            conditions: ['1만 엔 이상 구매 시 3% 추가 할인', '3만 엔 이상 구매 시 5% 추가 할인', '5만 엔 이상 구매 시 7% 추가 할인', '결제 전 점원에게 바코드 제시']
        },
        {
            id: 'sundrug',
            name: '선드럭 (SUNDRUG)',
            discount: '면세 10% + 최대 7% 추가 할인',
            type: 'link',
            imageUrl: 'https://www.japanreadygo.com/drugstore/sundrug', 
            conditions: ['1만 엔 이상 구매 시 3% 추가 할인', '3만 엔 이상 구매 시 5% 추가 할인', '5만 엔 이상 구매 시 7% 추가 할인', '화장품 등 일부 품목 제외']
        },
        {
            id: 'donki',
            name: '돈키호테',
            discount: '면세 10% + 5% 추가 할인',
            type: 'link', // 돈키호테는 보통 전용 웹링크를 씁니다
            linkUrl: 'https://japanportal.donki-global.com/coupon/cp001_ko.html', // 임시 공용 링크
            conditions: ['세금 불포함 1만 엔 이상 구매 시 적용', '아래 버튼을 눌러 전용 쿠폰 페이지를 점원에게 제시', '술, 담배 등 일부 품목 제외']
        }
    ];

    // 가짜 바코드 생성 함수 (이미지 넣기 전 임시용)
    const renderFakeBarcode = () => (
        <div className="fake-barcode-box">
            <div className="fake-lines">
                {Array(25).fill(0).map((_, i) => (
                    <div key={i} style={{ width: `${Math.floor(Math.random() * 4) + 1}px`, height: '50px', backgroundColor: '#111827', marginRight: '2px' }} />
                ))}
            </div>
            <p>바코드 이미지 준비 중</p>
        </div>
    );

    const handleClose = () => {
        setSelectedBrand(null); // 닫을 때 목록으로 초기화
        onClose();
    };

    return (
        <div className="coupon-modal-overlay" onClick={handleClose}>
            <div className="coupon-modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* 1. 쿠폰 목록 화면 */}
                {!selectedBrand ? (
                    <>
                        <div className="coupon-list-header">
                            <h2>일본 쇼핑 할인 쿠폰북 🏷️</h2>
                            <p>원하는 브랜드를 선택해 주세요.</p>
                        </div>
                        <div className="coupon-list-body">
                            {couponData.map(brand => (
                                <button key={brand.id} className="brand-select-btn" onClick={() => setSelectedBrand(brand)}>
                                    <div className="brand-info">
                                        <h3>{brand.name}</h3>
                                        <p>{brand.discount}</p>
                                    </div>
                                    <span>👉</span>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                /* 2. 개별 쿠폰 상세 화면 */
                    <>
                        <div className="coupon-detail-header">
                            <button className="back-btn" onClick={() => setSelectedBrand(null)}>⬅ 목록으로</button>
                            <h2>{selectedBrand.name}</h2>
                            <p className="highlight-discount">{selectedBrand.discount}</p>
                        </div>
                        
                        <div className="coupon-detail-body">
                            {selectedBrand.type === 'barcode' ? (
                                <div className="barcode-container">
                                    <p className="instruction">계산 시 점원에게 아래 화면을 보여주세요.</p>
                                    {selectedBrand.imageUrl ? (
                                        <img src={selectedBrand.imageUrl} alt={`${selectedBrand.name} 바코드`} className="real-barcode-img" />
                                    ) : (
                                        renderFakeBarcode()
                                    )}
                                </div>
                            ) : (
                                <div className="link-container">
                                    <p className="instruction">돈키호테는 전용 웹페이지에서 발급됩니다.</p>
                                    <button className="open-link-btn" onClick={() => window.open(selectedBrand.linkUrl, '_blank')}>
                                        🔗 할인 쿠폰 페이지 열기
                                    </button>
                                </div>
                            )}

                            <div className="conditions-box">
                                <h4>유의사항</h4>
                                <ul>
                                    {selectedBrand.conditions.map((cond, idx) => (
                                        <li key={idx}>• {cond}</li>
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