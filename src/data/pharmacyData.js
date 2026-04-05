// src/data/pharmacyData.js

export const pharmacyData = {
    child: [
        { 
            id: 'fever', icon: '🌡️', kr: '해열제', jp: '子供用の解熱剤はどこですか？', displayJp: '子供用の解熱剤をください。',
            subSymptoms: [
                { id: 'head', label: '두통', jp: '頭痛があります。' },
                { id: 'throat', label: '목 통증', jp: '喉の痛みがあります。' },
                { id: 'muscle', label: '근육통/몸살', jp: '筋肉痛・寒気があります。' }
            ]
        },
        { 
            id: 'cold', icon: '🤧', kr: '감기약', jp: '子供用の風邪薬をください。', displayJp: '子供用の風邪薬をください。',
            subSymptoms: [
                { id: 'throat', label: '목감기 (인후통)', jp: '喉の痛みがひどいです。' },
                { id: 'nose', label: '코감기 (콧물/코막힘)', jp: '鼻水・鼻づまりがあります。' },
                { id: 'cough', label: '기침 / 가래', jp: '咳・たんが出ます。' },
                { id: 'fever', label: '열 동반', jp: '熱もあります。' }
            ]
        },
        { 
            id: 'stomach', icon: '💩', kr: '배탈 / 정장제', displayJp: '子供用の整腸剤をください。',
            subSymptoms: [
                { id: 'diarrhea', label: '설사', jp: '下痢をしています。' },
                { id: 'vomit', label: '구토/메스꺼움', jp: '吐き気・嘔吐があります。' },
                { id: 'pain', label: '복통', jp: 'お腹が痛いです。' }
            ]
        },
        { 
            id: 'skin', icon: '🧴', kr: '피부 연고', displayJp: '湿疹やかゆみに効く塗り薬をください。',
            subSymptoms: [
                { id: 'itch', label: '가려움', jp: 'かゆみがひどいです。' },
                { id: 'red', label: '붉어짐/발진', jp: '赤く腫れています。' },
                { id: 'dry', label: '건조함', jp: 'カサカサに乾燥しています。' }
            ]
        },
        { 
            id: 'wound', icon: '🩹', kr: '상처 / 소독', displayJp: '子供用の絆創膏と消毒液はどこですか？',
            subSymptoms: [
                { id: 'cut', label: '베인 상처', jp: '切り傷です。' },
                { id: 'scrape', label: '까진 상처', jp: 'すり傷です。' },
                { id: 'burn', label: '화상', jp: 'やけどをしました。' }
            ]
        },
        { 
            id: 'bug', icon: '🦟', kr: '벌레 물린 데', displayJp: '虫刺されの塗り薬をください。',
            subSymptoms: [
                { id: 'mosquito', label: '모기', jp: '蚊に刺されました。' },
                { id: 'tick', label: '진드기/기타', jp: 'ダニや他の虫に刺されました。' },
                { id: 'swell', label: '크게 부음', jp: '大きく腫れています。' }
            ]
        }
    ],

    adult: [
        { 
            id: 'fever', icon: '🌡️', kr: '해열 / 진통제', jp: '解熱鎮痛剤はどこですか？', displayJp: '解熱鎮痛剤をください。',
            subSymptoms: [
                { id: 'head', label: '두통', jp: '頭痛がします。' },
                { id: 'period', label: '생리통', jp: '生理痛です。' },
                { id: 'tooth', label: '치통', jp: '歯が痛いです。' }
            ]
        },
        { 
            id: 'cold', icon: '🤧', kr: '감기약', jp: '風邪薬をください。', displayJp: '大人の風邪薬をください。',
            subSymptoms: [
                { id: 'throat', label: '목감기 (인후통)', jp: '喉の痛みがひどいです。' },
                { id: 'nose', label: '코감기 (콧물/코막힘)', jp: '鼻水・鼻づまりがあります。' },
                { id: 'cough', label: '기침 / 가래', jp: '咳・たんが出ます。' },
                { id: 'fever', label: '열 동반', jp: '熱もあります。' }
            ]
        },
        { 
            id: 'stomach', icon: '🤢', kr: '소화제 / 위장약', displayJp: '胃腸薬をください。',
            subSymptoms: [
                { id: 'indigestion', label: '소화불량/체함', jp: '胃もたれ・消化不良です。' },
                { id: 'heartburn', label: '속쓰림', jp: '胸やけがします。' },
                { id: 'pain', label: '위통', jp: '胃が痛いです。' }
            ]
        },
        { 
            id: 'pain', icon: '⚡', kr: '파스 / 근육통', displayJp: '湿布（筋肉痛・関節痛）はどこですか？',
            subSymptoms: [
                { id: 'shoulder', label: '어깨 결림', jp: '肩こりがひどいです。' },
                { id: 'back', label: '허리 통증', jp: '腰が痛いです。' },
                { id: 'joint', label: '관절통', jp: '関節が痛いです。' }
            ]
        },
        { 
            id: 'hangover', icon: '🍻', kr: '숙취 해소제', displayJp: '二日酔いに効く薬をください。',
            subSymptoms: [
                { id: 'nausea', label: '메스꺼움/구토', jp: '吐き気がします。' },
                { id: 'headache', label: '두통', jp: '頭痛がします。' },
                { id: 'fatigue', label: '피로감', jp: 'だるいです。' }
            ]
        },
        { 
            id: 'bug', icon: '🦟', kr: '벌레 / 피부약', displayJp: '虫刺されやかゆみ止めの薬をください。',
            subSymptoms: [
                { id: 'itch', label: '가려움', jp: 'かゆみがひどいです。' },
                { id: 'red', label: '붉어짐', jp: '赤く腫れています。' }
            ]
        }
    ]
};