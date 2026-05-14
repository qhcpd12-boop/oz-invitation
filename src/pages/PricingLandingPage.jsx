import { Box, Grid, Stack, Typography } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { useNavigate } from 'react-router-dom'
import SectionContainer from '../components/SectionContainer.jsx'
import PillButton from '../components/PillButton.jsx'
import { palette, radii, shadows } from '../theme/index.js'

const INCLUDED = [
  { title: '청첩장 평생 소장', desc: '예식 후에도 청첩장 페이지가 유지되어 언제든 다시 볼 수 있어요.' },
  { title: '디자인 변경 무제한', desc: '결제 후에도 9가지 디자인 사이에서 자유롭게 바꿀 수 있어요.' },
  { title: '사진·문구 수정 무제한', desc: '예식 정보, 인사말, 사진을 횟수 제한 없이 수정할 수 있어요.' },
  { title: '카카오톡·문자 공유 링크', desc: '발급된 링크를 그대로 카톡/문자로 전달하면 끝이에요.' },
  { title: '하객 RSVP·방명록 기능', desc: '참석 여부와 축하 메시지를 모바일에서 한 번에 받을 수 있어요.' },
  { title: '계좌번호·오시는 길 안내', desc: '복사 가능한 계좌, 지도/내비 연동까지 기본 포함입니다.' },
]

const FAQS = [
  {
    q: '추가 결제가 있나요?',
    a: '없습니다. 19,900원 1회 결제로 모든 기능을 제한 없이 사용할 수 있어요.',
  },
  {
    q: '예식이 끝나면 청첩장이 사라지나요?',
    a: '예식 후에도 청첩장은 그대로 유지됩니다. 추억으로 평생 소장할 수 있어요.',
  },
  {
    q: '나중에 디자인이나 문구를 바꿀 수 있나요?',
    a: '주문 조회 페이지에서 언제든 들어와 사진·문구·디자인을 자유롭게 바꿀 수 있어요.',
  },
]

export default function PricingLandingPage() {
  const navigate = useNavigate()
  return (
    <SectionContainer tone="surface" py={{ xs: 6, md: 10 }}>
      <Stack spacing={{ xs: 4, md: 6 }} sx={{ maxWidth: 880, mx: 'auto' }}>
        {/* 헤더 */}
        <Stack spacing={1.5} alignItems="center" textAlign="center">
          <Typography
            sx={{
              color: palette.primary,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.18em',
            }}
          >
            PRICING
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: 28, md: 38 },
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
              color: palette.textPrimary,
            }}
          >
            모바일 청첩장 요금제
          </Typography>
          <Typography
            sx={{
              color: palette.textMuted,
              fontSize: { xs: 14.5, md: 16 },
              lineHeight: 1.65,
              maxWidth: 560,
            }}
          >
            구독·갱신 없이 1회 결제만으로 모바일 청첩장을 평생 소장하세요.
            <br />
            예식 후에도 추억으로 남는 우리 둘만의 페이지입니다.
          </Typography>
        </Stack>

        {/* 가격 카드 */}
        <Box
          sx={{
            background: 'linear-gradient(145deg, #FFF4F1 0%, #FFFFFF 55%, #FEFCF9 100%)',
            borderRadius: `${radii.lg}px`,
            p: { xs: 3, md: 5 },
            boxShadow: shadows.card,
            border: `1px solid ${palette.border}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <Stack spacing={1.5}>
                <Box
                  sx={{
                    alignSelf: 'flex-start',
                    px: 1.25,
                    py: 0.4,
                    borderRadius: 999,
                    background: palette.pinkSoft,
                    color: palette.primaryDark,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                  }}
                >
                  1회 결제 · 추가 비용 없음
                </Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 20, md: 24 },
                    color: palette.textPrimary,
                    letterSpacing: '-0.02em',
                  }}
                >
                  오즈청첩장 단일 요금제
                </Typography>
                <Stack direction="row" alignItems="baseline" spacing={1} sx={{ pt: 0.5 }}>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: 44, md: 56 },
                      color: palette.textPrimary,
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                    }}
                  >
                    19,900
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 18, md: 22 },
                      color: palette.textPrimary,
                    }}
                  >
                    원
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    color: palette.textMuted,
                    fontSize: 13.5,
                    lineHeight: 1.55,
                    mt: 0.5,
                  }}
                >
                  카드·간편결제 1회 결제만으로 끝.
                  <br />
                  청첩장을 평생 소장합니다.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ pt: 1.5 }}>
                  <PillButton size="large" onClick={() => navigate('/create/design')}>
                    디자인 선택하기
                  </PillButton>
                  <PillButton variant="outline" size="large" onClick={() => navigate('/orders')}>
                    주문 조회
                  </PillButton>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={7}>
              <Stack spacing={1.25}>
                {INCLUDED.map(({ title, desc }) => (
                  <Stack
                    key={title}
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                    sx={{
                      p: 1.5,
                      borderRadius: `${radii.md - 4}px`,
                      background: '#fff',
                      border: `1px solid ${palette.border}`,
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: palette.pinkSoft,
                        color: palette.primary,
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                        mt: 0.25,
                      }}
                    >
                      <CheckRoundedIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Stack spacing={0.25} sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 14.5, color: palette.textPrimary }}>
                        {title}
                      </Typography>
                      <Typography sx={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.55 }}>
                        {desc}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* FAQ */}
        <Stack spacing={2}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: 20, md: 24 },
              color: palette.textPrimary,
              letterSpacing: '-0.02em',
            }}
          >
            자주 묻는 질문
          </Typography>
          <Stack spacing={1.5}>
            {FAQS.map(({ q, a }) => (
              <Box
                key={q}
                sx={{
                  p: { xs: 2.25, md: 2.75 },
                  borderRadius: `${radii.md - 4}px`,
                  background: '#fff',
                  border: `1px solid ${palette.border}`,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: 15, color: palette.textPrimary, mb: 0.75 }}
                >
                  Q. {q}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.7 }}
                >
                  {a}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        {/* 하단 CTA */}
        <Stack alignItems="center" spacing={1.5} sx={{ pt: { xs: 1, md: 2 } }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 16, md: 18 },
              color: palette.textPrimary,
              textAlign: 'center',
            }}
          >
            지금 시작하면 5분 안에 청첩장이 완성돼요
          </Typography>
          <PillButton size="large" onClick={() => navigate('/create/design')}>
            무료로 시안 만들기
          </PillButton>
        </Stack>
      </Stack>
    </SectionContainer>
  )
}
