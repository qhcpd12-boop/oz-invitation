import { Box, Grid, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import Reveal from '../components/Reveal.jsx'
import { palette, radii, shadows } from '../theme/index.js'

const TEMPLATES = [
  { img: '/wedding-01.png', title: '클린 포토', desc: '사진이 먼저 보이는 차분한 구성' },
  { img: '/wedding-02.png', title: '내추럴 웨딩', desc: '밝고 따뜻한 야외 무드' },
  { img: '/wedding-03.png', title: '클래식 스튜디오', desc: '단정한 인물 중심 레이아웃' },
  { img: '/wedding-04.png', title: '모던 블랙', desc: '선명한 대비와 고급스러운 톤' },
  { img: '/wedding-05.png', title: '소프트 레터', desc: '여백이 살아있는 편지형 구성' },
  { img: '/wedding-06.png', title: '무드 라이트', desc: '따뜻한 조명과 깊이감 있는 사진' },
]

export default function DesignsSection() {
  const navigate = useNavigate()

  return (
    <SectionContainer tone="light" py={{ xs: 7, md: 11 }} id="designs">
      <Reveal>
        <Stack spacing={1.5} alignItems="center" textAlign="center" mb={{ xs: 4, md: 6 }}>
          <Badge>디자인 미리보기</Badge>
          <Typography variant="h2">사진이 돋보이는 청첩장</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 620 }}>
            이미지 위에 불필요한 문구를 얹지 않고, 두 사람의 사진과 청첩장 분위기가 먼저 보이도록 구성했어요.
          </Typography>
        </Stack>
      </Reveal>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {TEMPLATES.map((template, idx) => (
          <Grid key={template.title} item xs={12} sm={6} md={4}>
            <Reveal delay={idx * 90} y={24}>
              <TemplateCard {...template} />
            </Reveal>
          </Grid>
        ))}
      </Grid>

      <Reveal delay={420}>
        <Stack alignItems="center" mt={{ xs: 4, md: 5 }}>
          <PillButton onClick={() => navigate('/pricing')}>전체 디자인 보기</PillButton>
        </Stack>
      </Reveal>
    </SectionContainer>
  )
}

function TemplateCard({ img, title, desc }) {
  return (
    <Box
      sx={{
        height: '100%',
        borderRadius: `${radii.lg}px`,
        background: 'rgba(255,255,255,0.78)',
        border: '1px solid rgba(255,255,255,0.84)',
        boxShadow: shadows.card,
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 16px 42px rgba(0,0,0,0.10)',
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: '4 / 5',
          overflow: 'hidden',
          background: palette.surface,
        }}
      >
        <Box
          component="img"
          src={img}
          alt=""
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.02)',
            display: 'block',
          }}
        />
      </Box>
      <Stack spacing={0.75} sx={{ p: { xs: 2.25, md: 2.5 } }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 17, md: 18 }, color: palette.textPrimary }}>
          {title}
        </Typography>
        <Typography sx={{ color: palette.textMuted, fontSize: 14, lineHeight: 1.6 }}>
          {desc}
        </Typography>
      </Stack>
    </Box>
  )
}
