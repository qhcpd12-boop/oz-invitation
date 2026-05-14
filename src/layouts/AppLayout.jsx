import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'
import AppFooter from './AppFooter.jsx'
import { palette } from '../theme/index.js'

export default function AppLayout() {
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    if (!id) return

    const target = document.getElementById(id)
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // sticky header(약 80px) 보정
    window.setTimeout(() => window.scrollBy({ top: -88, behavior: 'auto' }), 120)
  }, [location.hash])

  return (
    <Box
      sx={{
        background: isLanding
          ? `
            radial-gradient(900px 360px at 12% 0%, rgba(255, 218, 224, 0.58) 0%, rgba(255, 218, 224, 0) 72%),
            radial-gradient(820px 380px at 92% 18%, rgba(255, 226, 209, 0.42) 0%, rgba(255, 226, 209, 0) 74%),
            linear-gradient(180deg, #FFF7F8 0%, #FDF7F3 420px, #FEFCF9 100%)
          `
          : palette.surface,
        minHeight: '100vh',
      }}
    >
      <AppHeader />
      <Box component="main">
        <Outlet />
      </Box>
      <AppFooter />
    </Box>
  )
}
