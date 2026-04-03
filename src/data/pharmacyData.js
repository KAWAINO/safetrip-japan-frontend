// src/data/pharmacyData.js

export const pharmacyData = {
    // 👶 소아용 데이터 (기존과 동일)
    child: [
        { id: 'fever', icon: '🌡️', kr: '해열제', jp: '子供用の解熱剤はどこですか？', displayJp: '子供用の解熱剤をください。', desc: '어린이용 해열제' },
        { 
            id: 'cold', icon: '🤧', kr: '감기약', jp: '子供用の風邪薬をください。', displayJp: '子供用の風邪薬をください。', desc: '어린이용 감기약',
            subSymptoms: [
                { id: 'total', label: '종합 감기', jp: '総合風邪薬をください。' },
                { id: 'throat', label: '목감기 (인후통)', jp: '喉の痛みに効く風邪薬をください。' },
                { id: 'nose', label: '코감기 (콧물/코막힘)', jp: '鼻水・鼻づまりに効く風邪薬をください。' },
                { id: 'cough', label: '기침 / 가래', jp: '咳・たんに効く風邪薬をください。' },
                { id: 'head', label: '두통 동반', jp: '頭痛を伴う風邪に効く薬をください。' },
                { id: 'chill', label: '오한 / 몸살', jp: '寒気や筋肉痛に効く風邪薬をください。' }
            ]
        },
        { id: 'stomach', icon: '💩', kr: '배탈 / 정장제', displayJp: '子供用の整腸剤（下痢止め）をください。', desc: '설사약 / 정장제' },
        { id: 'skin', icon: '🧴', kr: '피부 연고', displayJp: '湿疹やかゆみに効く塗り薬をください。', desc: '가려움 / 습진 연고' },
        { id: 'wound', icon: '🩹', kr: '상처 / 소독', displayJp: '子供用の絆創膏と消毒液はどこですか？', desc: '밴드 / 소독약' },
        { id: 'bug', icon: '🦟', kr: '벌레 물린 데', displayJp: '虫刺されの塗り薬をください。', desc: '벌레 연고' }
    ],

    // 👩 성인용 데이터 (어른들에게 자주 필요한 약 위주로 개편)
    adult: [
        { id: 'fever', icon: '🌡️', kr: '해열 / 진통제', jp: '解熱鎮痛剤はどこですか？', displayJp: '解熱鎮痛剤（痛み止め）をください。', desc: '두통/생리통/해열' },
        { 
            id: 'cold', icon: '🤧', kr: '감기약', jp: '風邪薬をください。', displayJp: '大人の風邪薬をください。', desc: '성인용 감기약',
            subSymptoms: [
                { id: 'total', label: '종합 감기', jp: '総合風邪薬をください。' },
                { id: 'throat', label: '목감기 (인후통)', jp: '喉の痛みに効く風邪薬をください。' },
                { id: 'nose', label: '코감기 (콧물/코막힘)', jp: '鼻水・鼻づまりに効く風邪薬をください。' },
                { id: 'cough', label: '기침 / 가래', jp: '咳・たんに効く風邪薬をください。' },
                { id: 'head', label: '두통 동반', jp: '頭痛を伴う風邪に効く薬をください。' },
                { id: 'chill', label: '오한 / 몸살', jp: '寒気や筋肉痛に効く風邪薬をください。' }
            ]
        },
        { id: 'stomach', icon: '🤢', kr: '소화제 / 위장약', displayJp: '胃腸薬（消化不良・胃もたれ）をください。', desc: '소화불량/체함/속쓰림' },
        { id: 'pain', icon: '⚡', kr: '파스 / 근육통', displayJp: '湿布（筋肉痛・関節痛）はどこですか？', desc: '동전파스/일반파스' },
        { id: 'hangover', icon: '🍻', kr: '숙취 해소제', displayJp: '二日酔いに効く薬（またはドリンク）をください。', desc: '숙취/간 피로 회복' },
        { id: 'bug', icon: '🦟', kr: '벌레 / 피부약', displayJp: '虫刺されやかゆみ止めの薬をください。', desc: '벌레물림/가려움' }
    ]
};