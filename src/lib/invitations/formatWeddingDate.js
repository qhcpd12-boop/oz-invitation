/** 예식 일시 표기 (한국어) */
export function formatKoreanDate(date, time) {
  if (!date) return ''
  try {
    const d = new Date(`${date}T${time || '00:00'}:00`)
    if (Number.isNaN(d.getTime())) return `${date} ${time || ''}`.trim()
    const yy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const dow = days[d.getDay()]
    const hh = d.getHours()
    const mi = String(d.getMinutes()).padStart(2, '0')
    return `${yy}년 ${mm}월 ${dd}일 (${dow}) ${time ? `${hh}시 ${mi}분` : ''}`.trim()
  } catch {
    return `${date} ${time || ''}`.trim()
  }
}
