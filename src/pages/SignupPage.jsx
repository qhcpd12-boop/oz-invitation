import { useState } from 'react'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import FormField from '../components/FormField.jsx'
import PillButton from '../components/PillButton.jsx'
import SectionContainer from '../components/SectionContainer.jsx'
import { palette, fontFamily, radii } from '../theme/index.js'
import { useAuth } from '../lib/auth/AuthProvider.jsx'
import { signUpWithEmail } from '../lib/auth/authService.js'

const SOCIALS = [
  { id: 'kakao', label: '카카오톡으로 시작하기', bg: '#FEE500', color: '#191919', mark: 'K' },
  { id: 'naver', label: '네이버로 시작하기', bg: '#03C75A', color: '#fff', mark: 'N' },
  { id: 'google', label: '구글로 시작하기', bg: '#fff', color: '#1f1f1f', mark: 'G', border: true },
  { id: 'apple', label: 'Apple로 시작하기', bg: '#000', color: '#fff', mark: '' },
]

export default function SignupPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const next = params.get('next') || '/create'

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    passwordConfirm: '',
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    navigate(next, { replace: true })
    return null
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const toggleAll = (e) => {
    const v = e.target.checked
    setForm((f) => ({
      ...f,
      agreeAll: v,
      agreeTerms: v,
      agreePrivacy: v,
      agreeMarketing: v,
    }))
  }
  const toggle = (k) => (e) => {
    const v = e.target.checked
    setForm((f) => {
      const nf = { ...f, [k]: v }
      nf.agreeAll = nf.agreeTerms && nf.agreePrivacy && nf.agreeMarketing
      return nf
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (!form.agreeTerms || !form.agreePrivacy) {
      setError('필수 약관에 동의해 주세요.')
      return
    }
    try {
      setSubmitting(true)
      await signUpWithEmail({
        email: form.email,
        password: form.password,
        displayName: form.name,
        phone: form.phone,
      })
      navigate(next, { replace: true })
    } catch (err) {
      setError(err?.message || '회원가입에 실패했습니다.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SectionContainer tone="surface">
      <Grid container spacing={4} alignItems="stretch">
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              height: '100%',
              borderRadius: `${radii.lg}px`,
              p: { xs: 4, md: 6 },
              color: '#fff',
              background: palette.ctaGradient,
            }}
          >
            <Stack spacing={3}>
              <Typography sx={{ fontFamily: fontFamily.serif, fontSize: 28, fontWeight: 700 }}>
                오즈청첩장
              </Typography>
              <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: 28, md: 36 } }}>
                당신의 특별한 날을
                <br />
                함께 만들어 갈게요
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                가입하고 3분 만에 나만의 모바일 청첩장을 완성하세요.
                <br />
                전문 업체 가격의 1/10로 프리미엄 품질을 경험합니다.
              </Typography>

              <Stack spacing={1.5} pt={1}>
                {[
                  ['🎨', '10가지 이상 프리미엄 디자인 템플릿'],
                  ['📦', '예식 후 사진·방명록·음성 메시지 전체 다운로드'],
                  ['💳', '9,900원부터 시작하는 합리적인 요금제'],
                  ['⏱️', '평균 3분이면 완성! 초간단 제작'],
                  ['🔒', '안전한 개인정보 보호 및 SSL 보안 적용'],
                ].map(([icon, label]) => (
                  <Stack key={label} direction="row" spacing={1.5} alignItems="center">
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.18)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 18,
                      }}
                    >
                      {icon}
                    </Box>
                    <Typography>{label}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ p: { xs: 3, md: 5 } }}>
            <CardContent>
              <Stack spacing={3} component="form" onSubmit={onSubmit}>
                <Box>
                  <Typography variant="h2" sx={{ fontSize: 32 }}>
                    회원가입
                  </Typography>
                  <Typography color="text.secondary" mt={1}>
                    이미 계정이 있으시면{' '}
                    <MuiLink component={RouterLink} to="/login">
                      로그인하세요
                    </MuiLink>
                    .
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  {SOCIALS.map((s) => (
                    <PillButton
                      key={s.id}
                      fullWidth
                      onClick={() => alert('소셜 로그인은 준비 중입니다.')}
                      sx={{
                        background: s.bg,
                        color: s.color,
                        border: s.border ? `1px solid ${palette.border}` : 'none',
                        '&:hover': { background: s.bg, opacity: 0.92 },
                      }}
                      startIcon={
                        s.mark && (
                          <Box
                            sx={{
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              background: 'rgba(0,0,0,0.06)',
                              display: 'grid',
                              placeItems: 'center',
                              fontWeight: 700,
                              fontSize: 13,
                            }}
                          >
                            {s.mark}
                          </Box>
                        )
                      }
                    >
                      {s.label}
                    </PillButton>
                  ))}
                </Stack>

                <Divider>또는 이메일로 가입</Divider>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="이름(성함)"
                      required
                      placeholder="홍길동"
                      value={form.name}
                      onChange={update('name')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="연락처"
                      required
                      placeholder="010-0000-0000"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormField
                      label="이메일"
                      required
                      type="email"
                      placeholder="example@email.com"
                      value={form.email}
                      onChange={update('email')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="비밀번호"
                      required
                      type="password"
                      placeholder="8자 이상, 영문+숫자 조합"
                      value={form.password}
                      onChange={update('password')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField
                      label="비밀번호 확인"
                      required
                      type="password"
                      placeholder="비밀번호를 다시 입력하세요"
                      value={form.passwordConfirm}
                      onChange={update('passwordConfirm')}
                    />
                  </Grid>
                </Grid>

                <Stack spacing={0.5}>
                  <FormControlLabel
                    control={<Checkbox checked={form.agreeAll} onChange={toggleAll} />}
                    label={<Typography fontWeight={700}>전체 동의</Typography>}
                  />
                  <Divider sx={{ my: 0.5 }} />
                  <FormControlLabel
                    control={<Checkbox checked={form.agreeTerms} onChange={toggle('agreeTerms')} />}
                    label="이용약관 동의 (필수)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={form.agreePrivacy} onChange={toggle('agreePrivacy')} />}
                    label="개인정보 수집·이용 동의 (필수)"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={form.agreeMarketing} onChange={toggle('agreeMarketing')} />}
                    label="마케팅 정보 수신 동의 (선택)"
                  />
                </Stack>

                {error && <Alert severity="error">{error}</Alert>}

                <PillButton type="submit" size="large" disabled={submitting}>
                  {submitting ? '가입 중…' : '가입하기'}
                </PillButton>

                <Typography variant="body2" color="text.secondary" textAlign="center">
                  이미 계정이 있으신가요?{' '}
                  <MuiLink component={RouterLink} to="/login">
                    로그인하기
                  </MuiLink>
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </SectionContainer>
  )
}
