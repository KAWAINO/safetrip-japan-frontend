import React, { useState } from 'react';
import './Footer.css'; // CSS 연결

function Footer() {
    const developerEmail = "contact.jptrip@gmail.com"; 
    const [showOptions, setShowOptions] = useState(false);

    const handleSendEmail = (type) => {
        const prefix = type === 'improve' ? '[개선]' : '[추가]';
        const subject = encodeURIComponent(`${prefix} 일본 여행 소통 앱 건의사항`);
        const body = encodeURIComponent(`어떤 기능을 ${type === 'improve' ? '개선' : '추가'}하고 싶으신가요?\n자유롭게 의견을 적어주세요!\n\n-----------------\n`);
        window.location.href = `mailto:${developerEmail}?subject=${subject}&body=${body}`;
        setShowOptions(false);
    };

    return (
        <footer className="footer-container">
            {/* 💡 [SEO 100% 전략] 로봇을 위한 숨겨진 키워드 영역 */}
            <div className="seo-hidden-keywords">
                #일본 여행 #일본 병원 #일본 약국 #일본 소아과 #일본여행중 아플때 #소아과 번역 #산부인과 번역 #일본 드럭 #일본 드럭스토어 #증상 번역기 #일본어 진료 보조 #일본여행 상비약 #일본 응급실 #도쿄 병원 #오사카 병원 #후쿠오카 병원 #삿포로 병원
            </div>

            <div className="footer-content">
                {/* 1. 개발자 문의 영역 */}
                <div className="contact-area">
                    {!showOptions ? (
                        <button className="contact-main-btn" onClick={() => setShowOptions(true)}>
                            💡 개발자에게 의견 보내기
                        </button>
                    ) : (
                        <div className="contact-options">
                            <p className="option-title">어떤 의견이신가요?</p>
                            <div className="option-btns">
                                <button className="btn-improve" onClick={() => handleSendEmail('improve')}>🛠 기존 기능 개선</button>
                                <button className="btn-add" onClick={() => handleSendEmail('add')}>✨ 새로운 기능 추가</button>
                            </div>
                            <button className="btn-close" onClick={() => setShowOptions(false)}>닫기</button>
                        </div>
                    )}
                </div>

                {/* 2. 법적 면책 조항 및 안내 */}
                <div className="legal-notice">
                    <p>
                        <b>[법적 고지 및 개인정보 안내]</b><br/>
                        본 서비스는 일본어 소통을 돕는 번역 보조 도구이며, 전문적인 의학적 진단 및 처방을 대신할 수 없습니다. 위급 상황 시 반드시 119 또는 현지 의료진의 지시를 따르시기 바랍니다.
                    </p>
                    <p>
                        본 앱은 사용자의 위치 정보(GPS) 및 건강 관련 데이터를 <b>서버에 수집하거나 저장하지 않으며</b>, 브라우저 종료 시 모든 정보는 파기됩니다.
                    </p>
                </div>
                
                <p className="copyright">
                    © {new Date().getFullYear()}. 일본 여행 중 아플 때. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;