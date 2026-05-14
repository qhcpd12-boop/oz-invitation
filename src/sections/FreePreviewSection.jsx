import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

const CARDS = [
  { selected: false },
  { selected: true },
  { selected: false },
  { selected: true },
  { selected: false },
  { selected: false },
  { selected: false },
  { selected: false },
]

export default function FreePreviewSection() {
  const navigate = useNavigate()

  return (
    <SectionContainer tone="surface" py={{ xs: 6, md: 9 }} id="free-preview">
      <Reveal>
      <Box
        sx={{
          background: palette.surfaceWhite,
          borderRadius: `${radii.lg}px`,
          border: `1px solid ${palette.border}`,
          boxShadow: shadows.card,
          p: { xs: 4, md: 7 },
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography
            sx={{
              color: palette.textPlaceholder,
              fontWeight: 700,
              fontSize: { xs: 13, md: 15 },
              letterSpacing: '-0.01em',
            }}
          >
            먼저 확인하고 진행
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily: fontFamily.sans,
              fontWeight: 800,
              fontSize: { xs: 26, md: 38 },
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              color: palette.textPlaceholder,
            }}
          >
            결제 전,{' '}
            <Box component="span" sx={{ color: palette.textPrimary }}>
              화면을 먼저 확인
            </Box>
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, md: 1.5 },
              justifyContent: 'center',
              flexWrap: 'wrap',
              py: { xs: 1, md: 2 },
              '@keyframes oz-card-pop': {
                '0%': { opacity: 0, transform: 'translateY(8px) scale(0.95)' },
                '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
              },
              '@keyframes oz-check-pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.12)' },
              },
            }}
          >
            {CARDS.map((card, idx) => (
              <Box
                key={idx}
                sx={{
                  position: 'relative',
                  width: { xs: 36, md: 56 },
                  height: { xs: 48, md: 76 },
                  borderRadius: { xs: '6px', md: '8px' },
                  background: card.selected ? palette.warning : '#E5E7EB',
                  animation: `oz-card-pop 500ms cubic-bezier(0.16, 1, 0.3, 1) ${idx * 70}ms backwards`,
                }}
              >
                {card.selected && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -6,
                      right: -6,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: palette.success,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      animation: 'oz-check-pulse 2.4s ease-in-out infinite',
                    }}
                  >
                    <Box
                      component="svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: 14, md: 15 },
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            디자인과 입력한 내용을 미리 확인한 뒤 진행하세요.
            <br />
            사진과 문구를 넣어보며 우리에게 맞는 분위기를 고를 수 있어요.
          </Typography>

          <Box
            component="button"
            type="button"
            onClick={() => navigate('/create/design')}
            sx={{
              mt: 1,
              background: 'transparent',
              border: 'none',
              color: palette.primary,
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
              fontFamily: 'inherit',
              '&:hover': { opacity: 0.85 },
            }}
          >
            디자인 선택하기
            <Box component="span" aria-hidden sx={{ fontSize: 18 }}>›</Box>
          </Box>
        </Stack>
      </Box>
      </Reveal>
    </SectionContainer>
  )
}
