import { Grid, Stack, Typography } from '@mui/material'
import Badge from '../components/Badge.jsx'
import FeatureCard from '../components/FeatureCard.jsx'
import SectionContainer from '../components/SectionContainer.jsx'

const FEATURES = [
  {
    icon: '🎨',
    title: '프리미엄 디자인 템플릿',
    description: '럭셔리·가든·클래식 등 다양한 스타일의\n디자인 템플릿을 자유롭게 선택할 수 있어요.',
    tone: 'rose',
  },
  {
    icon: '📱',
    title: '모바일 최적화 청첩장',
    description: '하객들이 휴대폰에서 빠르고 편하게\n열어볼 수 있는 모바일 퍼스트 디자인입니다.',
    tone: 'peach',
  },
  {
    icon: '✏️',
    title: '3단계 간편 제작',
    description: '디자인 선택 → 정보 입력 → 결제까지,\n간단한 흐름으로 누구나 쉽게 만들 수 있어요.',
    tone: 'green',
  },
  {
    icon: '💌',
    title: '청첩장 링크 공유',
    description: '카톡·문자로 청첩장 링크 한 번에 공유.\n발행된 URL로 어디서든 열어볼 수 있습니다.',
    tone: 'blue',
  },
  {
    icon: '📊',
    title: 'RSVP 참석 관리',
    description: '하객의 참석 여부와 식사 인원을 받아\n예식 준비를 한결 수월하게 도와드립니다.',
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
