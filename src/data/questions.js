// src/data/questions.js
export const questions = {
  child: [
    {
      id: "fever",
      question: "아이에게 열이 있나요?",
      type: "single",
      options: [
        { label: "없음", value: "fever_none", jp: "熱はありません。" },
        { label: "모름", value: "fever_unknown", jp: "熱があるか分かりません。" },
        { label: "37.5도 ~ 38도", value: "fever_37", jp: "37.5度から38度程度の微熱があります。" },
        { label: "38도 이상", value: "fever_38", jp: "38度以上の熱があります。" },
        { label: "39도 이상", value: "fever_39", jp: "39度以上の熱があります。" }
      ]
    },
    {
      id: "appearance",
      question: "시각적으로 보이는 아이의 상태는 어떤가요?",
      type: "multi",
      options: [
        { label: "평소보다 기운이 없어 보임", value: "lethargic", jp: "普段より活気がなく、ぐったりしています。" },
        { label: "심하게 보채거나 짜증을 부림", value: "irritable", jp: "ひどく機嫌が悪く、ぐずっています。" },
        { label: "잠만 자려고 함", value: "sleepy", jp: "眠ってばかりいて、なかなか起きません。" },
        { label: "안색이 창백함", value: "pale", jp: "顔色が青白く、血の気がありません。" },
        { label: "평소와 비슷함", value: "normal", jp: "見た目の様子は普段と変わりません。" }
      ]
    },
    {
      id: "symptoms",
      question: "다음 중 해당되는 증상을 선택해주세요.",
      type: "multi",
      options: [
        { label: "기침", value: "cough", jp: "咳が出ます。" },
        { label: "콧물", value: "runny_nose", jp: "鼻水が出ます。" },
        { label: "구토", value: "vomit", jp: "嘔吐しました。" },
        { label: "경련/경직", value: "seizure", jp: "けいれん（ひきつけ）を起こしました。" }, // 💡 경련 추가
        { label: "복통(배를 아파함)", value: "stomachache", jp: "お腹を痛がっています。" },
        { label: "발진/두드러기", value: "rash", jp: "発疹・じんましんがあります。" },
        { label: "해당 없음", value: "none", jp: "その他の症状はありません。" }
      ]
    },
    {
      id: 'stool_condition',
      question: '대변의 상태는 어떤가요?',
      type: 'single',
      options: [
        { label: '보통 변', value: 'normal', jp: "便の硬さは普通です。" },
        { label: '묽은 변/설사', value: 'soft_diarrhea', jp: "軟便、または下痢をしています。" },
        { label: '혈변 (피가 섞임)', value: 'bloody_stool', jp: "血便（便に血が混じっている）が出ました。" }, // 💡 혈변 추가
        { label: '단단한 변/토끼똥', value: 'hard', jp: "硬い便（コロコロ便）が出ました。" },
        { label: '오늘 아직 안 봄', value: 'none', jp: "今日はまだ便が出ていません。" }
      ]
    },
    {
      id: 'diaper_urine',
      question: '소변 상태(기저귀 교체 횟수)는 어떤가요?',
      type: 'single',
      options: [
        { label: '평소와 비슷함', value: 'normal', jp: "おしっこの回数は普段通りです。" },
        { label: '평소보다 현저히 줄었음', value: 'decreased', jp: "おしっこの回数が明らかに減っています。" },
        { label: '6시간 이상 소변을 안 봄', value: 'none_6h', jp: "6時間以上おしっこが出ていません。" }
      ]
    },
    {
      id: "intake",
      question: "식사나 수유(분유/모유)는 어떤가요?",
      type: "single",
      options: [
        { label: "식사는 평소처럼 잘 먹음", value: "intake_normal", jp: "食事（ミルク）は普段通りとれています。" },
        { label: "식사는 평소의 절반 이하로 먹음", value: "intake_half", jp: "食事（ミルク）は普段の半分以下しかとれません。" },
        { label: "식사를 전혀 못 먹음", value: "intake_none", jp: "食事（ミルク）は全くとれません。" }
      ]
    },
    {
      id: "medication",
      question: "현재 복용 중인 약이 있나요?",
      type: "single",
      options: [
        { label: "아니오", value: "med_no", jp: "現在服用中の薬はありません。" },
        { label: "예 (약이나 처방전 지참함)", value: "med_yes", jp: "現在服用中の薬があります（実物または処方箋を持参しています）。" }
      ]
    },
    {
      id: "allergy",
      question: "약이나 음식물 알레르기가 있나요?",
      type: "single",
      options: [
        { label: "아니오", value: "alg_no", jp: "薬や食べ物のアレルギーはありません。" },
        { label: "약 알레르기 있음", value: "alg_med", jp: "薬のアレルギーがあります。" },
        { label: "음식 알레르기 있음 (계란, 우유 등)", value: "alg_food", jp: "食べ物（卵、牛乳など）のアレルギーがあります。" }
      ]
    },
    {
      id: "past_illness",
      question: "과거에 앓았거나 현재 있는 지병이 있나요? (복수 선택 가능)",
      type: "multi", 
      options: [
        { label: "천식", value: "asthma", jp: "ぜんそく（喘息）の病歴があります。" },
        { label: "열성경련", value: "febrile_seizure", jp: "熱性けいれんの病歴があります。" },
        { label: "가와사키병", value: "kawasaki", jp: "川崎病の病歴があります。" },
        { label: "수두", value: "chickenpox", jp: "水ぼうそう（水痘）の病歴があります。" },
        { label: "홍역", value: "measles", jp: "はしか（麻疹）の病歴があります。" },
        { label: "풍진", value: "rubella", jp: "風疹（ふうしん）の病歴があります。" },
        { label: "볼거리", value: "mumps", jp: "おたふくかぜ（流行性耳下腺炎）の病歴があります。" },
        { label: "백일해", value: "pertussis", jp: "百日咳（ひゃくにちぜき）の病歴があります。" },
        { label: "일본뇌염", value: "japanese_encephalitis", jp: "日本脳炎の病歴があります。" },
        { label: "해당 없음", value: "none", jp: "特にかかった大きな病気（既往歴）はありません。" }
      ]
    },
    {
      id: "onset_time",
      question: "이러한 증상은 언제부터 시작되었나요?",
      type: "single",
      options: [
        { label: "방금 전부터", value: "just_now", jp: "つい先ほどからです。" },
        { label: "오늘 아침/오전부터", value: "morning", jp: "今朝（午前中）からです。" },
        { label: "어젯밤부터", value: "last_night", jp: "昨晩からです。" },
        { label: "1~2일 전부터", value: "1_2_days", jp: "1〜2日前からです。" },
        { label: "3일 이상 됨", value: "over_3days", jp: "3日以上前から続いています。" }
      ]
    }
  ],

  pregnant: 
  [
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
    }
  ]
};