// src/data/medicines.js
export const medicines = [
    {
        id: 1,
        category: "감기 (종합)",
        krName: "호빵맨 감기 시럽 (딸기맛)",
        jpName: "アンパンマン かぜシロップ",
        type: "제2류 의약품",
        desc: "3개월 이상 ~ 7세 미만 복용 가능. 기침, 콧물, 발열 등 종합 감기 증상 완화.",
        imgColor: "#FCA5A5", // 나중에 실제 이미지 경로로 교체할 수 있음
        emoji: "🍓"
    },
    {
        id: 2,
        category: "해열·진통",
        krName: "어린이 버퍼린 시럽",
        jpName: "キッズバファリン シロップ",
        type: "제2류 의약품",
        desc: "3개월 이상 ~ 7세 미만 복용 가능. 갑작스러운 발열이나 통증 완화에 사용 (이부프로펜/아세트아미노펜 확인 필요).",
        imgColor: "#FDBA74",
        emoji: "🤒"
    },
    {
        id: 3,
        category: "벌레 물림·발진",
        krName: "무히 베이비 (연고/크림)",
        jpName: "ムヒベビー",
        type: "제3류 의약품",
        desc: "생후 1개월부터 사용 가능. 스테로이드 성분이 없어 가벼운 발진, 땀띠, 기저귀 발진, 벌레 물린 곳에 순하게 사용.",
        imgColor: "#86EFAC",
        emoji: "🦟"
    },
    {
        id: 4,
        category: "소화·정장제",
        krName: "신 비오페르민 S 세립 (가루형)",
        jpName: "新ビオフェルミンS 細粒",
        type: "의약부외품",
        desc: "생후 3개월부터 복용 가능. 유산균 배합으로 배탈, 변비, 묽은 변 등 장 환경을 개선해 줌.",
        imgColor: "#FCD34D",
        emoji: "💊"
    }
];