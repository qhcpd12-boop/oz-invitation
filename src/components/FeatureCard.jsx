import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import IconTile from './IconTile.jsx'
import { palette, radii } from '../theme/index.js'

/**
 * 핵심 기능 카드.
 *  화면설계서 5.4: 흰 배경, 1px 테두리, 24 라운드, 내부 아이콘 영역 16 라운드.
 */
export default function FeatureCard({ icon, title, description, tone = 'rose' }) {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: `${radii.lg}px`,
        border: `1px solid ${palette.border}`,
        background: palette.surface,
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack spacing={2.5}>
          <Box>
            <IconTile tone={tone}>{icon}</IconTile>
          </Box>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {description}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
