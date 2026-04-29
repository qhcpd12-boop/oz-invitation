import { Box } from '@mui/material'
import { palette, radii, shadows } from '../theme/index.js'

export default function MobilePreviewFrame({ children }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 410,
        mx: 'auto',
        p: 1,
        borderRadius: '36px',
        background: '#111',
        boxShadow: shadows.elevated,
        border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '30px',
          overflow: 'hidden',
          background: palette.surfaceWhite,
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 116,
            height: 24,
            borderRadius: `${radii.pill}px`,
            background: '#000',
            zIndex: 2,
            opacity: 0.95,
          }}
        />
        <Box sx={{ maxHeight: 'calc(100vh - 260px)', overflow: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  )
}

