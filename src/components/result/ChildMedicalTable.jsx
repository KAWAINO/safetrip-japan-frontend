export default function ChildMedicalTable({ categorizedResults, currentAge }) {
    return (
        <>
            <div className="table-row">
                <div className="table-label">患者年齢<br/>(환자 연령)</div>
                <div className="table-content highlight">
                    <span className="jp-main">{currentAge?.jp}</span>
                    <span className="kr-sub">({currentAge?.kr})</span>
                </div>
            </div>

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

            {categorizedResults.appearance.length > 0 && (
                <div className="table-row">
                    <div className="table-label">患者状態<br/>(환자 상태)</div>
                    <div className="table-content">
                        <ul className="medical-result-list">
                            {categorizedResults.appearance.map((item, i) => (
                                <li key={i} className="medical-item">
                                    <span className="jp-text">・ {item.jp}</span>
                                    <span className="kr-text">({item.kr})</span>
                                </li>
                            ))}
                        </ul>
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

            {categorizedResults.excretory.length > 0 && (
                <div className="table-row">
                    <div className="table-label">排泄状態<br/>(소변/대변)</div>
                    <div className="table-content">
                        <ul className="medical-result-list">
                            {categorizedResults.excretory.map((item, i) => (
                                <li key={i} className="medical-item">
                                    <span className="jp-text">・ {item.jp}</span>
                                    <span className="kr-text">({item.kr})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {categorizedResults.medication.length > 0 && (
                <div className="table-row">
                    <div className="table-label">服用中の薬<br/>(복용중인 약)</div>
                    <div className="table-content">
                        <ul className="medical-result-list">
                            {categorizedResults.medication.map((item, i) => (
                                <li key={i} className="medical-item">
                                    <span className="jp-text">・ {item.jp}</span>
                                    <span className="kr-text">({item.kr})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

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

            {categorizedResults.pastIllness.length > 0 && (
                <div className="table-row">
                    <div className="table-label">既往歴<br/>(병력)</div>
                    <div className="table-content">
                        <ul className="medical-result-list">
                            {categorizedResults.pastIllness.map((item, i) => (
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