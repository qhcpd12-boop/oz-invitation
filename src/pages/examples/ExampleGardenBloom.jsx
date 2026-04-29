import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { palette, fontFamily, radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'

/** 청첩장 예시 2 — 가든 블룸(연그린 + 플로럴 톤). props 기반 */
const DEFAULT_DATA = {
  groom: '이도현',
  bride: '한소희',
  date: '2026-06-07',
  time: '12:00',
  venue: '아펠가모 잠실 · 가든홀',
  address: '서울시 송파구 올림픽로 300 롯데월드타워',
  greeting:
    '봄날의 햇살처럼 따뜻한 마음으로\n저희의 새로운 시작을 축복해 주시면 감사하겠습니다.\n소중한 걸음으로 함께해 주세요.',
  gallery: [],
}

const ACCENT = '#15803d'
const SOFT = '#DCFCE7'

export default function ExampleGardenBloom({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        px: 2,
        background: `linear-gradient(165deg, ${SOFT} 0%, #FEFCF9 45%, #fff 100%)`,
      }}
    >
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card sx={{ borderRadius: `${radii.lg}px`, boxShadow: shadows.elevated, overflow: 'hidden', border: `1px solid ${palette.border}` }}>
          <Box
            sx={{
              py: 7,
              px: 3,
              textAlign: 'center',
              background: `linear-gradient(180deg, #ecfccb 0%, #fff 55%)`,
              position: 'relative',
              '&::before': {
                content: '"🌿"',
                position: 'absolute',
                top: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 28,
                opacity: 0.35,
              },
            }}
          >
            <Typography variant="overline" sx={{ letterSpacing: '0.35em', color: ACCENT, fontWeight: 700, fontSize: 11 }}>
              GARDEN WEDDING
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 32, fontWeight: 700, color: palette.textPrimary, mt: 2 }}>
              {w.groom}
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 22, color: ACCENT, my: 1 }}>
              &
            </Typography>
            <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 32, fontWeight: 700, color: palette.textPrimary }}>
              {w.bride}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              {dateStr}
            </Typography>
          </Box>

          <CardContent sx={{ p: 4, background: '#fff' }}>
            <Stack spacing={4} divider={<Box sx={{ height: 1, background: palette.divider }} />}>
              <Box>
                <TitleGarden>인사말</TitleGarden>
                <Typography sx={{ whiteSpace: 'pre-line', textAlign: 'center', mt: 2, color: palette.textMuted, lineHeight: 1.85 }}>
                  {w.greeting}
                </Typography>
              </Box>
              <Box>
                <TitleGarden>예식 안내</TitleGarden>
                <Stack spacing={1.5} mt={2}>
                  <RowGarden label="일시" value={dateStr} />
                  <RowGarden label="장소" value={w.venue} />
                  <RowGarden label="주소" value={w.address} />
                </Stack>
              </Box>
              <Box>
                <TitleGarden>오시는 길</TitleGarden>
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    borderRadius: `${radii.md}px`,
                    background: palette.surface,
                    border: `1px dashed ${palette.border}`,
                    display: 'grid',
                    placeItems: 'center',
                    color: palette.textMuted,
                    fontSize: 14,
                  }}
                >
                  네이버 지도 (연동 예정)
                </Box>
              </Box>
              {!!w.gallery?.length && (
                <Box>
                  <TitleGarden>갤러리</TitleGarden>
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
                          border: `1px solid ${palette.border}`,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 3, color: palette.textMuted }}>
          예시 템플릿 · 가든 블룸 · 오즈청첩장
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

function TitleGarden({ children }) {
  return (
    <Typography
      align="center"
      sx={{
        fontFamily: fontFamily.serif,
        fontWeight: 700,
        fontSize: 18,
        letterSpacing: '0.08em',
        color: ACCENT,
      }}
    >
      {children}
    </Typography>
  )
}

function RowGarden({ label, value }) {
  if (!value) return null
  return (
    <Stack direction="row" spacing={2} sx={{ borderBottom: `1px solid ${palette.divider}`, pb: 1.25 }}>
      <Typography sx={{ width: 48, color: palette.textMuted, fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ flex: 1, color: palette.textPrimary, fontSize: 14 }}>{value}</Typography>
    </Stack>
  )
}
