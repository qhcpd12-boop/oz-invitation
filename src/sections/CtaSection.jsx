import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { palette, radii, shadows } from '../theme/index.js'

export default function CtaSection() {
  const navigate = useNavigate()

  return (
    <SectionContainer tone="surface" py={{ xs: 6, md: 10 }} id="cs">
      <Box
        sx={{
          background: palette.ctaGradient,
          borderRadius: `${radii.lg}px`,
          p: { xs: 4, md: 7 },
          color: '#fff',
          textAlign: 'center',
          boxShadow: shadows.cta,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography variant="h2" sx={{ color: '#fff' }}>
            지금 바로 시작하세요
          </Typography>
          <Typography sx={{ opacity: 0.9, maxWidth: 520 }}>
            3분이면 완성! 회원가입 없이 바로 청첩장을 만들어 보세요.
          </Typography>
          <PillButton variant="light" size="large" onClick={() => navigate('/create/design')}>
            지금 만들기 →
          </PillButton>
        </Stack>
      </Box>
    </SectionContainer>
  )
}
