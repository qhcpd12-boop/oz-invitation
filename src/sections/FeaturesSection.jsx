import { Grid, Stack, Typography } from '@mui/material'
import Badge from '../components/Badge.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import SectionContainer from '../components/SectionContainer.jsx'

const FEATURES = [
  {
    icon: '🎨',
    title: '프리미엄 디자인',
    description: '트렌디한 10가지 이상의 디자인 템플릿으로\n나만의 개성 있는 청첩장을 완성하세요.',
    tone: 'rose',
  },
  {
    icon: '🎤',
    title: '음성 축하 메시지',
    description: '하객들이 직접 녹음한 따뜻한 축하 음성을\nMP3로 영구 보관하세요.',
    tone: 'peach',
  },
  {
    icon: '📦',
    title: '전체 데이터 백업',
    description: '예식 후 사진·방명록·음성 메시지를 ZIP으로\n다운로드하여 영원히 간직하세요.',
    tone: 'green',
  },
  {
    icon: '🗺️',
    title: '네이버 지도 연동',
    description: '결혼식장 위치를 네이버 지도와 연결하여\n하객들의 길찾기를 도와드립니다.',
    tone: 'blue',
  },
  {
    icon: '📊',
    title: 'RSVP 참석 관리',
    description: '참석 여부, 식사 인원 등을 실시간으로\n파악하여 예식 준비를 도와드립니다.',
    tone: 'yellow',
  },
  {
    icon: '💰',
    title: '초합리적 가격',
    description: '전문 업체 대비 1/10 가격! 소액 결제로\n부담 없이 프리미엄 청첩장을 만드세요.',
    tone: 'purple',
  },
]

export default function FeaturesSection() {
  return (
    <SectionContainer tone="surface" id="features">
      <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
        <Badge>핵심 기능</Badge>
        <Typography variant="h2">왜 오즈청첩장인가요?</Typography>
        <Typography variant="subtitle1" color="text.secondary">
          전문 업체 수준의 퀄리티를, 합리적인 가격에 만나보세요.
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {FEATURES.map((f) => (
          <Grid key={f.title} item xs={12} sm={6} md={4}>
            <FeatureCard {...f} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  )
}
