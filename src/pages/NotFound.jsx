import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../components/PillButton.jsx'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Box sx={{ minHeight: '70vh', display: 'grid', placeItems: 'center', background: '#fff' }}>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h2">404</Typography>
        <Typography color="text.secondary">페이지를 찾을 수 없습니다.</Typography>
        <PillButton onClick={() => navigate('/')}>홈으로</PillButton>
      </Stack>
    </Box>
  )
}
