export default function AdultMedicalTable({ categorizedResults, currentAge }) {
    return (
        <>
            <div className="table-row">
                <div className="table-label">患者<br/>(환자 구분)</div>
                <div className="table-content highlight">
                    <span className="jp-main">{currentAge?.jp}</span>
                    <span className="kr-sub">({currentAge?.kr})</span>
                </div>
            </div>

            {categorizedResults.department.length > 0 && (
                <div className="table-row">
                    <div className="table-label">希望診療科<br/>(진료과)</div>
                    <div className="table-content">
                        {categorizedResults.department.map((item, i) => (
                            <div key={i}>
                                <span className="jp-text">{item.jp}</span><br/>
                                <span className="kr-text">({item.kr})</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {categorizedResults.onsetTime.length > 0 && (
                <div className="table-row">
                    <div className="table-label">発症時期<br/>(증상 시작)</div>
                    <div className="table-content">
                        {categorizedResults.onsetTime.map((item, i) => (
                            <div key={i}>
                                <span className="jp-text">{item.jp}</span><br/>
                                <span className="kr-text">({item.kr})</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="table-row">
                <div className="table-label">主な症状<br/>(주요 증상)</div>
                <div className="table-content">
                    {categorizedResults.main.length === 0 ? (
                        <p className="empty-text">선택된 증상이 없습니다.</p>
                    ) : (
                        <ul className="medical-result-list">
                            {categorizedResults.main.map((item, i) => (
                                <li key={i} className="medical-item">
                                    <span className="jp-text">・ {item.jp}</span>
                                    <span className="kr-text">({item.kr})</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {categorizedResults.allergy.length > 0 && (
                <div className="table-row">
                    <div className="table-label">アレルギー<br/>(알레르기)</div>
                    <div className="table-content">
                        <ul className="medical-result-list">
                            {categorizedResults.allergy.map((item, i) => (
                                <li key={i} className="medical-item">
                                    <span className="jp-text">・ {item.jp}</span>
                                    <span className="kr-text">({item.kr})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}