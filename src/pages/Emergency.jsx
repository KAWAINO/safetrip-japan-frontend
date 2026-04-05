import { useNavigate } from "react-router-dom";
import './Emergency.css'; // 💡 추가됨

function Emergency() {
    const navigate = useNavigate();

    const emergencyPhrases = [
        { kr: "구급차를 불러주세요!", jp: "救急車を呼んでください！" },
        { kr: "아이가 숨을 쉬지 않아요", jp: "子供が息をしていません。" },
        { kr: "경련을 일으키고 있어요", jp: "痙攣(けいれん)を起こしています。" },
        { kr: "의식이 없어요", jp: "意識がありません。" }
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

            <div className="emergency-list">
                {emergencyPhrases.map((phrase, index) => (
                    <div key={index} className="emergency-card">
                        <p className="emergency-jp">{phrase.jp}</p>
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