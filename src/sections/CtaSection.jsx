import { Box, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { palette, radii, shadows } from '../theme/index.js'

export default function CtaSection() {
  const navigate = useNavigate()

  return (
    <SectionContainer tone="surface" py={{ xs: 6, md: 10 }} id="pricing">
      <Box
        sx={{
          background: 'linear-gradient(145deg, #FFF4F1 0%, #FFFFFF 55%, #FEFCF9 100%)',
          borderRadius: `${radii.lg}px`,
          p: { xs: 3, md: 5 },
          color: palette.textPrimary,
          boxShadow: shadows.card,
          position: 'relative',
          overflow: 'hidden',
          border: `1px solid ${palette.border}`,
        }}
      >
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Stack spacing={2.5} sx={{ height: '100%', justifyContent: 'center' }}>
              <Typography variant="overline" sx={{ color: palette.primary, fontWeight: 700, letterSpacing: '0.16em' }}>
                PRICING
              </Typography>
              <Typography variant="h2" sx={{ lineHeight: 1.25 }}>
                템플릿 청첩장
                <br />
                <Box component="span" sx={{ color: palette.primary }}>
                  1회 결제, 평생 소장
                </Box>
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 540 }}>
                결제 한 번으로 청첩장을 평생 보관하고, 예식 정보나 문구는 언제든 자유롭게 수정할 수 있어요.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <PillButton size="large" onClick={() => navigate('/create/design')}>
                  ₩19,900으로 시작하기
                </PillButton>
                <PillButton variant="outline" size="large" onClick={() => navigate('/create/details')}>
                  수정 화면 보기
                </PillButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={1.5} sx={{ height: '100%' }}>
              <FeatureCard title="평생 소장" desc="결혼식 이후에도 링크와 콘텐츠를 계속 보관합니다." />
              <FeatureCard title="템플릿 수정 가능" desc="이름, 일정, 장소, 인사말, 사진까지 필요할 때 언제든 변경 가능합니다." />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </SectionContainer>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <Box
      sx={{
        p: 2.25,
        borderRadius: `${radii.md}px`,
        background: '#fff',
        border: `1px solid ${palette.border}`,
      }}
    >
      <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {desc}
      </Typography>
    </Box>
  )
}
