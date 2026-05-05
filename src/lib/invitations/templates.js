/**
 * 1차 디자인 템플릿(JSON 목업).
 *  - 추후 Firestore `templates` 컬렉션으로 옮길 수 있다.
 *  - price는 표시용. 결제 금액의 권위적 소스는 서버(api/_lib/templates.js).
 */
export const UNIFORM_PRICE = 19900

export const TEMPLATES = [
  {
    id: 'luxury-noir',
    name: '럭셔리 누아르',
    style: '검정·골드',
    mockup: 'luxury',
    badge: '인기',
    price: UNIFORM_PRICE,
  },
  {
    id: 'romantic-rose',
    name: '로맨틱 로즈',
    style: '블러시·로즈골드',
    mockup: 'classic',
    badge: 'BEST',
    price: UNIFORM_PRICE,
  },
  {
    id: 'modern-minimal',
    name: '모던 미니멀',
    style: '화이트·블랙 타이포',
    mockup: 'classic',
    price: UNIFORM_PRICE,
  },
  {
    id: 'garden-bloom',
    name: '가든 블룸',
    style: '플로럴·연그린',
    mockup: 'garden',
    badge: 'NEW',
    price: UNIFORM_PRICE,
  },
  {
    id: 'classic-letter',
    name: '클래식 편지',
    style: '아이보리·세리프',
    mockup: 'classic',
    price: UNIFORM_PRICE,
  },
  {
    id: 'midnight-blue',
    name: '미드나잇 블루',
    style: '딥블루·실버',
    mockup: 'luxury',
    price: UNIFORM_PRICE,
  },
  {
    id: 'modern-natural',
    name: '모던 내추럴',
    style: '사진·내추럴 화이트',
    mockup: 'natural',
    badge: 'NEW',
    price: UNIFORM_PRICE,
  },
  {
    id: 'vintage-illust',
    name: '빈티지 일러스트',
    style: '화이트·빈티지 라인아트',
    mockup: 'vintage',
    badge: 'NEW',
    price: UNIFORM_PRICE,
  },
]

export function getTemplateById(id) {
  return TEMPLATES.find((t) => t.id === id) || null
}
