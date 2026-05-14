import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'
import TemplateCoverImage from '../../components/TemplateCoverImage.jsx'

/** 청첩장 예시 — 로맨틱 로즈(워터컬러 플로럴). props 기반 (빈 값이면 기본 데이터) */
const DEFAULT_DATA = {
  groom: '박서준',
  bride: '최유진',
  date: '2026-05-24',
  time: '13:00',
  venue: '더 채플 앳 청담',
  address: '서울시 강남구 청담동 21-7',
  greeting:
    '서로의 마음이 닿아 사랑이 되었고,\n그 사랑이 두 사람을 한 곳으로 이끌었습니다.\n저희가 시작하는 새로운 봄에\n귀한 걸음으로 함께해 주세요.',
  coverImage: '',
  greetingTitle: '소중한 분들을 초대합니다',
  greetingImage: '',
  endingImage: '',
  endingMessage: '',
  gallery: [],
}

const BLUSH_BG = '#FBF1ED'
const CARD_BG = '#FFFAF8'
const ROSE = '#C97A8C'
const ROSE_GOLD = '#C8A88F'
const ROSE_DEEP = '#A85470'
const INK = '#3A2A2E'
const MUTED = '#8E7A7D'

const SERIF = "'Cormorant Garamond', 'Noto Serif KR', serif"
const SCRIPT = "'Pinyon Script', 'Allura', 'Great Vibes', cursive"

function RoseSprig({ size = 72, flip = false }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        transform: flip ? 'scaleX(-1)' : 'none',
        opacity: 0.92,
        lineHeight: 0,
      }}
    >
      <svg width={size} height={size * 1.2} viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rose-bloom" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#F4C4CF" />
            <stop offset="55%" stopColor="#D88196" />
            <stop offset="100%" stopColor="#A85470" />
          </radialGradient>
          <radialGradient id="rose-bud" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#F7D6DE" />
            <stop offset="100%" stopColor="#C97A8C" />
          </radialGradient>
          <linearGradient id="leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8B89A" />
            <stop offset="100%" stopColor="#6E7F65" />
          </linearGradient>
        </defs>
        {/* Stem */}
        <path d="M30 22 Q28 40 22 60" stroke="#7A8A6E" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Lower leaf */}
        <path d="M22 50 Q10 48 6 38 Q14 38 22 50 Z" fill="url(#leaf-grad)" opacity="0.85" />
        <path d="M8 40 Q14 44 20 48" stroke="#5B6B52" strokeWidth="0.6" fill="none" opacity="0.5" />
        {/* Upper leaf */}
        <path d="M30 32 Q42 28 48 18 Q40 18 30 32 Z" fill="url(#leaf-grad)" opacity="0.85" />
        <path d="M44 20 Q38 26 32 30" stroke="#5B6B52" strokeWidth="0.6" fill="none" opacity="0.5" />
        {/* Rose bloom — layered petals */}
        <circle cx="30" cy="18" r="14" fill="url(#rose-bloom)" opacity="0.92" />
        <circle cx="30" cy="18" r="10" fill="url(#rose-bud)" opacity="0.88" />
        <path d="M30 10 Q24 16 26 22 Q30 18 30 10 Z" fill="#FFFFFF" opacity="0.18" />
        <path d="M28 14 Q24 18 26 22" stroke="#88394F" strokeWidth="0.6" fill="none" opacity="0.55" />
        <path d="M32 14 Q36 18 34 22" stroke="#88394F" strokeWidth="0.6" fill="none" opacity="0.55" />
        <circle cx="30" cy="18" r="3.5" fill="#88394F" opacity="0.55" />
        {/* Tiny bud */}
        <circle cx="46" cy="36" r="3" fill="url(#rose-bud)" opacity="0.9" />
        <path d="M46 39 Q47 44 50 47" stroke="#7A8A6E" strokeWidth="0.9" fill="none" />
      </svg>
    </Box>
  )
}

function LeafBranch({ width = 90 }) {
  return (
    <Box sx={{ display: 'inline-flex', lineHeight: 0 }}>
      <svg width={width} height={width * 0.32} viewBox="0 0 90 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="branch-leaf" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A8B89A" />
            <stop offset="100%" stopColor="#6E7F65" />
          </linearGradient>
        </defs>
        <path d="M2 15 Q22 13 45 15 Q68 17 88 15" stroke="#9AAA8C" strokeWidth="1" fill="none" />
        {[10, 22, 34, 56, 68, 80].map((x, i) => (
          <path
            key={x}
            d={`M${x} 15 Q${x + 3} ${i % 2 === 0 ? 6 : 24} ${x + 7} ${i % 2 === 0 ? 8 : 22} Q${x + 5} 15 ${x} 15 Z`}
            fill="url(#branch-leaf)"
            opacity="0.85"
          />
        ))}
      </svg>
    </Box>
  )
}

function PinIcon({ size = 14, color = ROSE }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 1.5C4.79 1.5 3 3.29 3 5.5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" stroke={color} strokeWidth="1.2" fill={`${color}22`} />
      <circle cx="7" cy="5.5" r="1.4" fill={color} />
    </svg>
  )
}

function CountdownChip({ targetDate }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const t = new Date(`${targetDate}T00:00:00`)
  if (Number.isNaN(t.getTime())) return null
  const diff = Math.round((t.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const label = diff > 0 ? `D-${diff}` : diff === 0 ? 'D-DAY' : 'with love'
  return (
    <Box
      sx={{
        display: 'inline-block',
        px: 2,
        py: 0.6,
        borderRadius: `${radii.pill}px`,
        background: `linear-gradient(135deg, ${ROSE} 0%, ${ROSE_DEEP} 100%)`,
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.2em',
        boxShadow: '0 4px 14px rgba(168, 84, 112, 0.25)',
      }}
    >
      {label}
    </Box>
  )
}

function TitleRose({ children, subtitle }) {
  return (
    <Stack alignItems="center" spacing={0.5}>
      {subtitle && (
        <Typography
          sx={{
            fontFamily: SCRIPT,
            fontSize: 22,
            color: ROSE,
            lineHeight: 1,
          }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: SERIF,
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: '0.22em',
          color: ROSE_DEEP,
          textTransform: 'none',
        }}
      >
        {children}
      </Typography>
    </Stack>
  )
}

function RowRose({ label, value }) {
  if (!value) return null
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="baseline"
      sx={{
        borderBottom: `1px dashed ${ROSE_GOLD}66`,
        pb: 1.25,
      }}
    >
      <Typography sx={{ width: 56, color: ROSE_GOLD, fontSize: 12, letterSpacing: '0.16em', fontWeight: 700 }}>
        {label}
      </Typography>
      <Typography sx={{ flex: 1, color: INK, fontSize: 14, lineHeight: 1.7 }}>{value}</Typography>
    </Stack>
  )
}

function DotsDivider() {
  return (
    <Typography sx={{ color: ROSE, letterSpacing: '0.6em', fontSize: 10, textAlign: 'center', my: 1.5 }}>
      ·&nbsp;&nbsp;·&nbsp;&nbsp;·
    </Typography>
  )
}

export default function ExampleRomanticRose({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)
  const englishDate = formatEnglishDate(w.date)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(180deg, ${BLUSH_BG} 0%, #F7E6E2 100%)`,
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.lg}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: CARD_BG,
            border: `1px solid ${ROSE_GOLD}33`,
          }}
        >
          {/* 커버 섹션 */}
          <Box
            sx={{
              position: 'relative',
              pt: 5,
              pb: 4,
              px: 3,
              textAlign: 'center',
              background: `linear-gradient(180deg, ${BLUSH_BG} 0%, ${CARD_BG} 70%, ${BLUSH_BG} 100%)`,
              overflow: 'hidden',
            }}
          >
            {/* Top-left rose */}
            <Box sx={{ position: 'absolute', top: 8, left: 8, opacity: 0.85 }}>
              <RoseSprig size={64} />
            </Box>
            {/* Bottom-right rose mirrored */}
            <Box sx={{ position: 'absolute', bottom: 8, right: 8, opacity: 0.85, transform: 'rotate(180deg)' }}>
              <RoseSprig size={64} />
            </Box>

            <Typography
              sx={{
                fontFamily: SCRIPT,
                fontSize: 30,
                color: ROSE,
                lineHeight: 1,
                mb: 1,
              }}
            >
              you're cordially invited
            </Typography>

            <Typography
              sx={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 13,
                color: MUTED,
                letterSpacing: '0.35em',
                mb: 3.5,
                textTransform: 'uppercase',
              }}
            >
              to celebrate our wedding
            </Typography>

            <Typography sx={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, color: INK, lineHeight: 1.15 }}>
              {w.groom}
            </Typography>
            <Typography
              sx={{
                fontFamily: SCRIPT,
                fontSize: 38,
                color: ROSE_DEEP,
                lineHeight: 1,
                my: 0.5,
              }}
            >
              &amp;
            </Typography>
            <Typography sx={{ fontFamily: SERIF, fontSize: 34, fontWeight: 600, color: INK, lineHeight: 1.15 }}>
              {w.bride}
            </Typography>

            <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'center' }}>
              <LeafBranch width={120} />
            </Box>

            <Typography sx={{ color: INK, fontSize: 14, letterSpacing: '0.04em', mb: 0.5 }}>
              {dateStr}
            </Typography>
            <Typography
              sx={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 13,
                color: MUTED,
                letterSpacing: '0.18em',
                mb: 2.5,
              }}
            >
              {englishDate}
            </Typography>

            <CountdownChip targetDate={w.date} />
            <TemplateCoverImage
              src={w.coverImage}
              sx={{
                mt: 3,
                border: `1px solid ${ROSE_GOLD}55`,
                boxShadow: '0 16px 34px rgba(168,84,112,0.18)',
              }}
            />
          </Box>

          {/* 내용 섹션 */}
          <CardContent sx={{ p: 4, background: CARD_BG }}>
            <Stack spacing={4}>
              {/* 인사말 */}
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <LeafBranch width={90} />
                </Box>
                <TitleRose subtitle="Greeting">인사말</TitleRose>
                <DotsDivider />
                <Typography
                  sx={{
                    whiteSpace: 'pre-line',
                    color: INK,
                    fontSize: 14.5,
                    lineHeight: 2,
                    fontFamily: '"Noto Serif KR", serif',
                  }}
                >
                  {w.greeting}
                </Typography>
                <TemplateCoverImage src={w.greetingImage} alt="인사말 사진" aspectRatio="4 / 3" sx={{ mt: 3, border: `1px solid ${ROSE_GOLD}44` }} />
                <DotsDivider />
              </Box>

              {/* 예식 안내 */}
              <Box>
                <TitleRose subtitle="Wedding Day">예식 안내</TitleRose>
                <Stack spacing={1.5} mt={2.5}>
                  <RowRose label="일시" value={dateStr} />
                  <RowRose label="장소" value={w.venue} />
                  <RowRose label="주소" value={w.address} />
                </Stack>
              </Box>

              {/* 오시는 길 */}
              <Box>
                <TitleRose subtitle="Directions">오시는 길</TitleRose>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mt={2}>
                  <PinIcon size={14} color={ROSE} />
                  <Typography sx={{ color: INK, fontSize: 13.5 }}>{w.address}</Typography>
                </Stack>
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    borderRadius: `${radii.md}px`,
                    background: `linear-gradient(135deg, ${BLUSH_BG} 0%, ${CARD_BG} 100%)`,
                    border: `1px dashed ${ROSE_GOLD}66`,
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
                <Box>
                  <TitleRose subtitle="Our Story">갤러리</TitleRose>
                  <Stack direction="row" spacing={1.25} mt={2.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
                    {w.gallery.slice(0, 6).map((src, index) => (
                      <Box
                        key={`${src.slice(0, 24)}-${index}`}
                        component="img"
                        src={src}
                        alt={`gallery-${index + 1}`}
                        sx={{
                          width: 112,
                          height: 112,
                          flex: '0 0 auto',
                          objectFit: 'cover',
                          borderRadius: `${radii.lg}px`,
                          border: `1px solid ${ROSE_GOLD}80`,
                          boxShadow: `0 6px 18px rgba(168, 84, 112, 0.12)`,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* 푸터 */}
              <Box sx={{ textAlign: 'center', pt: 1 }}>
                <TemplateCoverImage src={w.endingImage} alt="엔딩 사진" aspectRatio="4 / 3" sx={{ mb: 3, border: `1px solid ${ROSE_GOLD}44` }} />
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
                  <RoseSprig size={56} />
                </Box>
                {w.endingMessage && (
                  <Typography sx={{ whiteSpace: 'pre-line', color: INK, fontSize: 14, lineHeight: 1.9, mb: 2 }}>
                    {w.endingMessage}
                  </Typography>
                )}
                <Typography sx={{ fontFamily: SCRIPT, fontSize: 28, color: ROSE }}>
                  with love
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 11,
                    color: MUTED,
                    letterSpacing: '0.2em',
                    mt: 0.5,
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
          sx={{ display: 'block', textAlign: 'center', mt: 3, color: MUTED, fontFamily: SERIF, fontStyle: 'italic' }}
        >
          예시 디자인 · 로맨틱 로즈 · 오즈청첩장
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
    const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    return `${weekdays[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
  } catch {
    return ''
  }
}
