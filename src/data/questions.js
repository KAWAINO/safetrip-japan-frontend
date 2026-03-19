export const questions = {
  under1: [
    {
      id: "fever",
      question: "아이에게 열이 있나요?",
      type: "single",
      options: [
        { label: "없음", value: "fever_none", jp: "" },
        { label: "모름", value: "fever_unknown", jp: "熱があるか分かりません。" },
        { label: "37도 이상", value: "fever_37", jp: "子供に37度以上の熱があります。" },
        { label: "38도 이상", value: "fever_38", jp: "子供に38度以上の熱があります。" }
      ]
    },
    {
      id: "symptoms",
      question: "다음 증상이 있나요? (복수 선택 가능)",
      type: "multi",
      options: [
        { label: "기침", value: "cough", jp: "咳があります。" },
        { label: "구토", value: "vomit", jp: "嘔吐しました。" },
        { label: "설사", value: "diarrhea", jp: "下痢があります。" }
      ]
    },
    {
      id: "feeding", // 1세 미만 전용 질문
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
        { label: "없음", value: "fever_none", jp: "" },
        { label: "모름", value: "fever_unknown", jp: "熱があるか分かりません。" },
        { label: "38도 이상", value: "fever_38", jp: "子供に38度以上の熱があります。" },
        { label: "39도 이상", value: "fever_39", jp: "子供に39度以上の熱があります。" }
      ]
    },
    {
      id: "symptoms",
      question: "다음 증상이 있나요? (복수 선택 가능)",
      type: "multi",
      options: [
        { label: "기침", value: "cough", jp: "咳があります。" },
        { label: "구토", value: "vomit", jp: "嘔吐しました。" },
        { label: "설사", value: "diarrhea", jp: "下痢があります。" },
        { label: "복통", value: "stomachache", jp: "お腹を痛がっています。" } // 1세 이상 추가 증상
      ]
    },
    {
      id: "eating", // 1세 이상 전용 질문
      question: "식사나 수분 섭취는 어떤가요?",
      type: "single",
      options: [
        { label: "평소와 비슷함", value: "eat_normal", jp: "普段通り食べられています。" },
        { label: "물만 조금 마심", value: "eat_water_only", jp: "水分しか摂れません。" },
        { label: "전혀 못 먹음", value: "eat_none", jp: "全く食べられず、水分も摂れません。" }
      ]
    }
  ]
};