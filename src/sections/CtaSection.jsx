import { Box, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, shadows } from '../theme/index.js'

export default function CtaSection() {
  const navigate = useNavigate()

  return (
    <SectionContainer tone="surface" py={{ xs: 6, md: 10 }} id="pricing">
      <Reveal>
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
                START
              </Typography>
              <Typography variant="h2" sx={{ lineHeight: 1.25 }}>
                우리 사진으로
                <br />
                <Box component="span" sx={{ color: palette.primary }}>
                  청첩장을 시작해보세요
                </Box>
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 540 }}>
                디자인을 고르고, 사진과 예식 정보를 넣어 모바일 청첩장 화면을 먼저 확인해보세요.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <PillButton size="large" onClick={() => navigate('/create/design')}>
                  디자인 선택하기
                </PillButton>
                <PillButton variant="outline" size="large" onClick={() => navigate('/orders')}>
                  주문 조회하기
                </PillButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack spacing={1.5} sx={{ height: '100%' }}>
              <FeatureCard title="미리보기 후 진행" desc="입력한 정보가 화면에 어떻게 보이는지 먼저 확인할 수 있어요." />
              <FeatureCard title="주문 조회로 관리" desc="이름과 연락처로 주문을 다시 찾아 필요한 정보를 수정할 수 있어요." />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      </Reveal>
    </SectionContainer>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <Box
      sx={{
        transition:
          'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 22px rgba(0,0,0,0.07)',
        },
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
