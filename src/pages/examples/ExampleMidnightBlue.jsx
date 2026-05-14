import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'
import TemplateCoverImage from '../../components/TemplateCoverImage.jsx'

/** 청첩장 예시 — 미드나잇 블루(딥블루·실버, 별·달 모티프). props 기반 */
const DEFAULT_DATA = {
  groom: '박서준',
  bride: '최유진',
  date: '2026-11-15',
  time: '18:30',
  venue: '잠실 시그니엘 그랜드볼룸',
  address: '서울시 송파구 올림픽로 300',
  greeting:
    '같은 하늘 아래 만난 두 사람이\n별이 가득한 이 밤,\n새로운 이야기를 시작합니다.\n저희의 첫 챕터에 함께해 주세요.',
  coverImage: '',
  greetingTitle: '소중한 분들을 초대합니다',
  greetingImage: '',
  endingImage: '',
  endingMessage: '',
  gallery: [],
}

const BG_DEEP = '#050B1F'
const BG_MID = '#0B1A3A'
const BG_TOP = '#142850'
const CARD = '#0A1430'
const CARD_INNER = '#0F1A38'
const SILVER = '#D6DFEE'
const SILVER_BRIGHT = '#EDF1F8'
const SILVER_DEEP = '#8B97AE'
const ACCENT = '#9DB2D6'
const MUTED = 'rgba(214, 223, 238, 0.55)'

const SERIF = "'Cormorant Garamond', 'Noto Serif KR', serif"
const SERIF_KR = "'Noto Serif KR', serif"

function StarField({ count = 24, opacity = 0.7 }) {
  // 결정적 의사난수 좌표 — 매 렌더 다른 별이 보이지 않도록 시드 기반.
  const stars = Array.from({ length: count }, (_, i) => {
    const x = ((i * 53) % 100)
    const y = ((i * 91) % 100)
    const r = (i % 3 === 0) ? 1.4 : (i % 3 === 1) ? 0.9 : 0.5
    const o = 0.4 + ((i * 17) % 60) / 100
    return { x, y, r, o }
  })
  return (
    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.3} fill={SILVER_BRIGHT} opacity={s.o} />
        ))}
      </svg>
    </Box>
  )
}

function CrescentMoon({ size = 56 }) {
  return (
    <Box sx={{ display: 'inline-flex', lineHeight: 0 }}>
      <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={SILVER_BRIGHT} stopOpacity="0.4" />
            <stop offset="100%" stopColor={SILVER_BRIGHT} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="moon-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={SILVER_BRIGHT} />
            <stop offset="100%" stopColor={ACCENT} />
          </linearGradient>
        </defs>
        <circle cx="28" cy="28" r="26" fill="url(#moon-glow)" />
        <path d="M28 8 A20 20 0 1 0 28 48 A15 17 0 1 1 28 8 Z" fill="url(#moon-body)" />
        <circle cx="22" cy="22" r="1.4" fill={ACCENT} opacity="0.35" />
        <circle cx="20" cy="32" r="1" fill={ACCENT} opacity="0.3" />
        <circle cx="26" cy="36" r="0.8" fill={ACCENT} opacity="0.3" />
      </svg>
    </Box>
  )
}

function StarSpark({ size = 14, color = SILVER }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0 L8 6 L14 7 L8 8 L7 14 L6 8 L0 7 L6 6 Z" fill={color} />
    </svg>
  )
}

function SilverDivider({ width = 140 }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
      <svg width={width} height="14" viewBox="0 0 140 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="7" x2="58" y2="7" stroke={SILVER_DEEP} strokeWidth="0.7" />
        <path d="M70 1 L71.5 5.5 L76 7 L71.5 8.5 L70 13 L68.5 8.5 L64 7 L68.5 5.5 Z" fill={SILVER} />
        <line x1="82" y1="7" x2="140" y2="7" stroke={SILVER_DEEP} strokeWidth="0.7" />
      </svg>
    </Box>
  )
}

function TitleMidnight({ children, subtitle }) {
  return (
    <Stack alignItems="center" spacing={0.5}>
      {subtitle && (
        <Typography
          sx={{
            fontFamily: SERIF,
            fontStyle: 'italic',
            fontSize: 12,
            color: ACCENT,
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
          color: SILVER_BRIGHT,
        }}
      >
        {children}
      </Typography>
    </Stack>
  )
}

function RowMidnight({ label, value }) {
  if (!value) return null
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="baseline"
      sx={{ borderBottom: `1px dotted ${SILVER_DEEP}66`, pb: 1.25 }}
    >
      <Typography sx={{ width: 60, color: ACCENT, fontSize: 11, letterSpacing: '0.28em', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography sx={{ flex: 1, color: SILVER_BRIGHT, fontSize: 14, textAlign: 'right', letterSpacing: '0.02em' }}>
        {value}
      </Typography>
    </Stack>
  )
}

export default function ExampleMidnightBlue({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)
  const englishDate = formatEnglishDate(w.date)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at top, ${BG_TOP} 0%, ${BG_MID} 40%, ${BG_DEEP} 100%)`,
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.md}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: CARD,
            border: `1px solid ${SILVER_DEEP}33`,
          }}
        >
          {/* 커버 — 별이 가득한 밤하늘 */}
          <Box
            sx={{
              position: 'relative',
              py: 6,
              px: 3,
              textAlign: 'center',
              background: `linear-gradient(180deg, ${BG_TOP} 0%, ${BG_MID} 60%, ${CARD} 100%)`,
              overflow: 'hidden',
            }}
          >
            <StarField count={28} />
            <Box sx={{ position: 'absolute', top: 24, right: 24 }}>
              <CrescentMoon size={56} />
            </Box>

            <Box sx={{ position: 'relative', zIndex: 1, pt: 1 }}>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 14,
                  letterSpacing: '0.4em',
                  color: ACCENT,
                  textTransform: 'uppercase',
                  mb: 0.5,
                }}
              >
                Under the Stars
              </Typography>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontSize: 11,
                  letterSpacing: '0.55em',
                  color: SILVER_DEEP,
                  textTransform: 'uppercase',
                  mb: 4,
                }}
              >
                Wedding Invitation
              </Typography>

              <Typography sx={{ fontFamily: SERIF_KR, fontSize: 36, fontWeight: 700, color: SILVER_BRIGHT, lineHeight: 1.1 }}>
                {w.groom}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 1.5 }}>
                <StarSpark size={20} color={SILVER} />
              </Box>
              <Typography sx={{ fontFamily: SERIF_KR, fontSize: 36, fontWeight: 700, color: SILVER_BRIGHT, lineHeight: 1.1 }}>
                {w.bride}
              </Typography>

              <SilverDivider width={160} />

              <Typography sx={{ color: SILVER, fontSize: 14, letterSpacing: '0.05em' }}>
                {dateStr}
              </Typography>
              <Typography
                sx={{
                  fontFamily: SERIF,
                  fontStyle: 'italic',
                  fontSize: 12,
                  color: ACCENT,
                  letterSpacing: '0.32em',
                  mt: 0.5,
                }}
              >
                {englishDate}
              </Typography>
              <TemplateCoverImage
                src={w.coverImage}
                sx={{
                  mt: 3.5,
                  borderRadius: `${radii.sm}px`,
                  border: `1px solid ${SILVER_DEEP}55`,
                  boxShadow: '0 18px 34px rgba(0,0,0,0.32)',
                }}
              />
            </Box>
          </Box>

          <CardContent sx={{ p: 4, background: CARD, position: 'relative', overflow: 'hidden' }}>
            <StarField count={16} opacity={0.35} />

            <Stack spacing={4.5} sx={{ position: 'relative', zIndex: 1 }}>
              {/* 인사말 */}
              <Box sx={{ textAlign: 'center' }}>
                <TitleMidnight subtitle="Greeting">인사말</TitleMidnight>
                <SilverDivider width={80} />
                <Typography
                  sx={{
                    whiteSpace: 'pre-line',
                    fontFamily: SERIF_KR,
                    color: SILVER_BRIGHT,
                    lineHeight: 2.1,
                    fontSize: 14.5,
                  }}
                >
                  {w.greeting}
                </Typography>
                <TemplateCoverImage src={w.greetingImage} alt="인사말 사진" aspectRatio="4 / 3" sx={{ mt: 3, borderRadius: `${radii.sm}px`, border: `1px solid ${SILVER_DEEP}55` }} />
                <Typography
                  sx={{
                    mt: 3,
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: ACCENT,
                    letterSpacing: '0.2em',
                  }}
                >
                  Under the stars, together.
                </Typography>
              </Box>

              <Box sx={{ height: 1, background: `linear-gradient(90deg, transparent, ${SILVER_DEEP}77, transparent)` }} />

              {/* 예식 안내 */}
              <Box>
                <TitleMidnight subtitle="Ceremony">예식 안내</TitleMidnight>
                <Stack
                  spacing={1.5}
                  mt={3}
                  sx={{
                    background: CARD_INNER,
                    border: `1px solid ${SILVER_DEEP}22`,
                    borderRadius: `${radii.sm}px`,
                    p: 2.5,
                  }}
                >
                  <RowMidnight label="DATE" value={dateStr} />
                  <RowMidnight label="VENUE" value={w.venue} />
                  <RowMidnight label="ADDRESS" value={w.address} />
                </Stack>
              </Box>

              <Box sx={{ height: 1, background: `linear-gradient(90deg, transparent, ${SILVER_DEEP}77, transparent)` }} />

              {/* 오시는 길 */}
              <Box>
                <TitleMidnight subtitle="Directions">오시는 길</TitleMidnight>
                <Box
                  sx={{
                    mt: 2.5,
                    height: 160,
                    borderRadius: `${radii.sm}px`,
                    border: `1px dashed ${SILVER_DEEP}77`,
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
                  <Box sx={{ height: 1, background: `linear-gradient(90deg, transparent, ${SILVER_DEEP}77, transparent)` }} />
                  <Box>
                    <TitleMidnight subtitle="Gallery">갤러리</TitleMidnight>
                    <Stack direction="row" spacing={1.5} mt={2.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
                      {w.gallery.slice(0, 6).map((src, i) => (
                        <Box
                          key={`${src.slice(0, 24)}-${i}`}
                          sx={{
                            position: 'relative',
                            flex: '0 0 auto',
                            width: 108,
                            height: 108,
                            p: '2px',
                            borderRadius: `${radii.sm}px`,
                            background: `linear-gradient(135deg, ${SILVER_BRIGHT} 0%, ${ACCENT} 50%, ${SILVER_DEEP} 100%)`,
                          }}
                        >
                          <Box
                            component="img"
                            src={src}
                            alt={`gallery-${i + 1}`}
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
                <TemplateCoverImage src={w.endingImage} alt="엔딩 사진" aspectRatio="4 / 3" sx={{ mb: 3, borderRadius: `${radii.sm}px`, border: `1px solid ${SILVER_DEEP}55` }} />
                <SilverDivider width={120} />
                {w.endingMessage && (
                  <Typography sx={{ whiteSpace: 'pre-line', color: SILVER_BRIGHT, fontSize: 14, lineHeight: 1.9, mb: 2 }}>
                    {w.endingMessage}
                  </Typography>
                )}
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 13,
                    color: ACCENT,
                    letterSpacing: '0.18em',
                  }}
                >
                  Forever, our universe
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontFamily: SERIF,
                    fontSize: 11,
                    color: SILVER_DEEP,
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
          예시 디자인 · 미드나잇 블루 · 오즈청첩장
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
