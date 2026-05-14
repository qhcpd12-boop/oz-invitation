import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'
import TemplateCoverImage from '../../components/TemplateCoverImage.jsx'

/** 청첩장 예시 — 모던 미니멀(화이트·블랙 타이포). props 기반 */
const DEFAULT_DATA = {
  groom: '박서준',
  bride: '최유진',
  date: '2026-05-24',
  time: '14:00',
  venue: '논현 라루체',
  address: '서울시 강남구 논현로 645',
  greeting:
    '두 사람이 서로의 존재를 알아본 그 순간부터\n오늘이 시작되었습니다.\n새로 시작하는 이 길에 함께해 주세요.',
  coverImage: '',
  greetingTitle: '소중한 분들을 초대합니다',
  greetingImage: '',
  endingImage: '',
  endingMessage: '',
  gallery: [],
}

const INK = '#0A0A0A'
const PAPER = '#FFFFFF'
const SOFT = '#F4F4F4'
const LINE = '#E5E5E5'
const MUTED = '#8A8A8A'

const SANS = "'Inter', 'Noto Sans KR', system-ui, sans-serif"
const KR = "'Noto Sans KR', sans-serif"

function GridLine() {
  return <Box sx={{ height: 1, background: INK, width: '100%' }} />
}

function TickLabel({ children }) {
  return (
    <Typography
      sx={{
        fontFamily: SANS,
        fontSize: 10,
        letterSpacing: '0.32em',
        fontWeight: 700,
        color: INK,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  )
}

function RowMinimal({ label, value }) {
  if (!value) return null
  return (
    <Stack direction="row" spacing={0} sx={{ borderBottom: `1px solid ${LINE}`, py: 1.5 }}>
      <Box sx={{ width: 80 }}>
        <Typography sx={{ fontFamily: SANS, fontSize: 10, letterSpacing: '0.28em', fontWeight: 700, color: MUTED, textTransform: 'uppercase' }}>
          {label}
        </Typography>
      </Box>
      <Typography sx={{ flex: 1, fontFamily: KR, fontSize: 14, color: INK, lineHeight: 1.6 }}>
        {value}
      </Typography>
    </Stack>
  )
}

export default function ExampleModernMinimal({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)
  const numeric = formatNumericDate(w.date)
  const dayName = formatDayName(w.date)

  return (
    <Box sx={{ minHeight: '100vh', background: SOFT, py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: 0,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: PAPER,
            border: `1px solid ${LINE}`,
          }}
        >
          {/* 커버 */}
          <Box sx={{ p: 4, pt: 5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 6 }}>
              <TickLabel>01 / Wedding</TickLabel>
              <TickLabel>{numeric}</TickLabel>
            </Stack>

            <Typography
              sx={{
                fontFamily: SANS,
                fontWeight: 900,
                fontSize: 44,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: INK,
                mb: 1,
              }}
            >
              WE&rsquo;RE<br />GETTING<br />MARRIED.
            </Typography>

            <Box sx={{ mt: 4, mb: 4 }}>
              <GridLine />
            </Box>

            <Stack spacing={0.5}>
              <Typography sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.32em', fontWeight: 700, color: MUTED, textTransform: 'uppercase' }}>
                Groom
              </Typography>
              <Typography sx={{ fontFamily: KR, fontWeight: 700, fontSize: 30, color: INK, letterSpacing: '-0.01em', lineHeight: 1 }}>
                {w.groom}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ my: 2.5 }}>
              <Box sx={{ flex: 1, height: 1, background: INK }} />
              <Typography sx={{ fontFamily: SANS, fontSize: 14, fontWeight: 700, color: INK }}>&amp;</Typography>
              <Box sx={{ flex: 1, height: 1, background: INK }} />
            </Stack>

            <Stack spacing={0.5}>
              <Typography sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.32em', fontWeight: 700, color: MUTED, textTransform: 'uppercase' }}>
                Bride
              </Typography>
              <Typography sx={{ fontFamily: KR, fontWeight: 700, fontSize: 30, color: INK, letterSpacing: '-0.01em', lineHeight: 1 }}>
                {w.bride}
              </Typography>
            </Stack>

            <TemplateCoverImage
              src={w.coverImage}
              sx={{
                mt: 4,
                borderRadius: 0,
                border: `1px solid ${LINE}`,
              }}
            />

            <Box sx={{ mt: 5, mb: 2 }}>
              <GridLine />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <Stack spacing={0.4}>
                <TickLabel>Date</TickLabel>
                <Typography sx={{ fontFamily: SANS, fontWeight: 900, fontSize: 32, lineHeight: 1, color: INK, letterSpacing: '-0.02em' }}>
                  {numeric}
                </Typography>
                <Typography sx={{ fontFamily: SANS, fontSize: 11, letterSpacing: '0.28em', color: MUTED, textTransform: 'uppercase' }}>
                  {dayName}
                </Typography>
              </Stack>
              <Stack spacing={0.4} alignItems="flex-end">
                <TickLabel>Venue</TickLabel>
                <Typography sx={{ fontFamily: KR, fontSize: 13, fontWeight: 700, color: INK, textAlign: 'right' }}>
                  {w.venue}
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ height: 8, background: INK }} />

          <CardContent sx={{ p: 4 }}>
            <Stack spacing={5}>
              {/* 인사말 */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <TickLabel>02 / Greeting</TickLabel>
                  <Typography sx={{ fontFamily: SANS, fontSize: 10, color: MUTED, letterSpacing: '0.28em' }}>
                    INVITATION
                  </Typography>
                </Stack>
                <GridLine />
                <Typography
                  sx={{
                    mt: 3,
                    whiteSpace: 'pre-line',
                    fontFamily: KR,
                    color: INK,
                    fontSize: 14.5,
                    lineHeight: 2,
                  }}
                >
                  {w.greeting}
                </Typography>
                <TemplateCoverImage src={w.greetingImage} alt="인사말 사진" aspectRatio="4 / 3" sx={{ mt: 3, borderRadius: 0, border: `1px solid ${LINE}` }} />
              </Box>

              {/* 예식 안내 */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <TickLabel>03 / Details</TickLabel>
                  <Typography sx={{ fontFamily: SANS, fontSize: 10, color: MUTED, letterSpacing: '0.28em' }}>
                    THE DAY
                  </Typography>
                </Stack>
                <GridLine />
                <Stack mt={1}>
                  <RowMinimal label="When" value={dateStr} />
                  <RowMinimal label="Where" value={w.venue} />
                  <RowMinimal label="Address" value={w.address} />
                </Stack>
              </Box>

              {/* 오시는 길 */}
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <TickLabel>04 / Map</TickLabel>
                  <Typography sx={{ fontFamily: SANS, fontSize: 10, color: MUTED, letterSpacing: '0.28em' }}>
                    DIRECTIONS
                  </Typography>
                </Stack>
                <GridLine />
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    background: SOFT,
                    border: `1px solid ${LINE}`,
                    display: 'grid',
                    placeItems: 'center',
                    color: MUTED,
                    fontFamily: SANS,
                    fontSize: 11,
                    letterSpacing: '0.28em',
                  }}
                >
                  MAP COMING SOON
                </Box>
              </Box>

              {/* 갤러리 */}
              {!!w.gallery?.length && (
                <Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <TickLabel>05 / Gallery</TickLabel>
                    <Typography sx={{ fontFamily: SANS, fontSize: 10, color: MUTED, letterSpacing: '0.28em' }}>
                      MEMORIES
                    </Typography>
                  </Stack>
                  <GridLine />
                  <Stack direction="row" spacing={1} mt={2} sx={{ overflowX: 'auto', pb: 0.5 }}>
                    {w.gallery.slice(0, 6).map((src, i) => (
                      <Box
                        key={`${src.slice(0, 24)}-${i}`}
                        component="img"
                        src={src}
                        alt={`gallery-${i + 1}`}
                        sx={{
                          width: 108,
                          height: 108,
                          flex: '0 0 auto',
                          objectFit: 'cover',
                          border: `1px solid ${LINE}`,
                          borderRadius: 0,
                          filter: 'grayscale(0.15)',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {/* 푸터 */}
              <Box>
                <GridLine />
                <TemplateCoverImage src={w.endingImage} alt="엔딩 사진" aspectRatio="4 / 3" sx={{ mt: 3, mb: 2.5, borderRadius: 0, border: `1px solid ${LINE}` }} />
                {w.endingMessage && (
                  <Typography sx={{ whiteSpace: 'pre-line', fontFamily: KR, color: INK, fontSize: 14.5, lineHeight: 2, mb: 2.5 }}>
                    {w.endingMessage}
                  </Typography>
                )}
                <Stack direction="row" justifyContent="space-between" sx={{ pt: 2 }}>
                  <Typography sx={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, letterSpacing: '0.28em', color: INK }}>
                    {w.groom.toUpperCase()} &times; {w.bride.toUpperCase()}
                  </Typography>
                  <Typography sx={{ fontFamily: SANS, fontSize: 11, color: MUTED, letterSpacing: '0.28em' }}>
                    {numeric}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', mt: 3, color: MUTED, fontFamily: SANS, letterSpacing: '0.28em', fontSize: 10 }}
        >
          예시 디자인 · 모던 미니멀 · 오즈청첩장
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

function formatNumericDate(date) {
  if (!date) return ''
  try {
    const d = new Date(`${date}T00:00:00`)
    if (Number.isNaN(d.getTime())) return ''
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const yy = String(d.getFullYear()).slice(-2)
    return `${mm}.${dd}.${yy}`
  } catch {
    return ''
  }
}

function formatDayName(date) {
  if (!date) return ''
  try {
    const d = new Date(`${date}T00:00:00`)
    if (Number.isNaN(d.getTime())) return ''
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
    return days[d.getDay()]
  } catch {
    return ''
  }
}
