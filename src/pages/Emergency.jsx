import { useNavigate } from "react-router-dom";

function Emergency() {
    const navigate = useNavigate();

    // 초응급 상황을 위한 하드코딩된 일본어 문구
    const emergencyPhrases = [
        { kr: "구급차를 불러주세요!", jp: "救急車を呼んでください！" },
        { kr: "아이가 숨을 쉬지 않아요", jp: "子供が息をしていません。" },
        { kr: "경련을 일으키고 있어요", jp: "痙攣(けいれん)を起こしています。" },
        { kr: "의식이 없어요", jp: "意識がありません。" }
    ];

    return (
        <div className="container" style={{ backgroundColor: "#FEF2F2", minHeight: "100vh", paddingBottom: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", color: "#991B1B", fontSize: "16px", fontWeight: "bold" }}>
                    ⬅ 뒤로
                </button>
            </div>

            <h1 style={{ color: "#991B1B", fontSize: "28px", fontWeight: "800", marginBottom: "10px" }}>
                🚨 응급 상황
            </h1>
            <p style={{ color: "#DC2626", fontSize: "16px", fontWeight: "600", marginBottom: "30px" }}>
                화면을 주변 일본인에게 보여주세요!
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
                {emergencyPhrases.map((phrase, index) => (
                    <div key={index} style={{ backgroundColor: "white", padding: "20px", borderRadius: "16px", border: "2px solid #FECACA", boxShadow: "0 4px 12px rgba(220, 38, 38, 0.1)" }}>
                        <p style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "800", color: "#111827", wordBreak: "keep-all" }}>
                            {phrase.jp}
                        </p>
                        <p style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#EF4444" }}>
                            {phrase.kr}
                        </p>
                    </div>
                ))}
            </div>

            {/* 119 통화 버튼 */}
            <a 
                href="tel:119" 
                style={{
                    display: "block",
                    width: "100%",
                    backgroundColor: "#DC2626",
                    color: "white",
                    textAlign: "center",
                    padding: "20px",
                    borderRadius: "16px",
                    fontSize: "20px",
                    fontWeight: "800",
                    textDecoration: "none",
                    boxShadow: "0 6px 16px rgba(220, 38, 38, 0.3)",
                    boxSizing: "border-box"
                }}
            >
                📞 일본 119 전화걸기
            </a>
        </div>
    );
}

export default Emergency;