import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { fontFamily, radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'

/** 청첩장 예시 1 — 럭셔리 누아르(다크 + 골드). props 기반 (빈 값이면 기본 데이터) */
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

const GOLD = '#E5C088'
const BG = '#0D0D0D'
const CARD = '#141414'

export default function ExampleLuxuryNoir({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)

  return (
    <Box sx={{ minHeight: '100vh', background: BG, py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.lg}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: CARD,
            border: `1px solid rgba(229, 192, 136, 0.2)`,
          }}
        >
          <Box sx={{ py: 8, px: 3, textAlign: 'center', background: `linear-gradient(180deg, #1a1510 0%, ${CARD} 100%)` }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: '0.45em', color: GOLD, fontWeight: 700, fontSize: 11 }}
            >
              WEDDING
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 34, fontWeight: 700, color: '#fff', mt: 2 }}>
              {w.groom}
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 22, color: GOLD, my: 1.5 }}>
              &
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 34, fontWeight: 700, color: '#fff' }}>
              {w.bride}
            </Typography>
            <Box sx={{ width: 48, height: 1, background: GOLD, opacity: 0.5, mx: 'auto', my: 3 }} />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '0.02em' }}>
              {dateStr}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4, background: CARD }}>
            <Stack spacing={4} divider={<Box sx={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />}>
              <Box>
                <TitleLuxury>인사말</TitleLuxury>
                <Typography sx={{ whiteSpace: 'pre-line', textAlign: 'center', mt: 2, color: 'rgba(255,255,255,0.85)', lineHeight: 1.85 }}>
                  {w.greeting}
                </Typography>
              </Box>
              <Box>
                <TitleLuxury>예식 안내</TitleLuxury>
                <Stack spacing={1.5} mt={2}>
                  <RowLuxury label="일시" value={dateStr} />
                  <RowLuxury label="장소" value={w.venue} />
                  <RowLuxury label="주소" value={w.address} />
                </Stack>
              </Box>
              <Box>
                <TitleLuxury>오시는 길</TitleLuxury>
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    borderRadius: `${radii.md}px`,
                    border: `1px dashed rgba(229,192,136,0.35)`,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: 14,
                  }}
                >
                  네이버 지도 (연동 예정)
                </Box>
              </Box>
              {!!w.gallery?.length && (
                <Box>
                  <TitleLuxury>갤러리</TitleLuxury>
                  <Stack direction="row" spacing={1.25} mt={2} sx={{ overflowX: 'auto', pb: 0.5 }}>
                    {w.gallery.slice(0, 6).map((src, index) => (
                      <Box
                        key={`${src.slice(0, 24)}-${index}`}
                        component="img"
                        src={src}
                        alt={`gallery-${index + 1}`}
                        sx={{
                          width: 104,
                          height: 104,
                          flex: '0 0 auto',
                          objectFit: 'cover',
                          borderRadius: `${radii.md}px`,
                          border: '1px solid rgba(229,192,136,0.25)',
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, color: 'rgba(255,255,255,0.45)' }}>
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

function TitleLuxury({ children }) {
  return (
    <Typography
      align="center"
      sx={{
        fontFamily: fontFamily.serif,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '0.2em',
        color: GOLD,
      }}
    >
      {children}
    </Typography>
  )
}

function RowLuxury({ label, value }) {
  if (!value) return null
  return (
    <Stack direction="row" spacing={2} sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)', pb: 1.25 }}>
      <Typography sx={{ width: 48, color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ flex: 1, color: '#fff', fontSize: 14 }}>{value}</Typography>
    </Stack>
  )
}
