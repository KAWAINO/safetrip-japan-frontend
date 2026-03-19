function AgeCard({ age, onSelect }) {
    return (
        <div
            className="age-card"
            onClick={() => onSelect(age.id)}
        >
            <div className="age-icon">
                {age.icon}
            </div>

            <div className="age-text">
                <div className="age-label">
                    {age.label}
                </div>

                <div className="age-desc">
                    ({age.description})
                </div>
            </div>
        </div>
    );
}

export default AgeCard;