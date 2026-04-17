/**
 * 1차 디자인 템플릿(JSON 목업).
 *  - 추후 Firestore `templates` 컬렉션으로 옮길 수 있다.
 */
export const TEMPLATES = [
  {
    id: 'luxury-noir',
    name: '럭셔리 누아르',
    style: '검정·골드',
    mockup: 'luxury',
    badge: '인기',
    plans: ['standard', 'premium'],
  },
  {
    id: 'romantic-rose',
    name: '로맨틱 로즈',
    style: '블러시·로즈골드',
    mockup: 'classic',
    badge: 'BEST',
    plans: ['light', 'standard', 'premium'],
  },
  {
    id: 'modern-minimal',
    name: '모던 미니멀',
    style: '화이트·블랙 타이포',
    mockup: 'classic',
    plans: ['light', 'standard', 'premium'],
  },
  {
    id: 'garden-bloom',
    name: '가든 블룸',
    style: '플로럴·연그린',
    mockup: 'garden',
    badge: 'NEW',
    plans: ['standard', 'premium'],
  },
  {
    id: 'classic-letter',
    name: '클래식 편지',
    style: '아이보리·세리프',
    mockup: 'classic',
    plans: ['light', 'standard', 'premium'],
  },
  {
    id: 'midnight-blue',
    name: '미드나잇 블루',
    style: '딥블루·실버',
    mockup: 'luxury',
    plans: ['premium'],
  },
]

export function getTemplateById(id) {
  return TEMPLATES.find((t) => t.id === id) || null
}
