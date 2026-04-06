// src/data/pharmacyData.js

export const pharmacyData = {
    child: [
        { 
            id: 'fever', icon: '🌡️', kr: '해열제', jp: '子供用の解熱剤はどこですか？', displayJp: '子供用の解熱剤をください。',
            subSymptoms: [
                { id: 'low_fever', label: '미열이 조금 나요', jp: '熱が少しあります。' },
                { id: 'high_fever', label: '열이 많이 나요', jp: '熱が高いです。' },
                { id: 'crying', label: '아파서 보채고 울어요', jp: 'どこか痛いようで、ぐずって泣いています。' }
            ]
        },
        { 
            id: 'cold', icon: '🤧', kr: '감기약', jp: '子供用の風邪薬をください。', displayJp: '子供用の風邪薬をください。',
            subSymptoms: [
                { id: 'nose', label: '콧물이 나요', jp: '鼻水・鼻づまりがあります。' },
                { id: 'cough', label: '기침을 해요', jp: '咳が出ます。' },
                { id: 'phlegm', label: '가래 끓는 소리가 나요', jp: 'たんが絡むような音がします。' },
                { id: 'chill', label: '추워해요 (오한)', jp: '寒がっています。' },
                { id: 'fever', label: '열이 같이 나요', jp: '熱も一緒に出ています。' }
            ]
        },
        { 
            id: 'stomach', icon: '💩', kr: '배탈 / 정장제', displayJp: '子供用の整腸剤をください。',
            subSymptoms: [
                { id: 'diarrhea', label: '설사를 해요', jp: '下痢をしています。' },
                { id: 'vomit', label: '토를 했어요', jp: '嘔吐しました（吐きました）。' },
                { id: 'pain', label: '배를 아파해요', jp: 'お腹を痛がっています。' }
            ]
        },
        { 
            id: 'skin', icon: '🧴', kr: '피부 연고', displayJp: '湿疹やかゆみに効く塗り薬をください。',
            subSymptoms: [
                { id: 'itch', label: '가려운지 계속 긁어요', jp: 'かゆいようで、ずっと掻いています。' },
                { id: 'red', label: '피부가 붉어졌어요 (발진)', jp: '皮膚が赤くなっています（発疹）。' },
                { id: 'dry', label: '피부가 건조해서 터요', jp: '肌が乾燥してカサカサです。' }
            ]
        },
        { 
            id: 'wound', icon: '🩹', kr: '상처 / 소독', displayJp: '子供用の絆創膏と消毒液はどこですか？',
            subSymptoms: [
                { id: 'cut', label: '어딘가 베였어요', jp: 'どこかで切ってしまいました。' },
                { id: 'scrape', label: '넘어져서 까졌어요', jp: '転んで擦りむきました。' },
                { id: 'burn', label: '데였어요 (화상)', jp: 'やけどをしました。' }
            ]
        },
        { 
            id: 'bug', icon: '🦟', kr: '벌레 물린 데', displayJp: '虫刺されの塗り薬をください。',
            subSymptoms: [
                { id: 'mosquito', label: '모기에 물렸어요', jp: '蚊に刺されました。' },
                { id: 'tick', label: '벌레/진드기에 물렸어요', jp: '虫（またはダニ）に刺されました。' },
                { id: 'swell', label: '물린 곳이 많이 부었어요', jp: '刺されたところが大きく腫れています。' }
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
                { id: 'fever', label: '열 동반', jp: '熱もあります。' },
                // 💡 [추가 완료] 몸살 기운
                { id: 'chill', label: '오한 / 몸살', jp: '寒気や体の痛みがあります。' }
            ]
        },
        { 
            id: 'stomach', icon: '🤢', kr: '소화제 / 위장약', displayJp: '胃腸薬をください。',
            subSymptoms: [
                { id: 'indigestion', label: '소화불량/체함', jp: '胃もたれ・消化不良です。' },
                { id: 'heartburn', label: '속쓰림', jp: '胸やけがします。' },
                { id: 'pain', label: '위통', jp: '胃が痛いです。' },
                // 💡 [추가 완료] 가스 참
                { id: 'gas', label: '가스 참 / 팽만감', jp: 'お腹にガスが溜まっています。' }
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