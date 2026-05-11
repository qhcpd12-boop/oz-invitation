import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'

/** 청첩장 예시 — 럭셔리 누아르(다크 + 골드, 5성급 호텔 인비테이션 톤). props 기반 */
const DEFAULT_DATA = {
  groom: '박서준',
  bride: '최유진',
  date: '2026-09-12',
  time: '15:30',
  venue: '그랜드 하얏트 서울 그랜드볼룸',
  address: '서울시 용산구 소월로 322',
  greeting:
    '저희 두 사람이 사랑으로 하나가 되는 자리에\n소중한 분들을 초대합니다.\n따뜻한 축복으로 함께해 주시면 감사하겠습니다.',
  gallery: [],
}

const GOLD = '#D4AF7A'
const GOLD_BRIGHT = '#E8C893'
const GOLD_DEEP = '#A88652'
const BG = '#0A0A0A'
const CARD = '#141414'
const CARD_INNER = '#1A1A1A'
const INK = 'rgba(255,255,255,0.92)'
const MUTED = 'rgba(255,255,255,0.55)'

const SERIF = "'Cormorant Garamond', 'Noto Serif KR', serif"
const SERIF_KR = "'Noto Serif KR', serif"

function MonogramMedal({ initials }) {
  const [a, b] = initials
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 1.5 }}>
      <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="medal-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GOLD_BRIGHT} />
            <stop offset="50%" stopColor={GOLD} />
            <stop offset="100%" stopColor={GOLD_DEEP} />
          </linearGradient>
        </defs>
        <circle cx="38" cy="38" r="36" stroke="url(#medal-ring)" strokeWidth="1.2" fill="none" />
        <circle cx="38" cy="38" r="32" stroke={GOLD} strokeWidth="0.4" fill="none" opacity="0.6" />
        <text x="22" y="44" fill={GOLD_BRIGHT} fontFamily="Cormorant Garamond, serif" fontSize="20" fontStyle="italic" textAnchor="middle" fontWeight="500">
          {a}
        </text>
        <text x="38" y="46" fill={GOLD} fontFamily="Cormorant Garamond, serif" fontSize="22" fontStyle="italic" textAnchor="middle">
          &amp;
        </text>
        <text x="54" y="44" fill={GOLD_BRIGHT} fontFamily="Cormorant Garamond, serif" fontSize="20" fontStyle="italic" textAnchor="middle" fontWeight="500">
          {b}
        </text>
      </svg>
    </Box>
  )
}

function GoldDivider({ width = 140 }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
      <svg width={width} height="14" viewBox="0 0 140 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="7" x2="58" y2="7" stroke={GOLD} strokeWidth="0.8" />
        <circle cx="64" cy="7" r="1.6" fill={GOLD} />
        <path d="M70 3 L74 7 L70 11 L66 7 Z" stroke={GOLD} strokeWidth="0.8" fill="none" />
        <circle cx="76" cy="7" r="1.6" fill={GOLD} />
        <line x1="82" y1="7" x2="140" y2="7" stroke={GOLD} strokeWidth="0.8" />
      </svg>
    </Box>
  )
}

function CornerOrnament({ corner = 'tl' }) {
  const transforms = {
    tl: 'rotate(0deg)',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1,-1)',
  }
  const positions = {
    tl: { top: 14, left: 14 },
    tr: { top: 14, right: 14 },
    bl: { bottom: 14, left: 14 },
    br: { bottom: 14, right: 14 },
  }
  return (
    <Box sx={{ position: 'absolute', ...positions[corner], transform: transforms[corner], lineHeight: 0, opacity: 0.85 }}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 18 L2 2 L18 2" stroke={GOLD} strokeWidth="0.8" fill="none" />
        <path d="M6 14 L6 6 L14 6" stroke={GOLD} strokeWidth="0.6" fill="none" opacity="0.7" />
        <circle cx="4" cy="4" r="1.4" fill={GOLD} />
      </svg>
    </Box>
  )
}

function DDayBadge({ targetDate }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const t = new Date(`${targetDate}T00:00:00`)
  if (Number.isNaN(t.getTime())) return null
  const diff = Math.round((t.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const label = diff > 0 ? `D-${diff}` : diff === 0 ? 'D-DAY' : 'WED'
  return (
    <Box
      sx={{
        display: 'inline-block',
        px: 2.5,
        py: 0.75,
        borderRadius: `${radii.pill}px`,
        background: `linear-gradient(135deg, ${GOLD_BRIGHT} 0%, ${GOLD} 50%, ${GOLD_DEEP} 100%)`,
        color: '#1A1A1A',
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.28em',
        boxShadow: '0 6px 18px rgba(212, 175, 122, 0.25)',
      }}
    >
      {label}
    </Box>
  )
}

function TitleLuxury({ children, subtitle }) {
  return (
    <Stack alignItems="center" spacing={0.5}>
      {subtitle && (
        <Typography
          sx={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 12,
            color: GOLD,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: SERIF_KR,
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '0.25em',
          color: GOLD_BRIGHT,
        }}
      >
        {children}
      </Typography>
    </Stack>
  )
}

function RowLuxury({ label, value }) {
  if (!value) return null
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="baseline"
      sx={{
        borderBottom: `1px dotted ${GOLD}55`,
        pb: 1.25,
      }}
    >
      <Typography sx={{ width: 56, color: GOLD, fontSize: 11, letterSpacing: '0.25em', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography sx={{ flex: 1, color: INK, fontSize: 14, textAlign: 'right', letterSpacing: '0.02em' }}>
        {value}
      </Typography>
    </Stack>
  )
}

function PinIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1.5C4.79 1.5 3 3.29 3 5.5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" stroke={GOLD} strokeWidth="1.1" fill={`${GOLD}22`} />
      <circle cx="7" cy="5.5" r="1.4" fill={GOLD} />
    </svg>
  )
}

export default function ExampleLuxuryNoir({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)
  const englishDate = formatEnglishDate(w.date)
  const initials = getInitials(w.groom, w.bride)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at top, #1a1510 0%, ${BG} 60%)`,
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.sm}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: CARD,
            border: `1px solid ${GOLD}33`,
          }}
        >
          {/* 커버 섹션 — 이중 골드 보더 */}
          <Box
            sx={{
              position: 'relative',
              py: 6,
              px: 3,
              textAlign: 'center',
              background: `linear-gradient(180deg, #15110C 0%, ${CARD} 100%)`,
            }}
          >
            {/* 외곽 골드 프레임 (이중) */}
            <Box
              sx={{
                position: 'absolute',
                inset: 12,
                border: `1px solid ${GOLD}55`,
                pointerEvents: 'none',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                inset: 18,
                border: `0.5px solid ${GOLD}33`,
                pointerEvents: 'none',
              }}
            />
            <CornerOrnament corner="tl" />
            <CornerOrnament corner="tr" />
            <CornerOrnament corner="bl" />
            <CornerOrnament corner="br" />

            <Box sx={{ position: 'relative', zIndex: 1, pt: 1 }}>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 13,
                  letterSpacing: '0.45em',
                  color: GOLD,
                  textTransform: 'uppercase',
                  mb: 0.5,
                }}
              >
                Save the Date
              </Typography>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontSize: 11,
                  letterSpacing: '0.55em',
                  color: GOLD_DEEP,
                  textTransform: 'uppercase',
                  mb: 4,
                }}
              >
                The Wedding Invitation
              </Typography>

              <Typography sx={{ fontFamily: SERIF_KR, fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                {w.groom}
              </Typography>

              <MonogramMedal initials={initials} />

              <Typography sx={{ fontFamily: SERIF_KR, fontSize: 36, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                {w.bride}
              </Typography>

              <GoldDivider width={160} />

              <Typography sx={{ color: INK, fontSize: 14, letterSpacing: '0.05em' }}>
                {dateStr}
              </Typography>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 12,
                  color: GOLD,
                  letterSpacing: '0.32em',
                  mt: 0.5,
                  mb: 3,
                }}
              >
                {englishDate}
              </Typography>

              <DDayBadge targetDate={w.date} />
            </Box>
          </Box>

          <CardContent sx={{ p: 4, background: CARD }}>
            <Stack spacing={4.5}>
              {/* 인사말 */}
              <Box sx={{ textAlign: 'center' }}>
                <TitleLuxury subtitle="Greeting">인사말</TitleLuxury>
                <GoldDivider width={80} />
                <Typography
                  sx={{
                    whiteSpace: 'pre-line',
                    fontFamily: SERIF_KR,
                    color: INK,
                    lineHeight: 2.1,
                    fontSize: 14.5,
                  }}
                >
                  {w.greeting}
                </Typography>
                <Typography
                  sx={{
                    mt: 3,
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 12,
                    color: GOLD,
                    letterSpacing: '0.18em',
                  }}
                >
                  Together with their families
                </Typography>
              </Box>

              <Box sx={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }} />

              {/* 예식 안내 */}
              <Box>
                <TitleLuxury subtitle="Ceremony">예식 안내</TitleLuxury>
                <Stack
                  spacing={1.5}
                  mt={3}
                  sx={{
                    background: CARD_INNER,
                    border: `1px solid ${GOLD}22`,
                    borderRadius: `${radii.sm}px`,
                    p: 2.5,
                  }}
                >
                  <RowLuxury label="DATE" value={dateStr} />
                  <RowLuxury label="VENUE" value={w.venue} />
                  <RowLuxury label="ADDRESS" value={w.address} />
                </Stack>
              </Box>

              <Box sx={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }} />

              {/* 오시는 길 */}
              <Box>
                <TitleLuxury subtitle="Directions">오시는 길</TitleLuxury>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={2.5}>
                  <PinIcon size={14} />
                  <Typography sx={{ color: INK, fontSize: 13.5, letterSpacing: '0.02em' }}>
                    {w.address}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    borderRadius: `${radii.sm}px`,
                    border: `1px dashed ${GOLD}55`,
                    background: CARD_INNER,
                    display: 'grid',
                    placeItems: 'center',
                    color: MUTED,
                    fontSize: 13,
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                  }}
                >
                  네이버 지도 (연동 예정)
                </Box>
              </Box>

              {/* 갤러리 */}
              {!!w.gallery?.length && (
                <>
                  <Box sx={{ height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }} />
                  <Box>
                    <TitleLuxury subtitle="Gallery">갤러리</TitleLuxury>
                    <Stack direction="row" spacing={1.5} mt={2.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
                      {w.gallery.slice(0, 6).map((src, index) => (
                        <Box
                          key={`${src.slice(0, 24)}-${index}`}
                          sx={{
                            position: 'relative',
                            flex: '0 0 auto',
                            width: 108,
                            height: 108,
                            p: '3px',
                            borderRadius: `${radii.sm}px`,
                            background: `linear-gradient(135deg, ${GOLD_BRIGHT} 0%, ${GOLD} 50%, ${GOLD_DEEP} 100%)`,
                          }}
                        >
                          <Box
                            component="img"
                            src={src}
                            alt={`gallery-${index + 1}`}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: `${radii.sm - 2}px`,
                              display: 'block',
                            }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </>
              )}

              {/* 푸터 */}
              <Box sx={{ textAlign: 'center', pt: 1 }}>
                <GoldDivider width={120} />
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: GOLD,
                    letterSpacing: '0.18em',
                  }}
                >
                  Together forever
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontFamily: SERIF,
                    fontSize: 11,
                    color: GOLD_DEEP,
                    letterSpacing: '0.45em',
                  }}
                >
                  {w.groom.toUpperCase()} &amp; {w.bride.toUpperCase()}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            mt: 3,
            color: MUTED,
            fontFamily: SERIF,
            fontStyle: 'italic',
            letterSpacing: '0.18em',
          }}
        >
          예시 템플릿 · 럭셔리 누아르 · 오즈청첩장
        </Typography>
      </Box>
    </Box>
  )
}

function mergeData(data) {
  if (!data) return DEFAULT_DATA
  const merged = { ...DEFAULT_DATA, gallery: [] }
  for (const key of Object.keys(DEFAULT_DATA)) {
    if (key === 'gallery') {
      if (Array.isArray(data.gallery) && data.gallery.length) merged.gallery = data.gallery
      continue
    }
    if (data[key]) merged[key] = data[key]
  }
  return merged
}

function getInitials(groom, bride) {
  const g = (groom || '').trim()
  const b = (bride || '').trim()
  // 한글이면 성+이름 합쳐 첫 글자, 영문이면 단순 첫 글자
  const first = /[A-Za-z]/.test(g) ? g[0].toUpperCase() : g.slice(-2, -1) || g[0] || 'M'
  const second = /[A-Za-z]/.test(b) ? b[0].toUpperCase() : b.slice(-2, -1) || b[0] || 'S'
  return [first, second]
}

function formatEnglishDate(date) {
  if (!date) return ''
  try {
    const d = new Date(`${date}T00:00:00`)
    if (Number.isNaN(d.getTime())) return ''
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  } catch {
    return ''
  }
}
