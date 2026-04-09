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
            id: 'fever', icon: '💊', kr: '해열 / 진통제', jp: '解熱鎮痛剤(げねつじんつうざい)はどこですか？', displayJp: '解熱鎮痛剤をください。',
            subSymptoms: [
                { id: 'head', label: '머리가 아파요', jp: '頭痛があります。' },
                { id: 'throat', label: '목이 아파요', jp: '喉の痛みがあります。' },
                { id: 'tooth', label: '치통/생리통', jp: '歯痛・生理痛です。' }
            ]
        },
        { 
            id: 'cold', icon: '🤧', kr: '감기약', jp: '風邪薬(かぜぐすり)はどこですか？', displayJp: '風邪薬をください。',
            subSymptoms: [
                { id: 'throat', label: '목감기 (인후통)', jp: '喉の痛みがひどいです。' },
                { id: 'nose', label: '코감기 (콧물/코막힘)', jp: '鼻水・鼻づまりがあります。' },
                { id: 'cough', label: '기침 / 가래', jp: '咳・たんが出ます。' },
                { id: 'fever', label: '열 동반', jp: '熱もあります。' }
            ]
        },
        // 💡 새로 추가된 비염 카테고리!
        { 
            id: 'nose', icon: '👃', kr: '비염 / 알레르기', jp: '鼻炎薬(びえんやく)はどこですか？', displayJp: '鼻炎・アレルギーの薬をください。',
            subSymptoms: [
                { id: 'stuffy', label: '코막힘', jp: '鼻がひどく詰まっています。' },
                { id: 'runny', label: '콧물', jp: '水っぽい鼻水が止まりません。' },
                { id: 'sneeze', label: '재채기', jp: 'くしゃみがひどいです。' }
            ]
        },
        // 💡 새로 추가된 안약 카테고리!
        { 
            id: 'eye', icon: '👁️', kr: '안약 / 인공눈물', jp: '目薬(めぐすり)はどこですか？', displayJp: '目薬をください。',
            subSymptoms: [
                { id: 'tired', label: '피로', jp: '目が疲れています。' },
                { id: 'dry', label: '건조(인공눈물)', jp: '目が乾燥しています（人工涙液）。' },
                { id: 'itch', label: '가려움 / 충혈', jp: '目がかゆいです・充血しています。' }
            ]
        },
        { 
            id: 'stomach', icon: '🤢', kr: '소화제 / 위장약', jp: '胃腸薬(いちょうやく)はどこですか？', displayJp: '胃腸薬をください。',
            subSymptoms: [
                { id: 'digest', label: '소화불량/체함', jp: '消化不良で胃がもたれています。' },
                { id: 'heartburn', label: '속쓰림/위산역류', jp: '胸やけがします・胃酸が逆流します。' },
                { id: 'diarrhea', label: '설사/장염', jp: '下痢をしています。' }
            ]
        },
        { 
            id: 'pain', icon: '⚡', kr: '근육통 / 파스', jp: '湿布(しっぷ)はどこですか？', displayJp: '湿布や筋肉痛の薬をください。',
            subSymptoms: [
                { id: 'shoulder', label: '어깨 결림', jp: '肩こりがひどいです。' },
                { id: 'back', label: '허리 통증', jp: '腰痛があります。' },
                { id: 'joint', label: '관절/무릎 통증', jp: '関節・膝が痛いです。' }
            ]
        },
        { 
            id: 'hangover', icon: '🍻', kr: '숙취 해소', jp: '二日酔い(ふつかよい)の薬はどこですか？', displayJp: '二日酔いに効く薬をください。',
            subSymptoms: [
                { id: 'before', label: '술 마시기 전', jp: 'お酒を飲む前に飲む薬をください。' },
                { id: 'after', label: '술 마신 후 (두통/메스꺼움)', jp: 'お酒を飲んだ後で、頭痛と吐き気があります。' }
            ]
        },
        { 
            id: 'bug', icon: '🦟', kr: '벌레 / 피부약', jp: '虫刺されの薬はどこですか？', displayJp: '虫刺され・皮膚の薬をください。',
            subSymptoms: [
                { id: 'bug', label: '모기/벌레 물림', jp: '蚊や虫に刺されました。' },
                { id: 'itch', label: '심한 가려움/두드러기', jp: '強いかゆみ・蕁麻疹があります。' },
                { id: 'wound', label: '상처/화상 연고', jp: '傷・やけど用の軟膏をください。' }
            ]
        }
    ]
};