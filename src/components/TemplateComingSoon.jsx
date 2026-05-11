import { Box, Card, Stack, Typography } from '@mui/material'
import { radii, shadows } from '../theme/index.js'

/**
 * 자체 디자인 컴포넌트가 아직 없는 템플릿의 미리보기 placeholder.
 * 다른 템플릿의 디자인을 잘못 빌려 쓰지 않도록 명시적으로 "준비 중" 화면 표시.
 */
export default function TemplateComingSoon({ template }) {
  const name = template?.name || '템플릿'
  const style = template?.style || ''

  return (
    <Box sx={{ minHeight: '100vh', background: '#F5F4F2', py: 6, px: 2 }}>
      <Box sx={{ maxWidth: 420, mx: 'auto' }}>
        <Card
          sx={{
            borderRadius: `${radii.lg}px`,
            boxShadow: shadows.elevated,
            overflow: 'hidden',
            background: '#FFFFFF',
            border: '1px solid #E5E1DC',
            p: 5,
            textAlign: 'center',
          }}
        >
          <Stack spacing={2.5} alignItems="center">
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #EFE7DD 0%, #D9CFC2 100%)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
              }}
            >
              ✦
            </Box>
            <Stack spacing={0.5} alignItems="center">
              <Typography sx={{ fontSize: 11, letterSpacing: '0.35em', color: '#8E8478', textTransform: 'uppercase' }}>
                Coming Soon
              </Typography>
              <Typography sx={{ fontFamily: "'Noto Serif KR', serif", fontSize: 22, fontWeight: 700, color: '#2D2926' }}>
                {name}
              </Typography>
              {style && (
                <Typography sx={{ fontSize: 13, color: '#8E8478' }}>
                  {style}
                </Typography>
              )}
            </Stack>
            <Box sx={{ height: 1, width: 80, background: '#D9CFC2', my: 1 }} />
            <Typography sx={{ color: '#5C534B', fontSize: 14, lineHeight: 1.9, maxWidth: 320 }}>
              이 템플릿의 전용 디자인은 곧 공개됩니다.<br />
              현재는 <strong>럭셔리 누아르</strong>와 <strong>로맨틱 로즈</strong>를 사용해 보실 수 있어요.
            </Typography>
          </Stack>
        </Card>
        <Typography
          variant="caption"
          sx={{ display: 'block', textAlign: 'center', mt: 3, color: '#8E8478', fontStyle: 'italic', letterSpacing: '0.16em' }}
        >
          오즈청첩장 · 디자인 준비 중
        </Typography>
      </Box>
    </Box>
  )
}
