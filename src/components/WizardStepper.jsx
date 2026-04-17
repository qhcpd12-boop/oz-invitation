import { Box, Stack, Typography } from '@mui/material'
import { palette } from '../theme/index.js'

/**
 * 위저드 단계 인디케이터.
 *   steps: ['디자인 선택', '정보 입력', '결제', '완료']
 *   current: 0-based 인덱스
 */
export default function WizardStepper({ steps, current = 0 }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexWrap: 'nowrap' }}>
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <Stack key={label} direction="row" alignItems="center" spacing={1.5} sx={{ flex: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
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
                  fontWeight: active ? 700 : 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </Typography>
            </Stack>
            {i < steps.length - 1 && (
              <Box sx={{ flex: 1, height: 1, background: palette.border, mx: 1 }} />
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
