// // 💡 앞으로 쿠폰이 추가되면 이 파일만 수정하시면 됩니다!
// export const couponData = [
//     {
//         id: 'donki',
//         name: '돈키호테',
//         categories: ['drug'],
//         discount: '면세 10% + 5% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1256624&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F86793-don-quijote-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D12dff71723', 
//         conditions: ['세금 불포함 10,000엔 이상 구매 시 5% 할인', '세금 불포함 30,000엔 이상 구매 시 7% 할인', '술, 담배 등 일부 품목 제외'],
//         region: '일본 전국'
//     },
//     {
//         id: 'matsukiyo',
//         name: '마츠모토키요시',
//         categories: ['drug'],
//         discount: '면세 10% + 최대 7% 추가 할인',
//         // type: 'link',
//         // linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257140&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F150096-matsumoto-kiyoshi-duty-free-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Dbcd46c4296', 
//         type: 'image',
//         imageUrl: '/images/coupons/matsukiyo.jpg',
//         conditions: ['1만엔 이상 구매 시 3% 할인 + 10% 면세', '3만엔 이상 구매 시 5% 할인 + 10% 면세', '5만엔 이상 구매 시 7% 할인 + 10% 면세', '결제 전 점원에게 바코드 제시'],
//         region: '일본 전국'
//     },
//     {
//         id: 'sundrug',
//         name: '선드럭',
//         categories: ['drug'],
//         discount: '면세 10% + 최대 7% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1256625&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F85217-sundrug-tax-free-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D5ff46248f6%26translation%3D0', 
//         conditions: ['1만엔 이상 구매 시 3% 할인 + 10% 면세', '3만엔 이상 구매 시 5% 할인 + 10% 면세', '5만엔 이상 구매 시 7% 할인 + 10% 면세', '의약품, 화장품 등 일부 할인 품목은 본 쿠폰으로 사용하실 수 없습니다.'],
//         region: '일본 전국'
//     },
//     {
//         id: 'Tsuruha',
//         name: '쓰루하',
//         categories: ['drug'],
//         discount: '면세 10% + 최대 7% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257145&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F88116-tsuruba-drug-store-shopping-coupons%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D46b519408e%26translation%3D0',
//         conditions: ['1만엔 이상 구매 시 3% 할인 + 10% 면세', '3만엔 이상 구매 시 5% 할인 + 10% 면세', '5만엔 이상 구매 시 7% 할인 + 10% 면세', '일부 상품 8% 면세'],
//         region: '일본 전국'
//     },
//     {
//         id: 'cosmos',
//         name: '코스모스',
//         categories: ['drug'],
//         discount: '면세 10% + 최대 9% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257176&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F85357-drugstore-cosmos-osaka-tokyo-fukuoka%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Dd52de3dd27', 
//         conditions: ['1만엔 이상 구매 시 5% 할인 + 8% 또는 10% 면세', '3만엔 이상 구매 시 7% 할인 + 8% 또는 10% 면세', '5만엔 이상 구매 시 9% 할인 + 8% 또는 10% 면세', '본 쿠폰은 가부키초 1초메점, 도톤보리점, 히로오역점, 텐진 다이마루 앞점, 신사이바시 남점의 5개 지점(패키지 정보에서 확인 요망)에서만 유효합니다.', '주류 및 담배 제품은 제외됩니다.'],
//         region: '지정 매장'
//     },
//     {
//         id: 'Shinseido',
//         name: '신세이도',
//         categories: ['drug'],
//         discount: '면세 10% + 5% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257192&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F146086-shinseido-drugstore-special-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D67defa891b',
//         conditions: ['최소 구매 금액 제한 없음, 언제든지 사용 가능', '쿠폰은 현재 7개 지점(패키지 정보에서 확인 요망)에서만 사용 가능'],
//         region: '후쿠오카 한정'
//     },
//     {
//         id: 'COSMETICS AND MEDICAL',
//         name: '코스매틱 & 메디컬',
//         categories: ['drug'],
//         discount: '면세 10% + 최대 5% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257196&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F87306-cosmetics-medical-tax-free-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Dbeb25c02ab',
//         conditions: ['1만엔 이상 구매 시 3% 할인 + 10% 면세', '5만엔 이상 구매 시 5% 할인 + 10% 면세', '사용 가능 지역은 패키지 옵션에서 확인 요망'],
//         region: '도쿄 한정'
//     },
//     {
//         id: 'OHGA',
//         name: '오가약국',
//         categories: ['drug'],
//         discount: '면세 10% + 500엔 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257211&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F149059-ohga-pharmacy-tax-free-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D4cdc019658', 
//         conditions: ['1만엔 이상 구매 시 500엔 할인 + 10% 면세'],
//         region: '후쿠오카 한정'
//     },
//     {
//         id: 'SAPPORO DRUG STORE',
//         name: '사포로 드럭스토어',
//         categories: ['drug'],
//         discount: '면세 10% + 최대 5% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257281&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F90293-sapporo-drug-store-shopping-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D55263ab0f5%26translation%3D0', 
//         conditions: ['5천엔 이상 구매 시 5% 할인 + 10% 면세'],
//         region: '훗카이도 한정' // 💡 긴 주소 대신 직관적인 문구로 변경 추천
//     },


//     {
//         id: 'biccamera',
//         name: '빅카메라 (Bic Camera)',
//         categories: ['drug', 'electronics'], // 💡 드럭과 가전 양쪽 탭에 모두 노출!
//         discount: '면세 10%(일부 품목 8%) + 최대 7% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257286&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F73336-bic-camera-tourist-privilege-discount-coupon-2022%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D65db7e492d', 
//         conditions: ['가전제품 및 콘택트렌즈 최대 7% 추가 할인', '의약품/화장품/생활용품/게임용 콘솔도 5% 할인', '사케 3% 할인 (핫카이산, 닷사이 제외)', '본 쿠폰은 빅 카메라, 코지마, 소프맵, 에어 빅 카메라 전 매장에서 사용 가능', '계산 전 점원에게 화면 제시'],
//         region: '일본 전국'
//     },
//     {
//         id: 'edion',
//         name: '이디온 (EDION)',
//         categories: 'electronics',
//         discount: '면세 10% + 최대 7% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257289&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F83114-edion-tourist-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D5a07050ee3', 
//         conditions: ['면세 대상은 소모품을 제외한 일반 상품 구매 금액이 5,000엔 이상이어야 합니다. 소모품은 단일 점포에서 1일 5,000엔~500,000엔 구입 시 면세입니다.', '대상제품 7% 할인 : 밥솥, 전기주전자, 면도기, 헤어드라이어, 혈압계, 미용용품, 공기청정기, 비데변기, 스팀다리미, 로봇청소기, 디지털카메라, 디지털 SLR 카메라 등', 'DM전단지, 데일리특가상품, 수량한정상품, 클리어런스상품, 휴대폰, Surface, VAIO, Apple제품, Amazon제품, PC부품, 시계, 장난감, 일반게임용품, 영상/음악소프트웨어, 서적, 주류, 각종 상품권 및 일부 다른 품목은 프로모션 대상이 아닙니다.'],
//         region: '일본 전국'
//     },
//     {
//         id: 'YAMADA Denki',
//         name: '야마다전기',
//         categories: ['drug', 'electronics'],
//         discount: '면세 10% + 최대 7% 추가 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1258043&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F98716-yamada-denki-duty-free-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3De47901e717', 
//         conditions: ['면세 10% + 최대 7% 추가 할인', '일부 지정 상품, 특가 상품, 전시품, Apple 상품, 각종 게임기 및 공식 액세서리, 게임 소프트웨어, PlayStation VR, 일부 Panasonic/Dyson 상품, 아울렛 상품, 중고 상품 등은 면세 할인 대상이 아닙니다. 자세한 내용은 영업직원에게 문의하세요)'],
//         region: '일본 전국'
//     },


//     {
//         id: 'Mitsui Shopping Park',
//         name: '미쓰이 쇼핑 파크',
//         categories: 'department', 
//         discount: '면세 + 10% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257921&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F98058-mitsui-outlet-park-mitsui-shopping-park-tourist-privilege-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D7aebe82988', 
//         conditions: ['참여 업체/브랜드 최대 10% 할인 + 면세 + 선물'],
//         region: '일본 전국'
//     },
//     {
//         id: 'MITSUI OUTLET PARK',
//         name: '미쓰이 아울렛 파크',
//         categories: 'department', 
//         discount: '면세 + 10% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257921&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F98058-mitsui-outlet-park-mitsui-shopping-park-tourist-privilege-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D7aebe82988', 
//         conditions: ['참여 업체/브랜드 최대 10% 할인 + 면세 + 선물'],
//         region: '일본 전국'
//     },
//     {
//         id: 'Daimaru/Matsuzakaya',
//         name: '다이마루/마쓰자카야 백화점',
//         categories: 'department', 
//         discount: '면세 + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1258037&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F87245-daimaru-matsuzakaya-shopping-coupon-japan%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Dfa7539bd02', 
//         conditions: ['참여 업체/브랜드 5% 할인 + 면세', '세금 환급 절차 시 무료 음식 쿠폰 제공: 1회 100,000엔(세금 포함) 이상 세금 환급을 처리하는 경우 식품점/레스토랑/카페에서 사용할 수 있는 2,000엔 음식 쿠폰을 받게 됩니다.'],
//         region: '일본 전국'
//     },
//     {
//         id: 'AlpenGroup',
//         name: '알펜',
//         categories: 'department', 
//         discount: '면세 + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1258040&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F168209-for-free-alpen-group-5-off-tax-free-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D57fdfee0d2', 
//         conditions: ['5천엔 이상 구매 시 5% 할인 + 면세'],
//         region: '일본 전국'
//     },
//     {
//         id: 'DiverCity Tokyo Plaza',
//         name: '다이버시티 도쿄 플라자',
//         categories: 'department', 
//         discount: '면세 + 10% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257921&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F98058-mitsui-outlet-park-mitsui-shopping-park-tourist-privilege-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D7aebe82988', 
//         conditions: ['참여 업체/브랜드 최대 10% 할인 + 면세 + 선물'],
//         region: '도쿄 한정'
//     },
//     {
//         id: 'COREDO',
//         name: '코레도 무로마치',
//         categories: 'department', 
//         discount: '면세 + 10% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257921&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F98058-mitsui-outlet-park-mitsui-shopping-park-tourist-privilege-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D7aebe82988', 
//         conditions: ['참여 업체/브랜드 최대 10% 할인 + 면세 + 선물'],
//         region: '도쿄 한정'
//     },
//     {
//         id: 'LAZONA Kawasaki',
//         name: '라조나 카와사키 플라자',
//         categories: 'department', 
//         discount: '면세 + 10% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257921&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F98058-mitsui-outlet-park-mitsui-shopping-park-tourist-privilege-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D7aebe82988', 
//         conditions: ['참여 업체/브랜드 최대 10% 할인 + 면세 + 선물'],
//         region: '도쿄 한정'
//     },
//     {
//         id: 'SEIBU & SOGO',
//         name: '세이부&소고 백화점',
//         categories: 'department', 
//         discount: '면세 + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257922&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F84324-seibu-department-special-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Dd3d4ae16db', 
//         conditions: ['1천엔 이상 5% 할인'],
//         region: '도쿄 한정'
//     },
//     {
//         id: 'TOBU',
//         name: '토부 백화점',
//         categories: 'department', // 💡 드럭과 가전 양쪽 탭에 모두 노출!
//         discount: '면세 10% + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257292&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F82826-tobu-department-store-ikebukuro-coupon-exchange-ticket%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D381b79ec18', 
//         conditions: ['이 쿠폰은 개별 가격이 JPY 1,000(세금 별도) 이상인 제품 구매 시 5% 할인을 제공합니다. (결제는 현금(JPY) 또는 중국 은련카드, 알리페이, 위캐트페이에 한함)'],
//         region: '이케부쿠로 한정'
//     },
//     {
//         id: 'Keio',
//         name: '게이오 백화점',
//         categories: 'department', // 💡 드럭과 가전 양쪽 탭에 모두 노출!
//         discount: '면세 10% + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1257294&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F84552-keio-department-store-special-coupon-shinjuku-tokyo%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D1b140cfd99', 
//         conditions: ['3천엔 이상 구매 시 5% 할인'],
//         region: '신주쿠 한정'
//     },
//     {
//         id: 'Odakyu',
//         name: '오다큐 백화점',
//         categories: 'department', // 💡 드럭과 가전 양쪽 탭에 모두 노출!
//         discount: '면세 10% + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1258038&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F84376-odakyu-department-store-shinjuku-tokyo%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Deb38cf6862', 
//         conditions: ['1천엔 이상 구매 시 5% 할인'],
//         region: '신주쿠 한정'
//     },
//     {
//         id: 'Kintetsu',
//         name: '긴테쓰 백화점',
//         categories: 'department', // 💡 드럭과 가전 양쪽 탭에 모두 노출!
//         discount: '면세 10% + 5% 할인',
//         type: 'link',
//         linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1258038&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F84376-odakyu-department-store-shinjuku-tokyo%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3Deb38cf6862', 
//         conditions: ['1천엔 이상 구매 시 5% 할인'],
//         region: '오사카 한정'
//     },
// ];

// 💡 앞으로 쿠폰이 추가되면 이 파일만 수정하시면 됩니다!
export const couponData = [
    {
        id: 'donki',
        name: '돈키호테',
        categories: ['drug'],
        discount: '면세 10% + 5% 추가 할인',
        type: 'link', // 🚨 돈키호테는 반드시 링크(live web)여야 합니다!
        linkUrl: 'https://affiliate.klook.com/redirect?aid=118625&aff_adid=1256624&k_site=https%3A%2F%2Fwww.klook.com%2Fko%2Factivity%2F86793-don-quijote-discount-coupon%2F%3Fspm%3DCountry.Activity_LIST%26clickId%3D12dff71723', 
        conditions: [
            '세금 불포함 10,000엔 이상 구매 시 5% 추가 할인 + 10% 면세', 
            '주류, 담배, POSA 카드, 게임기 본체, 단가 10만엔 이상 상품은 할인 제외', 
            '⚠️ 캡처된 이미지는 사용 불가! 반드시 위 버튼을 눌러 나오는 실시간 웹 화면을 점원에게 제시해 주세요.'
        ],
        region: '일본 전국'
    },
    {
        id: 'matsukiyo',
        name: '마츠모토키요시',
        categories: ['drug'],
        discount: '면세 10% + 최대 7% 추가 할인',
        type: 'image', // 💡 기획자님 의도대로 이미지로 세팅
        imageUrl: '/images/coupons/matsukiyo.jpg',
        conditions: [
            '1만엔 이상 구매 시 3% 할인 + 10% 면세', 
            '3만엔 이상 구매 시 5% 할인 + 10% 면세', 
            '5만엔 이상 구매 시 7% 할인 + 10% 면세', 
            '카운셀링 화장품(시세이도, 카네보 등), 담배, 잡지, 기저귀, 유아식 등은 할인 제외'
        ],
        region: '일본 전국'
    },
    {
        id: 'sundrug',
        name: '선드럭',
        categories: ['drug'],
        discount: '면세 10% + 최대 7% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/sundrug.jpg', 
        conditions: [
            '1만엔 이상 구매 시 3% 할인 + 10% 면세', 
            '3만엔 이상 구매 시 5% 할인 + 10% 면세', 
            '5만엔 이상 구매 시 7% 할인 + 10% 면세', 
            '일부 고급 화장품, 담배, 기저귀, 분유, POSA 카드 등은 할인에서 제외됩니다.'
        ],
        region: '일본 전국'
    },
    {
        id: 'Tsuruha',
        name: '쓰루하',
        categories: ['drug'],
        discount: '면세 10% + 최대 7% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/tsuruha.jpg',
        conditions: [
            '1만엔 이상 구매 시 3% 할인 + 10% 면세', 
            '3만엔 이상 구매 시 5% 할인 + 10% 면세', 
            '5만엔 이상 구매 시 7% 할인 + 10% 면세', 
            '일부 카운셀링 화장품, 주류, 담배 등 제외 (식품 등 일부 상품은 8% 면세 적용)'
        ],
        region: '일본 전국'
    },
    {
        id: 'cosmos',
        name: '코스모스',
        categories: ['drug'],
        discount: '면세 10% + 최대 9% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/cosmos.jpg', 
        conditions: [
            '1만엔 이상 구매 시 5% 할인 / 3만엔 이상 7% / 5만엔 이상 9% 추가 할인', 
            '주류 및 담배 제품은 할인 제외',
            '본 쿠폰은 가부키초 1초메, 도톤보리, 히로오역, 텐진 다이마루 앞, 신사이바시 남점의 5개 지정 점포에서만 유효합니다.'
        ],
        region: '지정 매장'
    },
    {
        id: 'Shinseido',
        name: '신세이도',
        categories: ['drug'],
        discount: '면세 10% + 5% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/shinseido.jpg',
        conditions: [
            '구매 금액 제한 없이 5% 추가 할인 적용 (면세는 5천엔 이상부터)', 
            '현재 7개 지정 지점에서만 사용 가능 (패키지 옵션 확인)'
        ],
        region: '후쿠오카 한정'
    },
    {
        id: 'COSMETICS AND MEDICAL',
        name: '코스매틱 & 메디컬',
        categories: ['drug'],
        discount: '면세 10% + 최대 5% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/cosmetics.jpg',
        conditions: [
            '1만엔 이상 구매 시 3% 할인 + 10% 면세', 
            '5만엔 이상 구매 시 5% 할인 + 10% 면세', 
            '사용 가능 지역 및 제외 품목은 공식 홈페이지 규정을 따릅니다.'
        ],
        region: '도쿄 한정'
    },
    {
        id: 'OHGA',
        name: '오가약국',
        categories: ['drug'],
        discount: '면세 10% + 500엔 할인',
        type: 'image',
        imageUrl: '/images/coupons/ohga.jpg', 
        conditions: [
            '1만엔 이상 구매 시 500엔 즉시 할인 + 10% 면세',
            '일부 의약품 및 잡화 제외'
        ],
        region: '후쿠오카 한정'
    },
    {
        id: 'SAPPORO DRUG STORE',
        name: '삿포로 드럭스토어 (사츠도라)',
        categories: ['drug'],
        discount: '면세 10% + 5% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/sapporo.jpg', 
        conditions: [
            '5천엔 이상 구매 시 5% 할인 + 10% 면세',
            '계산 시 점원에게 여권과 함께 본 바코드 화면을 제시해 주세요.'
        ],
        region: '홋카이도 한정'
    },

    // ---------------- 전자기기 (Electronics) ----------------
    {
        id: 'biccamera',
        name: '빅카메라 (Bic Camera)',
        categories: ['drug', 'electronics'], 
        discount: '면세 10% + 최대 7% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/biccamera.jpg', 
        conditions: [
            '카메라, 시계, 가전, 콘택트렌즈: 7% 할인', 
            '의약품, 화장품, 일용품, 과자: 5% 할인', 
            '일본 사케(주류): 3% 할인', 
            '🚫 Apple 제품, 롤렉스, 닌텐도 스위치 본체, 주류 일부(닷사이 등)는 할인 제외',
            '빅카메라, 코지마, 소프맵 전 매장 사용 가능'
        ],
        region: '일본 전국'
    },
    {
        id: 'edion',
        name: '에디온 (EDION)',
        categories: ['electronics'],
        discount: '면세 10% + 최대 7% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/edion.jpg', 
        conditions: [
            '가전제품 7% 추가 할인 (밥솥, 뷰티가전, 청소기 등)', 
            '🚫 Apple 제품, 닌텐도 스위치/PS5 본체, 주류, 아울렛 상품 등은 대상 제외'
        ],
        region: '일본 전국'
    },
    {
        id: 'YAMADA Denki',
        name: '야마다전기',
        categories: ['drug', 'electronics'],
        discount: '면세 10% + 최대 7% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/yamada.jpg', 
        conditions: [
            '면세 10% + 최대 7% 추가 할인 적용', 
            '🚫 Apple 제품, 각종 게임기 본체(PS, 스위치), 명품 시계, 아울렛/중고 상품 등은 할인 대상 제외'
        ],
        region: '일본 전국'
    },

    // ---------------- 백화점 / 아울렛 (Department) ----------------
    {
        id: 'Mitsui Shopping Park',
        name: '미쓰이 아울렛 / 쇼핑 파크',
        categories: ['department'], 
        discount: '면세 10% + 최대 10% 할인',
        type: 'image',
        imageUrl: '/images/coupons/mitsui.jpg', 
        conditions: [
            '종합 안내소에서 본 화면을 제시하면 쿠폰북(QR)으로 교환해 줍니다.',
            '각 브랜드 및 매장별로 할인율(최대 10%) 및 혜택이 상이합니다.'
        ],
        region: '일본 전국'
    },
    {
        id: 'Daimaru/Matsuzakaya',
        name: '다이마루/마쓰자카야 백화점',
        categories: ['department'], 
        discount: '면세 10% + 5% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/daimaru.jpg', 
        conditions: [
            '면세 대상 상품에 한해 5% 추가 할인', 
            '루이비통, 샤넬, 롤렉스 등 일부 명품 브랜드 및 식품 매장은 할인 제외',
            '10만엔 이상 세금 환급 처리 시 2,000엔 상당의 음식 쿠폰 증정'
        ],
        region: '일본 전국'
    },
    {
        id: 'AlpenGroup',
        name: '알펜 그룹 (Alpen)',
        categories: ['department'], 
        discount: '면세 10% + 5% 추가 할인',
        type: 'image',
        imageUrl: '/images/coupons/alpen.jpg', 
        conditions: [
            '5천엔 이상 구매 시 5% 할인 + 10% 면세 적용',
            '스포츠, 아웃도어, 골프 용품 등 전 매장 적용 (일부 한정판 제외)'
        ],
        region: '일본 전국'
    },
    {
        id: 'SEIBU & SOGO',
        name: '세이부 & 소고 백화점',
        categories: ['department'], 
        discount: '면세 10% + 5% 할인',
        type: 'image',
        imageUrl: '/images/coupons/seibu.jpg', 
        conditions: [
            '1천엔 이상 구매 시 5% 할인 적용',
            '일부 명품 브랜드(에르메스 등), 식품관, 특가 상품은 제외됩니다.'
        ],
        region: '도쿄 한정'
    },
    {
        id: 'TOBU',
        name: '토부 백화점 (이케부쿠로)',
        categories: ['department'], 
        discount: '면세 10% + 5% 할인',
        type: 'image',
        imageUrl: '/images/coupons/tobu.jpg', 
        conditions: [
            '단가 1,000엔 이상 제품 구매 시 5% 할인 (현금/은련/위챗페이 등 결제 한정)',
            '일부 명품 및 식품류 제외'
        ],
        region: '이케부쿠로 한정'
    },
    {
        id: 'Keio',
        name: '게이오 백화점 (신주쿠)',
        categories: ['department'], 
        discount: '면세 10% + 5% 할인',
        type: 'image',
        imageUrl: '/images/coupons/keio.jpg', 
        conditions: [
            '3천엔 이상 구매 시 5% 할인 적용',
            '화장품, 의류 등 적용 (일부 명품 및 식품 제외)'
        ],
        region: '신주쿠 한정'
    },
    {
        id: 'Odakyu',
        name: '오다큐 백화점 / 긴테쓰 백화점', // 중복 링크라 합쳤습니다
        categories: ['department'], 
        discount: '면세 10% + 5% 할인',
        type: 'image',
        imageUrl: '/images/coupons/odakyu.jpg', 
        conditions: [
            '1천엔 이상 구매 시 5% 할인 적용',
            '할인 제외 브랜드 및 품목은 매장 안내를 참조해 주세요.'
        ],
        region: '신주쿠/오사카'
    }
];