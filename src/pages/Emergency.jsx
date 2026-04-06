// src/pages/Emergency.jsx
import { useNavigate } from "react-router-dom";
import './Emergency.css';

function Emergency() {
    const navigate = useNavigate();

    const emergencyPhrases = [
        { 
            kr: "구급차를 불러주세요!", 
            jp: "救急車を呼んでください！", 
            pron: "큐-큐-샤오 욘데 쿠다사이!" 
        },
        { 
            kr: "아이 목에 음식물이 걸렸어요.", 
            jp: "子供の喉に食べ物が詰まりました。", 
            pron: "코도모노 노도니 타베모노가 츠마리마시타." 
        },
        { 
            kr: "아이가 숨을 쉬지 않아요.", 
            jp: "子供が息をしていません。", 
            pron: "코도모가 이키오 시테이마센." 
        },
        { 
            kr: "경련을 일으키고 있어요.", 
            jp: "痙攣(けいれん)を起こしています。", 
            pron: "케-렌오 오코시테이마스." 
        },
        { 
            kr: "의식이 없어요.", 
            jp: "意識がありません。", 
            pron: "이시키가 아리마센." 
        }
    ];

    return (
        <div className="container emergency-wrapper">
            <div className="emergency-top">
                <button onClick={() => navigate("/")} className="emergency-back">
                    ⬅ 뒤로
                </button>
            </div>

            <h1 className="emergency-main-title">🚨 응급 상황</h1>
            <p className="emergency-desc">화면을 주변 일본인에게 보여주세요!</p>

            {/* 💡 새로 추가된 SOS 메시지 박스 */}
            <div className="sos-message-box">
                <p className="sos-jp">
                    日本を旅行中の韓国人です。<br/>
                    日本語は話せません。助けてください。
                </p>
                <p className="sos-kr">
                    (일본을 여행 중인 한국인입니다. 일본어는 말할 수 없습니다. 도와주세요.)
                </p>
            </div>

            <div className="emergency-list">
                {emergencyPhrases.map((phrase, index) => (
                    <div key={index} className="emergency-card">
                        <p className="emergency-jp">{phrase.jp}</p>
                        <p className="emergency-pron">🗣️ {phrase.pron}</p>
                        <p className="emergency-kr">{phrase.kr}</p>
                    </div>
                ))}
            </div>

            <a href="tel:119" className="call-btn">
                📞 일본 119 전화걸기
            </a>
        </div>
    );
}

export default Emergency;