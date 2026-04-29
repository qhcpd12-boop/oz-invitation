import { AppBar, Box, IconButton, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PillButton from '../components/PillButton.jsx'
import { palette, fontFamily } from '../theme/index.js'
import { useAuth } from '../lib/auth/AuthProvider.jsx'

const NAV = [
  { label: '홈', href: '/#top' },
  { label: '요금제', href: '/pricing' },
  { label: '디자인', href: '/create/design' },
  { label: '후기', href: '/#testimonials' },
  { label: '고객센터', href: '/#cs' },
]

export default function AppHeader() {
  const { user, signOut, signIn } = useAuth()
  const navigate = useNavigate()
  const isCompact = useMediaQuery('(max-width:900px)')
  const [open, setOpen] = useState(false)

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(254, 252, 249, 0.92)',
        color: palette.textPrimary,
        borderBottom: `1px solid ${palette.border}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1280,
          width: '100%',
          mx: 'auto',
          px: { xs: 2.5, sm: 4, md: 7.5 },
          minHeight: { xs: 64, md: 80 },
          display: 'flex',
          gap: 2,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            fontFamily: fontFamily.serif,
            fontWeight: 700,
            fontSize: 22,
            color: palette.primary,
            mr: 'auto',
          }}
        >
          오즈청첩장
        </Box>

        {!isCompact && (
          <Stack direction="row" spacing={3} alignItems="center" sx={{ mx: 'auto' }}>
            {NAV.map((n) => (
              <Box
                key={n.label}
                component={RouterLink}
                to={n.href}
                sx={{
                  fontWeight: 500,
                  color: palette.textMuted,
                  '&:hover': { color: palette.primary },
                }}
              >
                {n.label}
              </Box>
            ))}
          </Stack>
        )}

        {!isCompact ? (
          <Stack direction="row" spacing={1.5}>
            {user ? (
              <>
                <PillButton variant="outline" onClick={() => navigate('/create')}>
                  내 청첩장
                </PillButton>
                <PillButton variant="filled" onClick={signOut}>
                  로그아웃
                </PillButton>
              </>
            ) : (
              <>
                <PillButton variant="outline" onClick={signIn}>
                  로그인
                </PillButton>
                <PillButton variant="filled" onClick={() => navigate('/signup')}>
                  무료 시작하기
                </PillButton>
              </>
            )}
          </Stack>
        ) : (
          <IconButton onClick={() => setOpen((v) => !v)} aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {isCompact && open && (
        <Stack
          spacing={1.5}
          sx={{
            px: 2.5,
            pb: 2,
            background: '#fff',
            borderTop: `1px solid ${palette.border}`,
          }}
        >
          {NAV.map((n) => (
            <Box
              key={n.label}
              component={RouterLink}
              to={n.href}
              onClick={() => setOpen(false)}
              sx={{ py: 1, fontWeight: 600, color: palette.textPrimary }}
            >
              {n.label}
            </Box>
          ))}
          <Stack direction="row" spacing={1.5} pt={1}>
            {user ? (
              <PillButton fullWidth onClick={signOut}>
                로그아웃
              </PillButton>
            ) : (
              <>
                <PillButton variant="outline" fullWidth onClick={signIn}>
                  로그인
                </PillButton>
                <PillButton fullWidth onClick={() => navigate('/signup')}>
                  무료 시작
                </PillButton>
              </>
            )}
          </Stack>
        </Stack>
      )}

      <Typography component="span" id="top" sx={{ position: 'absolute', top: 0, opacity: 0 }} />
    </AppBar>
  )
}
