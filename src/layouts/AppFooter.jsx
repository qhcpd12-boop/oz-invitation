import { Box, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { palette, fontFamily } from '../theme/index.js'

const LINKS = [
  ['이용약관', '/terms'],
  ['개인정보처리방침', '/privacy'],
  ['요금제', '/pricing'],
  ['사업자 정보', '/business'],
]

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        background: palette.bgDark,
        color: 'rgba(255,255,255,0.7)',
        borderTop: `1px solid ${palette.borderStrong}`,
        py: 6,
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2.5, sm: 4, md: 7.5 },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
          alignItems={{ md: 'center' }}
          justifyContent="space-between"
        >
          <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 20, color: '#fff' }}>
            오즈청첩장
          </Typography>
          <Stack direction="row" spacing={3} flexWrap="wrap">
            {LINKS.map(([label, to]) => (
              <Box
                key={label}
                component={RouterLink}
                to={to}
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 14,
                  '&:hover': { color: '#fff' },
                }}
              >
                {label}
              </Box>
            ))}
          </Stack>
        </Stack>
        <Typography variant="caption" sx={{ display: 'block', mt: 4, color: 'rgba(255,255,255,0.4)' }}>
          © 2026 오즈청첩장. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}
