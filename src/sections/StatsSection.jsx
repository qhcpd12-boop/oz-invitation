import { Box, Grid, Stack, Typography } from '@mui/material'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, fontFamily } from '../theme/index.js'

const WORKFLOW_STEPS = [
  {
    title: '사진 업로드',
    description: '두 사람의 분위기가 담긴 사진으로 시작해요',
    icon: 'photo',
    tint: '#F8B6C0', // soft pink
  },
  {
    title: '디자인 선택',
    description: '원하는 무드의 디자인을 고를 수 있어요',
    icon: 'palette',
    tint: '#F2C2A4', // peach
  },
  {
    title: '정보 입력',
    description: '예식 일시와 장소를 깔끔하게 정리해요',
    icon: 'form',
    tint: '#F4C6CA', // dusty rose
  },
  {
    title: '링크 공유',
    description: '완성된 청첩장을 간편하게 전달해요',
    icon: 'share',
    tint: '#E9C9B6', // champagne
  },
]

export default function StatsSection() {
  return (
    <SectionContainer
      tone="transparent"
      py={{ xs: 5, md: 8 }}
      id="stats"
      sx={{
        background: `
          radial-gradient(760px 360px at 20% 0%, rgba(255, 218, 224, 0.20) 0%, rgba(255, 218, 224, 0) 72%),
          linear-gradient(180deg, rgba(253, 247, 243, 0.96) 0%, ${palette.surface} 100%)
        `,
      }}
    >
      <Reveal>
        <Stack
          spacing={0.75}
          alignItems="center"
          textAlign="center"
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          <Typography
            sx={{
              color: palette.textPlaceholder,
              fontWeight: 700,
              fontSize: { xs: 13, md: 15 },
              letterSpacing: '-0.01em',
            }}
          >
            오즈청첩장이 준비한 제작 흐름
          </Typography>
          <Typography
            component="h2"
            sx={{
              fontFamily: fontFamily.sans,
              fontWeight: 800,
              fontSize: { xs: 24, md: 34 },
              lineHeight: 1.25,
              letterSpacing: '-0.03em',
              color: palette.textPrimary,
            }}
          >
            사진과 문구만 준비하면
            <br />
            청첩장은 자연스럽게 완성돼요.
          </Typography>
        </Stack>
      </Reveal>

      <Grid container spacing={{ xs: 1.5, md: 2.5 }}>
        {WORKFLOW_STEPS.map((step, idx) => (
          <Grid key={step.title} item xs={6} md={3}>
            <Reveal delay={idx * 120} y={20}>
              <WorkflowCard {...step} />
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  )
}

function WorkflowCard({ title, description, tint, icon }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: `${radii.lg}px`,
        background: 'rgba(255, 255, 255, 0.70)',
        backdropFilter: 'blur(14px) saturate(160%)',
        WebkitBackdropFilter: 'blur(14px) saturate(160%)',
        border: '1px solid rgba(255, 255, 255, 0.85)',
        boxShadow:
          '0 8px 24px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.75)',
        p: { xs: 2.25, md: 3.25 },
        minHeight: { xs: 190, md: 220 },
        textAlign: 'center',
        overflow: 'hidden',
        transition:
          'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow:
            '0 14px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.90)',
        },
      }}
    >
      {/* 우상단 컬러 글로우 */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tint}55 0%, ${tint}00 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* 아이콘 배지 */}
      <Box
        sx={{
          width: { xs: 42, md: 52 },
          height: { xs: 42, md: 52 },
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${tint} 0%, ${tint}D0 100%)`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: { xs: 1.5, md: 2 },
          boxShadow:
            '0 6px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.65)',
          color: '#fff',
        }}
      >
        <StatIcon name={icon} />
      </Box>

      <Typography
        sx={{
          fontFamily: fontFamily.sans,
          fontWeight: 800,
          fontSize: { xs: 18, md: 24 },
          letterSpacing: '-0.02em',
          color: palette.textPrimary,
          lineHeight: 1.25,
          mb: 0.75,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: { xs: 12.5, md: 14 },
          color: palette.textMuted,
          letterSpacing: '-0.01em',
          lineHeight: 1.55,
          maxWidth: 180,
          mx: 'auto',
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}

function StatIcon({ name }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  if (name === 'photo') {
    return (
      <Box component="svg" {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M21 15l-4.2-4.2a2 2 0 0 0-2.8 0L6 19" />
        <path d="M14 19l-2.5-2.5" />
      </Box>
    )
  }
  if (name === 'palette') {
    return (
      <Box component="svg" {...common}>
        <path d="M12 3a9 9 0 0 0 0 18h1.1a2.1 2.1 0 0 0 1.5-3.6 1.4 1.4 0 0 1 1-2.4H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z" />
        <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="7.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="7.5" r="1" fill="currentColor" stroke="none" />
      </Box>
    )
  }
  if (name === 'form') {
    return (
      <Box component="svg" {...common}>
        <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h4" />
      </Box>
    )
  }
  if (name === 'share') {
    return (
      <Box component="svg" {...common}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.7 10.7l6.6-3.4" />
        <path d="M8.7 13.3l6.6 3.4" />
      </Box>
    )
  }
  return null
}
