import { Box, Stack, Typography } from '@mui/material'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

const MENU_ITEMS = [
  { label: '청첩장 보기', icon: 'eye' },
  { label: '정보 수정하기', icon: 'pencil', active: true },
  { label: '공유 링크 복사', icon: 'share' },
  { label: '주문 정보 확인', icon: 'chart' },
]

export default function UnlimitedEditsSection() {
  return (
    <SectionContainer tone="surface" py={{ xs: 6, md: 9 }} id="unlimited-edits">
      <Reveal>
      <Box
        sx={{
          background: palette.surfaceWhite,
          borderRadius: `${radii.lg}px`,
          border: `1px solid ${palette.border}`,
          boxShadow: shadows.card,
          p: { xs: 4, md: 7 },
          textAlign: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Typography
            sx={{
              color: palette.textPlaceholder,
              fontWeight: 700,
              fontSize: { xs: 13, md: 15 },
              letterSpacing: '-0.01em',
            }}
          >
            주문 조회로 다시 수정
          </Typography>

          <Typography
            component="h2"
            sx={{
              fontFamily: fontFamily.sans,
              fontWeight: 800,
              fontSize: { xs: 26, md: 38 },
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              color: palette.textPlaceholder,
            }}
          >
            필요한 정보는{' '}
            <Box component="span" sx={{ color: palette.textPrimary }}>
              다시 열어 수정
            </Box>
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 3 },
              justifyContent: 'center',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              py: { xs: 2, md: 3 },
            }}
          >
            <InvitationCard
              statusColor={palette.warning}
              statusLabel="시안 저장됨"
              primaryAction="미리보기"
              secondaryAction="수정하기"
              secondaryActive
            />
            <InvitationCard
              statusColor={palette.success}
              statusLabel="공유 준비"
              primaryAction="링크 복사"
              secondaryAction="열어보기"
            />
          </Box>

          <Typography
            color="text.secondary"
            sx={{
              fontSize: { xs: 14, md: 15 },
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            주문 조회 페이지에서 청첩장을 다시 불러올 수 있어요.
            <br />
            예식 정보, 인사말, 사진처럼 자주 바뀌는 내용을 편하게 고쳐보세요.
          </Typography>
        </Stack>
      </Box>
      </Reveal>
    </SectionContainer>
  )
}

function InvitationCard({
  statusColor,
  statusLabel,
  primaryAction,
  secondaryAction,
  secondaryActive = false,
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: 240, sm: 260 },
        height: { xs: 360, sm: 400 },
        borderRadius: `${radii.md}px`,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: shadows.elevated,
      }}
    >
      {/* 상단 상태 칩 */}
      <Box
        sx={{
          position: 'absolute',
          top: 14,
          left: 14,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.75,
          px: 1.25,
          py: 0.5,
          borderRadius: `${radii.pill}px`,
          background: 'rgba(255,255,255,0.95)',
          fontSize: 11,
          fontWeight: 700,
          color: palette.textPrimary,
          zIndex: 4,
        }}
      >
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: statusColor }} />
        {statusLabel}
      </Box>

      {/* 청첩장 미리보기 영역 */}
      <Stack
        alignItems="center"
        justifyContent="flex-start"
        sx={{
          position: 'absolute',
          inset: 0,
          pt: 7,
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        <Box
          sx={{
            width: '62%',
            height: '42%',
            borderRadius: `${radii.md}px`,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
            border: '1px solid rgba(255,255,255,0.16)',
          }}
        />
      </Stack>

      {/* 메뉴 팝업 (말풍선) */}
      <Box
        sx={{
          position: 'absolute',
          left: 18,
          bottom: 60,
          width: 'calc(100% - 36px)',
          background: '#fff',
          borderRadius: `${radii.md}px`,
          boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
          p: 1.25,
          zIndex: 3,
        }}
      >
        <Stack spacing={0}>
          {MENU_ITEMS.map((item, idx) => (
            <Box
              key={item.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 1,
                py: 0.85,
                borderRadius: '8px',
                background: item.active ? palette.surface : 'transparent',
                color: item.active ? palette.textPrimary : palette.textMuted,
                fontWeight: item.active ? 700 : 500,
                fontSize: 12,
                borderBottom:
                  idx === MENU_ITEMS.length - 1
                    ? 'none'
                    : `1px solid ${palette.divider}`,
              }}
            >
              <span>{item.label}</span>
              <MenuIcon name={item.icon} active={item.active} />
            </Box>
          ))}
        </Stack>

        {/* 말풍선 꼬리 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -7,
            left: 18,
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid #fff',
          }}
        />
      </Box>

      {/* 하단 액션 영역 */}
      <Box
        sx={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 14,
          display: 'flex',
          gap: 0.75,
          alignItems: 'center',
          zIndex: 4,
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: palette.textPrimary,
            fontWeight: 700,
          }}
        >
          ⋯
        </Box>
        <Box
          sx={{
            flex: 1,
            height: 32,
            borderRadius: `${radii.pill}px`,
            background: 'rgba(255,255,255,0.85)',
            color: palette.textMuted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {primaryAction}
        </Box>
        <Box
          sx={{
            flex: 1,
            height: 32,
            borderRadius: `${radii.pill}px`,
            background: secondaryActive ? '#2563EB' : 'rgba(255,255,255,0.85)',
            color: secondaryActive ? '#fff' : palette.textMuted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {secondaryAction}
        </Box>
      </Box>
    </Box>
  )
}

function MenuIcon({ name, active }) {
  const stroke = active ? palette.textPrimary : palette.textMuted
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  if (name === 'chart') {
    return (
      <Box component="svg" {...common}>
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </Box>
    )
  }
  if (name === 'share') {
    return (
      <Box component="svg" {...common}>
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </Box>
    )
  }
  if (name === 'eye') {
    return (
      <Box component="svg" {...common}>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </Box>
    )
  }
  if (name === 'pencil') {
    return (
      <Box component="svg" {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </Box>
    )
  }
  if (name === 'edit') {
    return (
      <Box component="svg" {...common}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </Box>
    )
  }
  return null
}
