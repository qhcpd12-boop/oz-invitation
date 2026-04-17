/**
 * 서버 측 요금 정의 — 클라이언트 PLANS 와 동기화 유지.
 * 결제 금액은 반드시 서버에서 결정한다(클라이언트 값 신뢰 금지).
 */
export const PLANS = {
  light: { name: '오즈청첩장 — 라이트', amount: 9900, currency: 'krw' },
  standard: { name: '오즈청첩장 — 스탠다드', amount: 19900, currency: 'krw' },
  premium: { name: '오즈청첩장 — 프리미엄', amount: 39900, currency: 'krw' },
}

export function resolvePlan(id) {
  return PLANS[id] || null
}
