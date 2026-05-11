import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'

/** 청첩장 예시 — 클래식 편지(아이보리·세리프, 봉투/편지 메타포). props 기반 */
const DEFAULT_DATA = {
  groom: '박서준',
  bride: '최유진',
  date: '2026-06-08',
  time: '12:00',
  venue: '신라호텔 영빈관',
  address: '서울시 중구 동호로 249',
  greeting:
    '오랜 시간 함께 걸어온 두 사람이\n이제 한 길을 걷고자 합니다.\n새로 쓰일 이 편지의 첫 장에\n귀한 걸음으로 와 주세요.',
  gallery: [],
}

const IVORY = '#F5EFE3'
const PAPER = '#FDFAF1'
const INK = '#3A2E22'
const BROWN = '#8B6F47'
const GOLD = '#BFA682'
const MUTED = '#9C8E78'

const SERIF = "'Cormorant Garamond', 'Noto Serif KR', serif"
const KR_SERIF = "'Noto Serif KR', serif"
const SCRIPT = "'Pinyon Script', cursive"

function Stamp() {
  return (
    <Box sx={{ display: 'inline-flex', lineHeight: 0 }}>
      <svg width="58" height="74" viewBox="0 0 58 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Perforated edge */}
        <rect x="3" y="3" width="52" height="68" rx="2" fill="#FAF5E8" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 2" />
        {/* Inner frame */}
        <rect x="8" y="8" width="42" height="58" fill="none" stroke={BROWN} strokeWidth="0.6" />
        {/* Floral motif inside */}
        <circle cx="29" cy="28" r="9" fill="none" stroke={BROWN} strokeWidth="0.8" />
        <path d="M29 19 Q34 24 29 28 Q24 24 29 19" fill={GOLD} opacity="0.6" />
        <path d="M22 28 Q24 33 29 32 Q24 27 22 28" fill={BROWN} opacity="0.4" />
        <path d="M36 28 Q34 33 29 32 Q34 27 36 28" fill={BROWN} opacity="0.4" />
        <text x="29" y="50" fill={INK} fontFamily="Cormorant Garamond, serif" fontSize="7" textAnchor="middle" letterSpacing="1">WEDDING</text>
        <text x="29" y="60" fill={BROWN} fontFamily="Cormorant Garamond, serif" fontSize="6" textAnchor="middle" fontStyle="italic">est. 2026</text>
      </svg>
    </Box>
  )
}

function PostalSeal() {
  return (
    <Box sx={{ display: 'inline-flex', lineHeight: 0, transform: 'rotate(-12deg)' }}>
      <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="37" cy="37" r="34" fill="none" stroke={BROWN} strokeWidth="1.2" opacity="0.75" />
        <circle cx="37" cy="37" r="28" fill="none" stroke={BROWN} strokeWidth="0.6" opacity="0.5" />
        <path
          id="seal-curve"
          d="M 37,37 m -22,0 a 22,22 0 1,1 44,0 a 22,22 0 1,1 -44,0"
          fill="none"
        />
        <text fill={BROWN} fontFamily="Cormorant Garamond, serif" fontSize="6.5" letterSpacing="3" opacity="0.85">
          <textPath href="#seal-curve" startOffset="0%">SEOUL · KOREA · WEDDING DAY ·</textPath>
        </text>
        <text x="37" y="34" fill={BROWN} fontFamily="Cormorant Garamond, serif" fontSize="10" textAnchor="middle" fontWeight="600">R.S.V.P</text>
        <text x="37" y="46" fill={BROWN} fontFamily="Cormorant Garamond, serif" fontSize="7" textAnchor="middle" fontStyle="italic">with love</text>
      </svg>
    </Box>
  )
}

function DashedDivider() {
  return <Box sx={{ height: 1, background: `repeating-linear-gradient(90deg, ${BROWN}88 0 4px, transparent 4px 8px)`, my: 1 }} />
}

function TitleLetter({ children, subtitle }) {
  return (
    <Stack alignItems="center" spacing={0.5}>
      {subtitle && (
        <Typography sx={{ fontFamily: SCRIPT, fontSize: 26, color: BROWN, lineHeight: 1 }}>
          {subtitle}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: KR_SERIF,
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: '0.25em',
          color: INK,
        }}
      >
        {children}
      </Typography>
    </Stack>
  )
}

function RowLetter({ label, value }) {
  if (!value) return null
  return (
    <Stack direction="row" spacing={2} alignItems="baseline" sx={{ pb: 1.25, borderBottom: `1px dashed ${BROWN}55` }}>
      <Typography sx={{ width: 60, fontFamily: SCRIPT, fontSize: 18, color: BROWN, lineHeight: 1 }}>
        {label}
      </Typography>
      <Typography sx={{ flex: 1, fontFamily: KR_SERIF, color: INK, fontSize: 14, lineHeight: 1.7 }}>
        {value}
      </Typography>
    </Stack>
  )
}

export default function ExampleClassicLetter({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)
  const englishDate = formatEnglishDate(w.date)

  return (
    <Box sx={{ minHeight: '100vh', background: IVORY, py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.md}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: PAPER,
            border: `1px solid ${GOLD}88`,
            position: 'relative',
          }}
        >
          {/* 봉투 풍 헤더: 우표 + 우체국 도장 + 손글씨 주소 */}
          <Box
            sx={{
              p: 3,
              borderBottom: `1px dashed ${BROWN}55`,
              background: `linear-gradient(180deg, ${IVORY} 0%, ${PAPER} 100%)`,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography sx={{ fontFamily: SCRIPT, fontSize: 22, color: BROWN, lineHeight: 1 }}>
                  Dear,
                </Typography>
                <Typography sx={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: MUTED, letterSpacing: '0.18em', mt: 0.5 }}>
                  my beloved guest
                </Typography>
                <Typography sx={{ fontFamily: SERIF, fontSize: 11, color: MUTED, letterSpacing: '0.32em', mt: 1.5, textTransform: 'uppercase' }}>
                  from {w.groom} &amp; {w.bride}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ position: 'relative' }}>
                <Stamp />
                <Box sx={{ position: 'absolute', top: 32, right: -12 }}>
                  <PostalSeal />
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* 편지 본문 시작 — 커버 */}
          <Box sx={{ px: 4, pt: 5, pb: 4, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: SCRIPT, fontSize: 42, color: BROWN, lineHeight: 1, mb: 0.5 }}>
              Wedding
            </Typography>
            <Typography sx={{ fontFamily: SCRIPT, fontSize: 32, color: GOLD, lineHeight: 1, mb: 3 }}>
              Invitation
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ width: 80, height: 1, background: BROWN, opacity: 0.6 }} />
            </Box>

            <Typography sx={{ fontFamily: KR_SERIF, fontSize: 30, fontWeight: 700, color: INK, lineHeight: 1.2 }}>
              {w.groom}
            </Typography>
            <Typography sx={{ fontFamily: SCRIPT, fontSize: 30, color: BROWN, my: 0.5, lineHeight: 1 }}>
              &amp;
            </Typography>
            <Typography sx={{ fontFamily: KR_SERIF, fontSize: 30, fontWeight: 700, color: INK, lineHeight: 1.2 }}>
              {w.bride}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <Box sx={{ width: 80, height: 1, background: BROWN, opacity: 0.6 }} />
            </Box>

            <Typography sx={{ fontFamily: KR_SERIF, fontSize: 14, color: INK, letterSpacing: '0.04em' }}>
              {dateStr}
            </Typography>
            <Typography sx={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 13, color: BROWN, letterSpacing: '0.22em', mt: 0.5 }}>
              {englishDate}
            </Typography>
          </Box>

          <DashedDivider />

          <CardContent sx={{ px: 4, py: 4, background: PAPER }}>
            <Stack spacing={4.5}>
              {/* 인사말 — 편지 본문 */}
              <Box>
                <Typography sx={{ fontFamily: SCRIPT, fontSize: 28, color: BROWN, lineHeight: 1, mb: 1.5 }}>
                  Dearest,
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'pre-line',
                    fontFamily: KR_SERIF,
                    color: INK,
                    fontSize: 15,
                    lineHeight: 2.1,
                  }}
                >
                  {w.greeting}
                </Typography>
                <Typography
                  sx={{
                    mt: 2.5,
                    fontFamily: SCRIPT,
                    fontSize: 22,
                    color: BROWN,
                    textAlign: 'right',
                    lineHeight: 1,
                  }}
                >
                  with love,
                </Typography>
                <Typography
                  sx={{
                    fontFamily: SCRIPT,
                    fontSize: 26,
                    color: INK,
                    textAlign: 'right',
                    mt: 0.5,
                    lineHeight: 1,
                  }}
                >
                  {w.groom} &amp; {w.bride}
                </Typography>
              </Box>

              <DashedDivider />

              {/* 예식 안내 */}
              <Box>
                <TitleLetter subtitle="The Day">예식 안내</TitleLetter>
                <Stack spacing={1.5} mt={2.5}>
                  <RowLetter label="when" value={dateStr} />
                  <RowLetter label="where" value={w.venue} />
                  <RowLetter label="address" value={w.address} />
                </Stack>
              </Box>

              <DashedDivider />

              {/* 오시는 길 */}
              <Box>
                <TitleLetter subtitle="Directions">오시는 길</TitleLetter>
                <Box
                  sx={{
                    mt: 2.5,
                    height: 160,
                    borderRadius: `${radii.sm}px`,
                    background: IVORY,
                    border: `1px dashed ${BROWN}55`,
                    display: 'grid',
                    placeItems: 'center',
                    color: MUTED,
                    fontFamily: SERIF,
                    fontStyle: 'italic',
                    fontSize: 13,
                  }}
                >
                  네이버 지도 (연동 예정)
                </Box>
              </Box>

              {/* 갤러리 */}
              {!!w.gallery?.length && (
                <>
                  <DashedDivider />
                  <Box>
                    <TitleLetter subtitle="Memories">갤러리</TitleLetter>
                    <Stack direction="row" spacing={1.25} mt={2.5} sx={{ overflowX: 'auto', pb: 0.5 }}>
                      {w.gallery.slice(0, 6).map((src, i) => (
                        <Box
                          key={`${src.slice(0, 24)}-${i}`}
                          sx={{
                            position: 'relative',
                            flex: '0 0 auto',
                            width: 112,
                            height: 112,
                            p: '4px',
                            background: PAPER,
                            border: `1px solid ${GOLD}88`,
                            boxShadow: `0 4px 12px rgba(58, 46, 34, 0.08)`,
                          }}
                        >
                          <Box
                            component="img"
                            src={src}
                            alt={`gallery-${i + 1}`}
                            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'sepia(0.08)' }}
                          />
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </>
              )}

              {/* 푸터 */}
              <Box sx={{ textAlign: 'center', pt: 1 }}>
                <DashedDivider />
                <Box sx={{ display: 'inline-flex', mt: 2 }}>
                  <Stamp />
                </Box>
                <Typography sx={{ fontFamily: SCRIPT, fontSize: 24, color: BROWN, mt: 1 }}>
                  yours truly
                </Typography>
                <Typography
                  sx={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 11, color: MUTED, letterSpacing: '0.32em', mt: 0.5 }}
                >
                  {w.groom.toUpperCase()} &amp; {w.bride.toUpperCase()}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', mt: 3, color: MUTED, fontFamily: SCRIPT, fontSize: 18 }}
        >
          예시 템플릿 · 클래식 편지 · 오즈청첩장
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
