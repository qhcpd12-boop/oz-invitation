import { Grid, Stack, Typography } from '@mui/material'
import Badge from '../components/Badge.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'

const T = [
  {
    quote: '하객들이 녹음해준 축하 음성을 지금도 가끔 들어요.\n결혼식 그날의 감동이 그대로 느껴집니다.',
    avatar: '👰',
    name: '김서영 신부',
    period: '2025년 11월 예식',
  },
  {
    quote: '3분 만에 뚝딱! 이렇게 예쁜 청첩장이 이 가격이라니\n믿기지 않았습니다. 강력 추천합니다.',
    avatar: '🤵',
    name: '박준혁 신랑',
    period: '2025년 10월 예식',
  },
  {
    quote: '예식 끝나고 모든 데이터를 ZIP으로 받았어요. 사진,\n방명록, 음성 다 정리되어 있어서 완벽했어요!',
    avatar: '💑',
    name: '이지은 & 최도현',
    period: '2026년 1월 예식',
  },
]

export default function TestimonialsSection() {
  return (
    <SectionContainer tone="light" id="testimonials">
      <Stack spacing={2} alignItems="center" textAlign="center" mb={5}>
        <Badge tone="rose">실제 후기</Badge>
        <Typography variant="h2">신랑·신부님들의 후기</Typography>
      </Stack>

      <Grid container spacing={3}>
        {T.map((t) => (
          <Grid key={t.name} item xs={12} md={4}>
            <TestimonialCard {...t} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  )
}
