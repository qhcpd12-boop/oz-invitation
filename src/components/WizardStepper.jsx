import { Box, Stack, Typography } from '@mui/material'
import { palette } from '../theme/index.js'

/**
 * 위저드 단계 인디케이터.
 *   steps: ['디자인 선택', '정보 입력', '결제', '완료']
 *   current: 0-based 인덱스
 */
export default function WizardStepper({ steps, current = 0 }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={{ xs: 1.2, md: 2.1 }}
      sx={{
        flexWrap: 'nowrap',
        width: { xs: '100%', sm: 'auto' },
        justifyContent: 'center',
      }}
    >
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <Stack key={label} direction="row" alignItems="center" spacing={{ xs: 0.85, md: 1 }} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={{ xs: 0.65, md: 0.8 }} alignItems="center">
              <Box
                sx={{
                  width: { xs: 26, md: 28 },
                  height: { xs: 26, md: 28 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: { xs: 12.5, md: 13 },
                  fontWeight: 800,
                  lineHeight: 1,
                  color: done || active ? '#fff' : palette.textMuted,
                  background: done
                    ? palette.success
                    : active
                      ? palette.primary
                      : palette.surface,
                  border: `1px solid ${done || active ? 'transparent' : palette.border}`,
                }}
              >
                {done ? '✓' : i + 1}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: active ? palette.primary : palette.textMuted,
                  fontSize: { xs: 12, md: 12.5 },
                  lineHeight: 1,
                  fontWeight: active ? 800 : 500,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
            </Stack>
            {i < steps.length - 1 && (
              <Box sx={{ width: { xs: 10, md: 28 }, height: 1, background: palette.border, mx: { xs: 0.15, md: 0.5 } }} />
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
