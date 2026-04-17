import { Grid } from '@mui/material'
import SectionContainer from '../components/SectionContainer.jsx'
import StatBlock from '../components/StatBlock.jsx'

const STATS = [
  ['20,000+', '제작된 청첩장'],
  ['4.9', '평균 고객 만족도'],
  ['98%', '재이용 추천율'],
  ['3분', '평균 제작 시간'],
]

export default function StatsSection() {
  return (
    <SectionContainer tone="light" py={{ xs: 5, md: 8 }} id="stats">
      <Grid container spacing={3}>
        {STATS.map(([v, l]) => (
          <Grid key={l} item xs={6} md={3}>
            <StatBlock value={v} label={l} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  )
}
