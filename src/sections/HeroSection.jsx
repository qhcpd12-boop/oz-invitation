import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import PillButton from '../components/PillButton.jsx'
import PhoneMockup from '../components/PhoneMockup.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import GradientText from '../components/GradientText.jsx'
import { palette, fontFamily } from '../theme/index.js'

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        position: 'relative',
        background: `radial-gradient(1200px 600px at 20% 0%, ${palette.pinkSoft} 0%, transparent 60%), linear-gradient(180deg, #FFF5F1 0%, ${palette.surface} 100%)`,
        overflow: 'hidden',
      }}
    >
      <SectionContainer tone="transparent" py={{ xs: 6, md: 10 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 6 }}
          alignItems={{ md: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={3} sx={{ flex: 1, maxWidth: 620 }}>
            <Box>
              <Badge>✨ 2만 커플이 선택한 모바일 청첩장</Badge>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontFamily: fontFamily.serif,
                fontWeight: 700,
                fontSize: { xs: 36, sm: 44, md: 56 },
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
              }}
            >
              우리만의 특별한 순간을
              <br />
              <GradientText>아름다운 청첩장</GradientText>으로
              <br />
              영원히 간직하세요
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              전문 업체 가격의 1/10로 프리미엄 모바일 청첩장을 만들어 보세요.
              <br />
              예식 후 사진·방명록·축하 음성까지 모두 다운로드하여 영구 보관할 수 있습니다.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <PillButton size="large" onClick={() => navigate('/signup')}>
                지금 바로 만들기 →
              </PillButton>
              <PillButton size="large" variant="outline" onClick={() => navigate('/pricing')}>
                디자인 미리보기
              </PillButton>
            </Stack>
          </Stack>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: 460,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <PhoneMockup variant="luxury" rotate={-6} width={180} />
              </Box>
              <PhoneMockup variant="garden" width={210} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <PhoneMockup variant="classic" rotate={6} width={180} venue="더 그랜드볼룸" />
              </Box>
            </Box>
          </Box>
        </Stack>
      </SectionContainer>
    </Box>
  )
}
