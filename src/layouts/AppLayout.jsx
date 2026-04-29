import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'
import AppFooter from './AppFooter.jsx'
import { palette } from '../theme/index.js'

export default function AppLayout() {
  const location = useLocation()

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
    <Box sx={{ background: palette.surface, minHeight: '100vh' }}>
      <AppHeader />
      <Box component="main">
        <Outlet />
      </Box>
      <AppFooter />
    </Box>
  )
}
