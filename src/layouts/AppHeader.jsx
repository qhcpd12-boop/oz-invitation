import { AppBar, Box, IconButton, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import PillButton from '../components/PillButton.jsx'
import { palette, fontFamily, radii } from '../theme/index.js'

const NAV = [
  { label: '홈', href: '/#top' },
  { label: '제작 흐름', href: '/#stats' },
  { label: '디자인', href: '/#designs' },
  { label: '요금제', href: '/pricing' },
  { label: 'FAQ', href: '/#faq' },
]

export default function AppHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const isCompact = useMediaQuery('(max-width:900px)')
  const [open, setOpen] = useState(false)

  // hash 링크: 같은 페이지면 즉시 부드러운 스크롤, 다른 페이지면 RouterLink 기본 동작 + useHashScroll에서 처리
  const handleNavClick = (e, href) => {
    if (!href.startsWith('/#')) return
    const id = href.slice(2)
    if (location.pathname === '/') {
      e.preventDefault()
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        background: 'transparent',
        backgroundImage: 'none',
        color: palette.textPrimary,
        pointerEvents: 'none',
        boxShadow: 'none',
        py: { xs: 1, md: 1.35 },
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1280,
          width: { xs: 'calc(100% - 24px)', md: 'calc(100% - 64px)' },
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 3.25 },
          minHeight: { xs: 58, md: 68 },
          display: 'flex',
          gap: { xs: 1.5, md: 2.5 },
          pointerEvents: 'auto',
          borderRadius: `${radii.pill}px`,
          background: 'rgba(255, 255, 255, 0.46)',
          border: '1px solid rgba(255, 255, 255, 0.60)',
          boxShadow:
            '0 10px 30px rgba(45, 45, 45, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.70)',
          backdropFilter: 'blur(18px) saturate(160%)',
          WebkitBackdropFilter: 'blur(18px) saturate(160%)',
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            mr: 'auto',
            color: palette.primary,
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: fontFamily.sans,
              fontWeight: 800,
              fontSize: { xs: 20, md: 23 },
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            오즈청첩장
          </Box>
        </Box>

        {!isCompact && (
          <Stack
            component="nav"
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{
              mx: 'auto',
              p: 0,
              borderRadius: `${radii.pill}px`,
              background: 'transparent',
              border: 'none',
            }}
          >
            {NAV.map((n) => (
              <Box
                key={n.label}
                component={RouterLink}
                to={n.href}
                onClick={(e) => handleNavClick(e, n.href)}
                sx={{
                  px: 1.6,
                  py: 0.9,
                  borderRadius: `${radii.pill}px`,
                  fontSize: { md: 15, lg: 16 },
                  lineHeight: 1,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: palette.textMuted,
                  transition: 'color 0.2s ease, background 0.2s ease',
                  '&:hover': {
                    color: palette.textPrimary,
                    background: 'rgba(255, 255, 255, 0.46)',
                  },
                }}
              >
                {n.label}
              </Box>
            ))}
          </Stack>
        )}

        {!isCompact ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <PillButton size="medium" variant="outline" onClick={() => navigate('/orders')}>
              주문 조회
            </PillButton>
            <PillButton size="medium" variant="filled" onClick={() => navigate('/create/design')}>
              청첩장 만들기
            </PillButton>
          </Stack>
        ) : (
          <IconButton
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            sx={{
              width: 42,
              height: 42,
              borderRadius: `${radii.pill}px`,
              background: 'rgba(255, 255, 255, 0.62)',
              color: palette.textPrimary,
              border: '1px solid rgba(255, 255, 255, 0.72)',
              backdropFilter: 'blur(16px) saturate(170%)',
              WebkitBackdropFilter: 'blur(16px) saturate(170%)',
              boxShadow:
                '0 8px 22px rgba(45, 45, 45, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.72)',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {isCompact && open && (
        <Stack
          spacing={1.5}
          sx={{
            px: 2,
            pb: 2,
            mx: { xs: 1.5, md: 4 },
            mt: -0.5,
            borderRadius: { xs: 4, md: 5 },
            background:
              'linear-gradient(180deg, rgba(255, 251, 248, 0.92) 0%, rgba(255, 247, 243, 0.88) 100%)',
            backdropFilter: 'blur(22px) saturate(180%)',
            WebkitBackdropFilter: 'blur(22px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.72)',
            boxShadow: '0 20px 52px rgba(45,45,45,0.10)',
          }}
        >
          {NAV.map((n) => (
            <Box
              key={n.label}
              component={RouterLink}
              to={n.href}
              onClick={(e) => {
                handleNavClick(e, n.href)
                setOpen(false)
              }}
              sx={{
                py: 1.1,
                px: 1.25,
                borderRadius: `${radii.md}px`,
                fontSize: 15,
                fontWeight: 700,
                color: palette.textMuted,
                '&:hover': {
                  color: palette.textPrimary,
                  background: 'rgba(255, 255, 255, 0.56)',
                },
              }}
            >
              {n.label}
            </Box>
          ))}
          <Stack direction="row" spacing={1.5} pt={1}>
            <PillButton variant="outline" fullWidth onClick={() => navigate('/orders')}>
              주문 조회
            </PillButton>
            <PillButton variant="filled" fullWidth onClick={() => navigate('/create/design')}>
              청첩장 만들기
            </PillButton>
          </Stack>
        </Stack>
      )}

      <Typography component="span" id="top" sx={{ position: 'absolute', top: 0, opacity: 0 }} />
    </AppBar>
  )
}
