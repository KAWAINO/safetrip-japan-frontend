import React, { useState } from 'react';

function Footer() {
    // 💡 여기에 기획자님의 실제 이메일 주소를 입력하세요!
    const developerEmail = "contact.jptrip@gmail.com"; 
    
    const [showOptions, setShowOptions] = useState(false);

    const handleSendEmail = (type) => {
        const prefix = type === 'improve' ? '[개선]' : '[추가]';
        const subject = encodeURIComponent(`${prefix} 일본 여행 소통 앱 건의사항`);
        const body = encodeURIComponent(`어떤 기능을 ${type === 'improve' ? '개선' : '추가'}하고 싶으신가요?\n자유롭게 의견을 적어주세요!\n\n-----------------\n`);
        
        // 💡 유저의 기본 이메일 앱(메일, Gmail 등)을 자동으로 열어줍니다.
        window.location.href = `mailto:${developerEmail}?subject=${subject}&body=${body}`;
        setShowOptions(false); // 메일 앱 호출 후 버튼 닫기
    };

    return (
        <div style={{ padding: '24px 16px', marginTop: '40px', backgroundColor: '#F3F4F6', textAlign: 'center', fontSize: '12px', color: '#6B7280' }}>
            
            {/* 1. 개발자 문의 영역 */}
            <div style={{ marginBottom: '20px' }}>
                {!showOptions ? (
                    <button 
                        onClick={() => setShowOptions(true)}
                        style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#374151', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        💡 개발자에게 의견 보내기
                    </button>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>어떤 의견이신가요?</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => handleSendEmail('improve')}
                                style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#3B82F6', color: 'white', cursor: 'pointer' }}
                            >
                                🛠 기존 기능 개선
                            </button>
                            <button 
                                onClick={() => handleSendEmail('add')}
                                style={{ padding: '8px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#10B981', color: 'white', cursor: 'pointer' }}
                            >
                                ✨ 새로운 기능 추가
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowOptions(false)}
                            style={{ padding: '4px 8px', marginTop: '4px', border: 'none', backgroundColor: 'transparent', color: '#9CA3AF', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                            닫기
                        </button>
                    </div>
                )}
            </div>

            {/* 2. 법적 면책 조항 및 개인정보 미수집 고지 */}
            <p style={{ margin: '0 0 8px 0', lineHeight: '1.5' }}>
                <b>[법적 고지 및 개인정보 안내]</b><br/>
                본 서비스는 일본어 소통을 돕는 번역 보조 도구이며, 전문적인 의학적 진단 및 처방을 대신할 수 없습니다. 위급 상황 시 반드시 119 또는 현지 의료진의 지시를 따르시기 바랍니다.
            </p>
            <p style={{ margin: 0, lineHeight: '1.5' }}>
                본 앱은 사용자의 위치 정보(GPS) 및 건강 관련 데이터를 <b>서버에 수집하거나 저장하지 않으며</b>, 브라우저 종료 시 모든 정보는 파기됩니다.
            </p>
            
            <p style={{ marginTop: '16px', fontWeight: 'bold', color: '#9CA3AF' }}>
                © {new Date().getFullYear()}. 일본 여행 소통 도우미. All rights reserved.
            </p>
        </div>
    );
}

export default Footer;