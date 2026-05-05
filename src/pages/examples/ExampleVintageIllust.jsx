import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../../theme/index.js'
import { formatKoreanDate } from '../../lib/invitations/formatWeddingDate.js'

const DEFAULT_DATA = {
  groom: '박지원',
  bride: '김민지',
  date: '2026-10-12',
  time: '15:00',
  venue: '메종드블러썸 서울',
  address: '서울시 강남구 청담동 123',
  greeting:
    '서로의 삶에 따뜻한 동반자가 되어\n사랑과 신뢰로 한 가정을 이루려 합니다.\n저희의 시작을 축복해 주세요.',
  gallery: [],
}

function CarriageIllust() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
      <svg width="220" height="130" viewBox="0 0 220 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Carriage body */}
        <rect x="48" y="28" width="96" height="60" rx="8" stroke="#333" strokeWidth="1.8" fill="#f5f4f0" />
        {/* Awning */}
        <path d="M44 28 Q96 8 152 28" stroke="#333" strokeWidth="1.8" fill="none" />
        {/* Left wheel */}
        <circle cx="68" cy="96" r="20" stroke="#333" strokeWidth="1.8" fill="none" />
        <line x1="68" y1="76" x2="68" y2="116" stroke="#333" strokeWidth="1.2" />
        <line x1="48" y1="96" x2="88" y2="96" stroke="#333" strokeWidth="1.2" />
        <line x1="54" y1="82" x2="82" y2="110" stroke="#333" strokeWidth="1.2" />
        <line x1="82" y1="82" x2="54" y2="110" stroke="#333" strokeWidth="1.2" />
        {/* Right wheel */}
        <circle cx="136" cy="96" r="20" stroke="#333" strokeWidth="1.8" fill="none" />
        <line x1="136" y1="76" x2="136" y2="116" stroke="#333" strokeWidth="1.2" />
        <line x1="116" y1="96" x2="156" y2="96" stroke="#333" strokeWidth="1.2" />
        <line x1="122" y1="82" x2="150" y2="110" stroke="#333" strokeWidth="1.2" />
        <line x1="150" y1="82" x2="122" y2="110" stroke="#333" strokeWidth="1.2" />
        {/* Shaft to horse */}
        <line x1="144" y1="90" x2="192" y2="82" stroke="#333" strokeWidth="1.8" />
        {/* Horse body */}
        <ellipse cx="198" cy="74" rx="14" ry="9" stroke="#333" strokeWidth="1.5" fill="none" />
        <line x1="198" y1="83" x2="198" y2="106" stroke="#333" strokeWidth="1.8" />
        <line x1="198" y1="93" x2="190" y2="112" stroke="#333" strokeWidth="1.8" />
        <line x1="198" y1="93" x2="206" y2="112" stroke="#333" strokeWidth="1.8" />
        <line x1="198" y1="106" x2="192" y2="122" stroke="#333" strokeWidth="1.8" />
        <line x1="198" y1="106" x2="204" y2="122" stroke="#333" strokeWidth="1.8" />
        {/* Bride & Groom heads */}
        <circle cx="82" cy="46" r="7" stroke="#333" strokeWidth="1.5" fill="none" />
        <circle cx="110" cy="46" r="7" stroke="#333" strokeWidth="1.5" fill="none" />
        {/* Just married text */}
        <text x="96" y="74" textAnchor="middle" fontSize="9" fill="#555" fontStyle="italic" fontFamily="Georgia, serif">Just married</text>
      </svg>
    </Box>
  )
}

export default function ExampleVintageIllust({ data }) {
  const w = mergeData(data)
  const dateStr = formatKoreanDate(w.date, w.time)

  return (
    <Box sx={{ minHeight: '100vh', background: '#f0efe9', py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.lg}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: '#fafaf8',
          }}
        >
          {/* 커버 섹션 */}
          <Box
            sx={{
              p: 4,
              pb: 3,
              textAlign: 'center',
              position: 'relative',
              borderBottom: '2px solid #1a1a1a',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 10,
                left: 10,
                right: 10,
                bottom: 0,
                border: '1px solid #1a1a1a',
                pointerEvents: 'none',
              },
            }}
          >
            <Typography sx={{ fontSize: 13, color: '#555', letterSpacing: '0.4em', mb: 1.5 }}>
              ✦ &nbsp; ✦ &nbsp; ✦
            </Typography>

            <Typography
              sx={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 17,
                color: '#444',
                mb: 0.75,
              }}
            >
              Forever Starts Here
            </Typography>

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: '0.07em',
                color: '#1a1a1a',
                lineHeight: 1.15,
              }}
            >
              LET LOVE<br />BLOOM
            </Typography>

            <CarriageIllust />

            <Box
              sx={{
                borderTop: '1px solid #bbb',
                pt: 2.5,
              }}
            >
              <Typography
                sx={{ fontSize: 12, letterSpacing: '0.07em', color: '#555', lineHeight: 2 }}
              >
                WE INVITE YOU TO CELEBRATE THE MARRIAGE OF<br />
                <Box component="span" sx={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a' }}>
                  {w.groom.toUpperCase()} &amp; {w.bride.toUpperCase()}
                </Box>
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  fontSize: 16,
                  color: '#333',
                  mt: 1,
                }}
              >
                {w.venue}
              </Typography>
            </Box>
          </Box>

          {/* 내용 섹션 */}
          <CardContent sx={{ p: 4, background: '#fafaf8' }}>
            <Stack spacing={4} divider={<Box sx={{ height: 1, background: '#ddd' }} />}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{
                    fontFamily: 'Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: 24,
                    color: '#1a1a1a',
                    mb: 2.5,
                  }}
                >
                  Wedding Invitation
                </Typography>

                <Box
                  sx={{
                    borderTop: '2px solid #1a1a1a',
                    borderBottom: '2px solid #1a1a1a',
                    py: 1.25,
                    mb: 2.5,
                  }}
                >
                  <Typography
                    sx={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.14em', color: '#1a1a1a' }}
                  >
                    {w.groom.toUpperCase()} &amp; {w.bride.toUpperCase()}
                  </Typography>
                </Box>

                <Typography
                  sx={{ whiteSpace: 'pre-line', color: '#555', lineHeight: 2, fontSize: 14 }}
                >
                  {w.greeting}
                </Typography>
              </Box>

              <Box>
                <TitleVintage>예식 안내</TitleVintage>
                <Stack spacing={1.5} mt={2}>
                  <RowVintage label="일시" value={dateStr} />
                  <RowVintage label="장소" value={w.venue} />
                  <RowVintage label="주소" value={w.address} />
                </Stack>
              </Box>

              <Box>
                <TitleVintage>오시는 길</TitleVintage>
                <Box
                  sx={{
                    mt: 2,
                    height: 160,
                    borderRadius: `${radii.md}px`,
                    background: '#eee',
                    border: '1px dashed #bbb',
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
                  <TitleVintage>갤러리</TitleVintage>
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
          예시 템플릿 · 빈티지 일러스트 · 오즈청첩장
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

function TitleVintage({ children }) {
  return (
    <Typography
      align="center"
      sx={{
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: '0.18em',
        color: '#1a1a1a',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  )
}

function RowVintage({ label, value }) {
  if (!value) return null
  return (
    <Stack direction="row" spacing={2} sx={{ borderBottom: '1px solid #ddd', pb: 1.25 }}>
      <Typography sx={{ width: 48, color: '#aaa', fontSize: 13 }}>{label}</Typography>
      <Typography sx={{ flex: 1, color: '#1a1a1a', fontSize: 14 }}>{value}</Typography>
    </Stack>
  )
}
