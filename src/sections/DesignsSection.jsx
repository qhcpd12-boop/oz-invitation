import { Box, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import PillButton from '../components/PillButton.jsx'
import PhoneMockup from '../components/PhoneMockup.jsx'
import SectionContainer from '../components/SectionContainer.jsx'

export default function DesignsSection() {
  const navigate = useNavigate()
  return (
    <SectionContainer tone="surface" id="designs">
      <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
        <Badge>10+ 디자인</Badge>
        <Typography variant="h2">취향대로 고르는 청첩장</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          럭셔리·가든·클래식 등 다양한 스타일을 지금 미리 확인해 보세요.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <PhoneMockup variant="luxury" />
        <PhoneMockup variant="garden" />
        <PhoneMockup variant="classic" venue="더 그랜드볼룸" />
      </Box>

      <Stack alignItems="center" mt={5}>
        <PillButton onClick={() => navigate('/pricing')}>전체 디자인 보기</PillButton>
      </Stack>
    </SectionContainer>
  )
}
