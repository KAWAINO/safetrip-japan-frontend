export default function PregnantMedicalTable({ categorizedResults, currentAge }) {
    return (
        <>
            <div className="table-row">
                <div className="table-label">患者状態<br/>(환자 상태)</div>
                <div className="table-content highlight">
                    <span className="jp-main">{currentAge?.jp}</span>
                    <span className="kr-sub">({currentAge?.kr})</span>
                </div>
            </div>

            {categorizedResults.appearance.length > 0 && (
                <div className="table-row">
                    <div className="table-label">妊娠週数<br/>(임신 주차)</div>
                    <div className="table-content">
                        {categorizedResults.appearance.map((item, i) => (
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
        </>
    );
}