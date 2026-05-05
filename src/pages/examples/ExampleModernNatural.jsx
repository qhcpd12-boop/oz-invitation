import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { fontFamily, radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'

const DEFAULT_DATA = {
  groom: '김민준',
  bride: '이서연',
  date: '2026-05-24',
  time: '14:00',
  venue: '그레이스 미리 웨딩홀 3F',
  address: '서울시 강남구 테헤란로 123',
  greeting:
    '서로 다른 길을 걸어오다 같은 방향을 바라보게 되었습니다.\n평생을 함께 걷고 싶은 사람과 영원을 약속하고자 합니다.\n저희의 새로운 여정을 함께 축복해 주세요.',
  gallery: [],
}

const GREEN_DARK = '#1a3328'
const GREEN_MID = '#2d5a3d'
const GREEN_ACCENT = '#4a7c59'
const CREAM = '#fdfaf4'

export default function ExampleModernNatural({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)

  return (
    <Box sx={{ minHeight: '100vh', background: '#f0ede6', py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        {/* 커버 — 사진 배경 스타일 */}
        <Box
          sx={{
            borderRadius: `${radii.lg}px ${radii.lg}px 0 0`,
            overflow: 'hidden',
            background: `linear-gradient(165deg, ${GREEN_ACCENT} 0%, ${GREEN_MID} 40%, ${GREEN_DARK} 100%)`,
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 4,
            boxShadow: shadows.elevated,
          }}
        >
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: 17,
              fontWeight: 500,
              letterSpacing: '0.06em',
              fontFamily: fontFamily.serif,
            }}
          >
            {w.groom} &amp; {w.bride}
          </Typography>

          <Typography
            sx={{
              color: '#fff',
              fontSize: 52,
              fontWeight: 900,
              letterSpacing: '0.06em',
              lineHeight: 1,
              textShadow: '0 2px 10px rgba(0,0,0,0.35)',
            }}
          >
            MARRIAGE
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.95)', fontSize: 15, mb: 0.75 }}>
              {dateStr}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>
              {w.venue}
            </Typography>
          </Box>
        </Box>

        {/* 내용 섹션 */}
        <Card
          sx={{
            borderRadius: `0 0 ${radii.lg}px ${radii.lg}px`,
            boxShadow: shadows.elevated,
            background: CREAM,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={4} divider={<Box sx={{ height: 1, background: '#e8e0d0' }} />}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: fontFamily.serif,
                    fontStyle: 'italic',
                    fontSize: 24,
                    color: GREEN_MID,
                    mb: 2,
                  }}
                >
                  invitation
                </Typography>
                <Typography sx={{ whiteSpace: 'pre-line', color: '#666', lineHeight: 2, fontSize: 14 }}>
                  {w.greeting}
                </Typography>
              </Box>

              <Box>
                <TitleNatural>예식 안내</TitleNatural>
                <Stack spacing={1.5} mt={2}>
                  <RowNatural label="일시" value={dateStr} />
                  <RowNatural label="장소" value={w.venue} />
                  <RowNatural label="주소" value={w.address} />
                </Stack>
              </Box>

              <Box>
                <TitleNatural>오시는 길</TitleNatural>
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    borderRadius: `${radii.md}px`,
                    background: '#eee8dc',
                    border: '1px dashed #bbb5a8',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#aaa',
                    fontSize: 14,
                  }}
                >
                  네이버 지도 (연동 예정)
                </Box>
              </Box>

              {!!w.gallery?.length && (
                <Box>
                  <TitleNatural>갤러리</TitleNatural>
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
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', mt: 3, color: '#aaa' }}
        >
          예시 템플릿 · 모던 내추럴 · 오즈청첩장
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

function TitleNatural({ children }) {
  return (
    <Typography
      align="center"
      sx={{ fontWeight: 700, fontSize: 16, letterSpacing: '0.06em', color: GREEN_MID }}
    >
      {children}
    </Typography>
  )
}

function RowNatural({ label, value }) {
  if (!value) return null
  return (
    <Stack direction="row" spacing={2} sx={{ borderBottom: '1px solid #e8e0d0', pb: 1.25 }}>
      <Typography sx={{ width: 48, color: '#aaa', fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ flex: 1, color: '#444', fontSize: 14 }}>{value}</Typography>
    </Stack>
  )
}
