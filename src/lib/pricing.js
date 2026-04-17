/**
 * 요금제·애드온·비교표 단일 출처(화면설계서 5.9 반영).
 */
export const PLANS = [
  {
    id: 'light',
    name: '라이트',
    tagline: '가성비 초점 · 깔끔하게',
    price: 9900,
    priceLabel: '9,900',
    period: '예식일 기준 1개월 (총 2~3개월 유지)',
    features: [
      '기본 디자인 템플릿 5종',
      '사진 갤러리 (최대 15장)',
      '텍스트 방명록',
      '네이버 지도 연동',
      '카카오톡 공유',
      '모바일 최적화',
    ],
    bonus: { title: '📥 식후 다운로드', body: '텍스트 위주 다운로드 제공' },
    ctaLabel: '라이트 시작하기',
  },
  {
    id: 'standard',
    name: '스탠다드',
    tagline: '핵심 기능 · 베스트셀러',
    price: 19900,
    priceLabel: '19,900',
    period: '예식일 기준 3개월 (총 5~6개월 유지)',
    features: [
      '전체 프리미엄 디자인 템플릿',
      '사진 갤러리 (최대 30장)',
      '텍스트 방명록',
      '🎤 하객 음성 축하 메시지',
      '네이버 지도 연동',
      '카카오톡 공유',
      '모바일 최적화',
    ],
    bonus: {
      title: '📥 식후 다운로드 (ZIP 패키지)',
      body: '갤러리 사진 + 방명록 + 음성 MP3\n무료 다운로드 14일',
    },
    badge: '🔥 BEST',
    highlight: true,
    ctaLabel: '스탠다드 시작하기 →',
  },
  {
    id: 'premium',
    name: '프리미엄',
    tagline: '풀패키지 · 완벽 소장',
    price: 39900,
    priceLabel: '39,900',
    period: '예식일 기준 6개월 이상',
    features: [
      '스탠다드 모든 기능 포함',
      '사진 갤러리 무제한',
      '🎬 동영상 첨부 가능',
      '📊 RSVP 참석·식사 통계',
      '하객 음성 축하 메시지',
      '네이버 지도 연동',
      '카카오톡 공유',
    ],
    bonus: {
      title: '📥 풀 아카이브',
      body: '전체 데이터 ZIP + HTML 추출\n오프라인 열람 · 무료 30일',
    },
    ctaLabel: '프리미엄 시작하기',
  },
]

export const ADDONS = [
  { id: 'extend', icon: '📅', title: '기간 연장권', desc: '청첩장 게시 기간을 한 달 더 연장합니다.', price: 3900, unit: '/ 1개월' },
  { id: 'rearchive', icon: '🔄', title: '아카이브 재다운로드권', desc: '식후 다운로드 기간을 1회 더 활성화합니다.', price: 2900, unit: '/ 1회' },
]

export const COMPARE_COLUMNS = [
  { key: 'light', label: '라이트' },
  { key: 'standard', label: '스탠다드', highlight: true },
  { key: 'premium', label: '프리미엄' },
]

export const COMPARE_ROWS = [
  { label: '이용 기간', values: { light: '2~3개월', standard: '5~6개월', premium: '6개월+' } },
  { label: '디자인 템플릿', values: { light: '기본 5종', standard: '전체 프리미엄', premium: '전체 프리미엄' } },
  { label: '사진 갤러리', values: { light: '15장', standard: '30장', premium: '무제한' } },
  { label: '텍스트 방명록', values: { light: true, standard: true, premium: true } },
  { label: '음성 축하 메시지', values: { light: false, standard: true, premium: true } },
  { label: '동영상 첨부', values: { light: false, standard: false, premium: true } },
  { label: 'RSVP 참석 관리', values: { light: false, standard: false, premium: true } },
  { label: '식후 다운로드', values: { light: '텍스트만', standard: 'ZIP 풀패키지', premium: 'ZIP + HTML' } },
  { label: '오프라인 열람', values: { light: false, standard: false, premium: true } },
]

export function getPlanById(id) {
  return PLANS.find((p) => p.id === id) || null
}
