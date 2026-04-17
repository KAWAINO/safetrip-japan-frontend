// src/data/questions.js
export const questions = {
  under1: [
    {
      id: "fever",
      question: "아이에게 열이 있나요?",
      type: "single",
      options: [
        { label: "없음", value: "fever_none", jp: "熱はありません。" },
        { label: "모름", value: "fever_unknown", jp: "熱があるか分かりません。" },
        { label: "37도 이상", value: "fever_37", jp: "37度以上の熱があります。" },
        { label: "38도 이상", value: "fever_38", jp: "38度以上の熱があります。" },
        { label: "39도 이상", value: "fever_39", jp: "39度以上の熱があります。" }
      ]
    },
    {
      id: 'fever_onset',
      type: 'single',
      question: '열은 언제부터 났나요?',
      condition: { dependsOn: 'fever', values: ['fever_38', 'fever_39'] }, 
      options: [
        { label: '방금 전부터', value: 'just_now', jp: "つい先ほどから熱が出始めました。" },
        { label: '오늘 아침부터', value: 'morning', jp: "今朝から熱があります。" },
        { label: '어젯밤부터', value: 'last_night', jp: "昨晩から熱があります。" },
        { label: '1~2일 전부터', value: '1_2_days', jp: "1~2日前から熱があります。" }
      ]
    },
    {
      id: "symptoms",
      question: "다음 증상이 있나요? (복수 선택 가능)",
      type: "multi",
      options: [
        { label: "기침", value: "cough", jp: "咳が出ます。" },
        { label: "콧물", value: "runny_nose", jp: "鼻水が出ます。" },
        { label: "구토", value: "vomit", jp: "嘔吐しました。" },
        { label: "설사", value: "diarrhea", jp: "下痢をしています。" },
        { label: "발진/두드러기", value: "rash", jp: "発疹・じんましんがあります。" },
        { label: "해당 없음", value: "none", jp: "その他の症状はありません。" }
      ]
    },
    // 💥 [개편됨] 1. 대변 상태 질문
    {
      id: 'stool_condition',
      type: 'single',
      question: '대변의 묽기와 상태는 어떤가요?',
      options: [
        { label: '보통 변', value: 'normal', jp: "便の硬さは普通です。" },
        { label: '묽은 변', value: 'soft', jp: "軟便（やわらかい便）が出ました。" },
        { label: '설사 / 물설사', value: 'diarrhea', jp: "下痢（水様便）をしています。" },
        { label: '단단한 변 / 토끼똥', value: 'hard', jp: "硬い便（コロコロ便）が出ました。" },
        { label: '오늘 아직 안 봄', value: 'none', jp: "今日はまだ便が出ていません。" }
      ]
    },
    // 💥 [개편됨] 2. 대변 색상 질문 (조건부)
    // src/data/questions.js 내부의 stool_color 질문 수정 (under1, over1 모두 적용)
    {
      id: 'stool_color',
      type: 'single',
      uiType: 'colorPalette', // 💥 [핵심] 이 질문은 팔레트 UI로 그리라고 프론트에 알려줌
      question: '대변의 색깔은 어떤가요?',
      condition: { dependsOn: 'stool_condition', values: ['normal', 'soft', 'diarrhea', 'hard'] },
      options: [
        { label: '노란색', value: 'yellow', jp: "便の色は黄色（黄金色）です。", colorCode: '#FBBF24' },
        { label: '갈색', value: 'brown', jp: "便の色は茶色です。", colorCode: '#78350F' },
        { label: '녹색', value: 'green', jp: "便の色は緑色です。", colorCode: '#4ADE80' },
        { label: '빨간색(피)', value: 'red', jp: "赤色の便（血便）が出ました。", colorCode: '#EF4444' },
        { label: '하얀색/크림', value: 'white', jp: "白色（クリーム色）の便が出ました。", colorCode: '#F9FAFB' },
        { label: '검은색', value: 'black', jp: "黒色の便が出ました。", colorCode: '#1F2937' }
      ]
    },
    {
      id: 'diaper',
      type: 'single',
      question: '기저귀(소변) 교체 횟수는 평소와 비교해 어떤가요?',
      options: [
        { label: '평소와 비슷함', value: 'normal', jp: "おしっこの回数は普段通りです。" },
        { label: '평소의 절반 이하로 줄었음', value: 'half', jp: "おしっこの回数が普段の半分以下に減っています。" },
        { label: '반나절(6시간) 이상 안 봄', value: 'none_6h', jp: "半日（6時間）以上おしっこが出ていません。" }
      ]
    },
    {
      id: "feeding",
      question: "수유(분유/모유)는 잘 먹나요?",
      type: "single",
      options: [
        { label: "평소처럼 먹음", value: "feed_normal", jp: "普段通り飲めています。" },
        { label: "평소의 절반 이하", value: "feed_half", jp: "普段の半分以下しか飲めません。" },
        { label: "전혀 못 먹음/토함", value: "feed_none", jp: "全く飲めない、または吐いてしまいます。" }
      ]
    }
  ],
  
  over1: [
    {
      id: "fever",
      question: "아이에게 열이 있나요?",
      type: "single",
      options: [
        { label: "없음", value: "fever_none", jp: "熱はありません。" },
        { label: "모름", value: "fever_unknown", jp: "熱があるか分かりません。" },
        { label: "38도 이상", value: "fever_38", jp: "38度以上の熱があります。" },
        { label: "39도 이상", value: "fever_39", jp: "39度以上の熱があります。" }
      ]
    },
    {
      id: 'fever_onset',
      type: 'single',
      question: '열은 언제부터 났나요?',
      condition: { dependsOn: 'fever', values: ['fever_38', 'fever_39'] }, 
      options: [
        { label: '방금 전부터', value: 'just_now', jp: "つい先ほどから熱が出始めました。" },
        { label: '오늘 아침부터', value: 'morning', jp: "今朝から熱があります。" },
        { label: '어젯밤부터', value: 'last_night', jp: "昨晩から熱があります。" },
        { label: '1~2일 전부터', value: '1_2_days', jp: "1~2日前から熱があります。" }
      ]
    },
    {
      id: "symptoms",
      question: "다음 증상이 있나요? (복수 선택 가능)",
      type: "multi",
      options: [
        { label: "기침", value: "cough", jp: "咳が出ます。" },
        { label: "콧물", value: "runny_nose", jp: "鼻水が出ます。" },
        { label: "구토", value: "vomit", jp: "嘔吐しました。" },
        // { label: "설사", value: "diarrhea", jp: "下痢をしています。" },
        { label: "복통", value: "stomachache", jp: "お腹を痛がっています。" },
        { label: "발진/두드러기", value: "rash", jp: "発疹・じんましんがあります。" },
        { label: "해당 없음", value: "none", jp: "その他の症状はありません。" }
      ]
    },
    // 💥 [개편됨] 1. 대변 상태 질문
    {
      id: 'stool_condition',
      type: 'single',
      question: '대변의 묽기와 상태는 어떤가요?',
      options: [
        { label: '보통 변', value: 'normal', jp: "便の硬さは普通です。" },
        { label: '묽은 변', value: 'soft', jp: "軟便（やわらかい便）が出ました。" },
        { label: '설사 / 물설사', value: 'diarrhea', jp: "下痢（水様便）をしています。" },
        { label: '단단한 변 / 토끼똥', value: 'hard', jp: "硬い便（コロコロ便）が出ました。" },
        { label: '오늘 아직 안 봄', value: 'none', jp: "今日はまだ便が出ていません。" }
      ]
    },
    // 💥 [개편됨] 2. 대변 색상 질문 (조건부)
    {
      id: 'stool_color',
      type: 'single',
      question: '대변의 색깔은 어떤가요?',
      condition: { dependsOn: 'stool_condition', values: ['normal', 'soft', 'diarrhea', 'hard'] },
      options: [
        { label: '🟡 노란색 / 황금색', value: 'yellow', jp: "便の色は黄色（黄金色）です。" },
        { label: '🟤 갈색 / 진갈색', value: 'brown', jp: "便の色は茶色です。" },
        { label: '🟢 녹색', value: 'green', jp: "便の色は緑色です。" },
        { label: '🔴 빨간색 (피 섞임)', value: 'red', jp: "赤色の便（血便）が出ました。" },
        { label: '⚪ 하얀색 / 크림색', value: 'white', jp: "白色（クリーム色）の便が出ました。" },
        { label: '⚫ 검은색 (짜장면색)', value: 'black', jp: "黒色の便が出ました。" }
      ]
    },
    {
      id: 'diaper',
      type: 'single',
      question: '기저귀(소변) 교체 횟수는 평소와 비교해 어떤가요?',
      options: [
        { label: '평소와 비슷함', value: 'normal', jp: "おしっこの回数は普段通りです。" },
        { label: '평소의 절반 이하로 줄었음', value: 'half', jp: "おしっこの回数が普段の半分以下に減っています。" },
        { label: '반나절(6시간) 이상 안 봄', value: 'none_6h', jp: "半日（6時間）以上おしっこが出ていません。" }
      ]
    },
    {
      id: "eating",
      question: "식사나 수분 섭취는 어떤가요?",
      type: "single",
      options: [
        { label: "평소와 비슷함", value: "eat_normal", jp: "普段通り食べられています。" },
        { label: "물만 조금 마심", value: "eat_water_only", jp: "水分しか摂れません。" },
        { label: "전혀 못 먹음", value: "eat_none", jp: "全く食べられず、水分も摂れません。" }
      ]
    }
  ],
  pregnant: [
        {
            id: "preg_weeks",
            question: "현재 임신 몇 주 차이신가요?",
            type: "single",
            options: [
                { label: "초기 (1~13주)", value: "first_trimester", jp: "妊娠初期 (1~13週)" },
                { label: "중기 (14~28주)", value: "second_trimester", jp: "妊娠中期 (14~28週)" },
                { label: "후기 (29주 이상~)", value: "third_trimester", jp: "妊娠後期 (29週~)" },
                { label: "정확히 모름", value: "unknown", jp: "正確な週数は分かりません" }
            ]
        },
        {
            id: "preg_symptom",
            question: "가장 불편한 증상은 무엇인가요? (중복 선택 가능)",
            type: "multi",
            options: [
                { label: "🩸 하혈 / 출혈이 있어요", value: "bleeding", jp: "出血があります" },
                { label: "⚡ 배 뭉침 / 복통이 심해요", value: "abdominal_pain", jp: "お腹の張り・ひどい腹痛があります" },
                { label: "🤢 입덧 / 구토가 멈추지 않아요", value: "nausea", jp: "つわり・吐き気が止まりません" },
                { label: "🔥 열이 나고 감기 기운이 있어요", value: "fever_cold", jp: "発熱・風邪の症状があります" },
                { label: "💦 양수가 터진 것 같아요", value: "water_broke", jp: "破水したかもしれません" },
                // { label: "기타 (직접 설명할게요)", value: "other", jp: "その他の症状（直接説明します）" }
            ]
        },
        // {
        //     id: "preg_medication",
        //     question: "현재 복용 중인 약이나 영양제가 있나요?",
        //     type: "single",
        //     options: [
        //         { label: "네 (철분제, 엽산 등 포함)", value: "yes", jp: "現在服用している薬があります（鉄剤、葉酸などを含む）" },
        //         { label: "아니요", value: "no", jp: "現在服用中の薬はありません" }
        //     ]
        // },
        // {
        //     id: "preg_allergy",
        //     question: "약물 알레르기가 있나요?",
        //     type: "single",
        //     options: [
        //         { label: "네, 있습니다", value: "yes", jp: "薬アレルギーがあります" },
        //         { label: "아니요, 없습니다", value: "no", jp: "薬物アレルギーはありません" }
        //     ]
        // }
    ]
};