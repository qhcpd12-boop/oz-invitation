import { useState } from 'react'
import { Alert, Card, CardContent, Link as MuiLink, Stack, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { useAuth } from '../lib/auth/AuthProvider.jsx'
import { signInWithEmail } from '../lib/auth/authService.js'

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/create'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    navigate(next, { replace: true })
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setSubmitting(true)
      await signInWithEmail({ email, password })
      navigate(next, { replace: true })
    } catch (err) {
      setError(err?.message || '로그인에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionContainer tone="surface">
      <Card sx={{ maxWidth: 480, mx: 'auto', p: { xs: 3, md: 5 } }}>
        <CardContent>
          <Stack spacing={3} component="form" onSubmit={onSubmit}>
            <Stack spacing={1}>
              <Typography variant="h2" sx={{ fontSize: 32 }}>
                로그인
              </Typography>
              <Typography color="text.secondary">
                오즈청첩장에 다시 오신 것을 환영합니다.
              </Typography>
            </Stack>

            <FormField
              label="이메일"
              required
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              label="비밀번호"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <PillButton type="submit" size="large" disabled={submitting}>
              {submitting ? '로그인 중…' : '로그인'}
            </PillButton>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              아직 계정이 없으신가요?{' '}
              <MuiLink component={RouterLink} to="/signup">
                회원가입
              </MuiLink>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </SectionContainer>
  )
}
