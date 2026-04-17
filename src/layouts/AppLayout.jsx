import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppHeader from './AppHeader.jsx'
import AppFooter from './AppFooter.jsx'
import { palette } from '../theme/index.js'

export default function AppLayout() {
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
