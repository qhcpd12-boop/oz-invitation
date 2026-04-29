/**
 * 서버 측 템플릿 + 가격 단일 출처.
 * 결제 금액은 반드시 서버가 templateId 기준으로 결정한다.
 */
export const TEMPLATES = {
  'luxury-noir': { name: '럭셔리 누아르', amount: 19900, currency: 'krw' },
  'romantic-rose': { name: '로맨틱 로즈', amount: 19900, currency: 'krw' },
  'modern-minimal': { name: '모던 미니멀', amount: 19900, currency: 'krw' },
  'garden-bloom': { name: '가든 블룸', amount: 19900, currency: 'krw' },
  'classic-letter': { name: '클래식 편지', amount: 19900, currency: 'krw' },
  'midnight-blue': { name: '미드나잇 블루', amount: 19900, currency: 'krw' },
}

export function resolveTemplate(id) {
  return TEMPLATES[id] || null
}

