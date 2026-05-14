import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { palette, radii, shadows, fontFamily } from '../theme/index.js'

// 슬라이드용 카드 — 한 트랙 안에서 무한 가로 흐름
// 이미지 자체에 텍스트가 포함돼 있어 카드 오버레이/문구는 사용하지 않음
const SLIDES = [
  { img: '/wedding-01.png', rotate: 0, yOffset: 0, accent: true },
  { img: '/wedding-02.png', rotate: -2, yOffset: 6 },
  { img: '/wedding-03.png', rotate: 2, yOffset: -4 },
  { img: '/wedding-04.png', rotate: -3, yOffset: 8 },
  { img: '/wedding-05.png', rotate: 3, yOffset: -2 },
  { img: '/wedding-06.png', rotate: -1, yOffset: 5 },
  { img: '/wedding-07.png', rotate: 2, yOffset: -5 },
  { img: '/wedding-01.png', rotate: -2, yOffset: 7 },
]

export default function HeroSection() {
  const navigate = useNavigate()
  const loopSlides = [...SLIDES, ...SLIDES] // 무한 루프용 2회 복제

  return (
    <Box
      sx={{
        position: 'relative',
        background: `
          radial-gradient(900px 420px at 12% 12%, rgba(255, 218, 224, 0.48) 0%, rgba(255, 218, 224, 0) 70%),
          radial-gradient(820px 420px at 92% 82%, rgba(255, 226, 209, 0.38) 0%, rgba(255, 226, 209, 0) 70%),
          linear-gradient(180deg, rgba(255, 247, 248, 0.82) 0%, rgba(253, 247, 243, 0.96) 100%)
        `,
        overflow: 'hidden',
        minHeight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <HeroDecor />
      <SectionContainer
        tone="transparent"
        py={{ xs: 4, md: 5 }}
        innerSx={{ px: 0, position: 'relative', zIndex: 1, width: '100%' }}
      >
        <Stack
          spacing={{ xs: 2.5, md: 3 }}
          alignItems="center"
          textAlign="center"
          sx={{ width: '100%' }}
        >
          {/* 헤더 카피 */}
          <Stack spacing={0.25} alignItems="center" sx={{ maxWidth: 720, px: 2 }}>
            <Typography
              sx={{
                color: palette.textPlaceholder,
                fontWeight: 700,
                fontSize: { xs: 14, md: 18 },
                letterSpacing: '-0.01em',
              }}
            >
              사진으로 완성하는 모바일 청첩장
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: fontFamily.sans,
                fontWeight: 800,
                fontSize: { xs: 24, sm: 30, md: 36 },
                lineHeight: 1.22,
                letterSpacing: '-0.03em',
                color: palette.textPrimary,
              }}
            >
              우리 분위기에 맞는 청첩장을 쉽게 완성해요.
            </Typography>
          </Stack>

          {/* 가로 무한 슬라이드 트랙 — viewport 전체 폭으로 확장 */}
          <Box
            sx={{
              position: 'relative',
              width: '100vw',
              maxWidth: '100vw',
              ml: 'calc(-50vw + 50%)',
              mr: 'calc(-50vw + 50%)',
              height: { xs: 250, sm: 285, md: 315 },
              py: { xs: 0.5, md: 1 },
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                width: 'max-content',
                height: '100%',
                alignItems: 'center',
                animation: 'oz-hero-slide 60s linear infinite',
                '@keyframes oz-hero-slide': {
                  from: { transform: 'translateX(0)' },
                  to: { transform: 'translateX(-50%)' },
                },
                '&:hover': { animationPlayState: 'paused' },
              }}
            >
              {loopSlides.map((slide, idx) => (
                <Box
                  key={idx}
                  sx={{
                    transform: `translateY(${slide.yOffset}px) rotate(${slide.rotate}deg)`,
                    flexShrink: 0,
                  }}
                >
                  <InvitationCard
                    img={slide.img}
                    accent={slide.accent}
                    width={{ xs: 150, md: 170 }}
                    height={{ xs: 215, md: 240 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* CTA */}
          <Stack
            spacing={1.1}
            alignItems="center"
            sx={{ width: '100%', maxWidth: 320, px: 2, mt: { xs: 0.25, md: 0.5 } }}
          >
            <PillButton
              variant="filled"
              size="large"
              fullWidth
              onClick={() => navigate('/create/design')}
            >
              청첩장 제작하기
            </PillButton>
            <PillButton
              variant="light"
              size="large"
              fullWidth
              onClick={() => navigate('/pricing')}
            >
              디자인 샘플 보기
            </PillButton>
          </Stack>
        </Stack>
      </SectionContainer>
    </Box>
  )
}

function InvitationCard({ img, width, height, accent = false }) {
  return (
    <Box
      sx={{
        width,
        height,
        borderRadius: `${radii.md}px`,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: accent ? '0 14px 38px rgba(45,45,45,0.12)' : '0 8px 22px rgba(45,45,45,0.08)',
        background: '#fff',
      }}
    >
      <Box
        component="img"
        src={img}
        alt=""
        loading="lazy"
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        transform: 'scale(1.018)',
        display: 'block',
      }}
    />
    </Box>
  )
}

function HeroDecor() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 좌상단 큰 블러 글로우 */}
      <Box
        sx={{
          position: 'absolute',
          top: -120,
          left: -120,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 192, 203, 0.45) 0%, rgba(255, 192, 203, 0) 70%)',
          filter: 'blur(20px)',
        }}
      />
      {/* 우하단 피치 글로우 */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -140,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 213, 187, 0.45) 0%, rgba(255, 213, 187, 0) 70%)',
          filter: 'blur(24px)',
        }}
      />

      {/* 꽃잎 데코 — 좌상단 */}
      <Box sx={{ position: 'absolute', top: '8%', left: '6%', opacity: 0.55, transform: 'rotate(-18deg)', display: { xs: 'none', sm: 'block' } }}>
        <Petal size={56} fill="#F9C2C9" />
      </Box>
      {/* 꽃잎 — 우상단 */}
      <Box sx={{ position: 'absolute', top: '14%', right: '7%', opacity: 0.5, transform: 'rotate(28deg)', display: { xs: 'none', sm: 'block' } }}>
        <Petal size={44} fill="#F7BFA8" />
      </Box>
      {/* 꽃 — 좌하단 */}
      <Box sx={{ position: 'absolute', bottom: '10%', left: '4%', opacity: 0.45, display: { xs: 'none', md: 'block' } }}>
        <Bloom size={64} fill="#F9C2C9" core="#E7889A" />
      </Box>
      {/* 잔잎 — 우하단 */}
      <Box sx={{ position: 'absolute', bottom: '12%', right: '5%', opacity: 0.45, transform: 'rotate(14deg)', display: { xs: 'none', md: 'block' } }}>
        <Leaf size={62} fill="#E9C9B6" />
      </Box>

      {/* 작은 도트들 */}
      <Box sx={{ position: 'absolute', top: '22%', left: '14%', width: 6, height: 6, borderRadius: '50%', background: '#F4B4C0', opacity: 0.55 }} />
      <Box sx={{ position: 'absolute', top: '38%', right: '12%', width: 4, height: 4, borderRadius: '50%', background: '#F1B89E', opacity: 0.55 }} />
      <Box sx={{ position: 'absolute', bottom: '24%', left: '20%', width: 5, height: 5, borderRadius: '50%', background: '#F9D6DA', opacity: 0.7 }} />
      <Box sx={{ position: 'absolute', top: '10%', left: '38%', width: 4, height: 4, borderRadius: '50%', background: '#F6C8A8', opacity: 0.6, display: { xs: 'none', md: 'block' } }} />
      <Box sx={{ position: 'absolute', bottom: '14%', right: '28%', width: 6, height: 6, borderRadius: '50%', background: '#F4B4C0', opacity: 0.5, display: { xs: 'none', md: 'block' } }} />
    </Box>
  )
}

function Petal({ size = 48, fill = '#F4B4C0' }) {
  return (
    <Box
      component="svg"
      width={size}
      height={size * 1.15}
      viewBox="0 0 40 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.06))' }}
    >
      <path
        d="M20 2 C30 6, 36 18, 32 32 C29 40, 24 44, 20 42 C16 44, 11 40, 8 32 C4 18, 10 6, 20 2 Z"
        fill={fill}
      />
      <path
        d="M20 10 C25 13, 28 20, 26 28 C24 33, 21 35, 20 33 C19 35, 16 33, 14 28 C12 20, 15 13, 20 10 Z"
        fill="rgba(255,255,255,0.30)"
      />
      <path
        d="M20 8 L20 38"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </Box>
  )
}

function Bloom({ size = 56, fill = '#F4B4C0', core = '#E59AA8' }) {
  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="18"
          rx="9"
          ry="14"
          fill={fill}
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="6" fill={core} />
    </Box>
  )
}

function Leaf({ size = 56, fill = '#D7C5AE' }) {
  return (
    <Box
      component="svg"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 56 C20 24, 44 12, 60 8 C56 26, 40 50, 8 56 Z"
        fill={fill}
      />
      <path
        d="M14 50 L52 14"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.2"
      />
    </Box>
  )
}
