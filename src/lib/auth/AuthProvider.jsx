import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthChange, signOutUser } from './authService.js'

const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: async () => { },
  signIn: async () => { },
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub = () => { }
    try {
      unsub = onAuthChange((u) => {
        setUser(u)
        setLoading(false)
      })
    } catch (e) {
      // Firebase 미설정(환경변수 없음)일 때 — 비로그인 상태로 진행
      console.warn('[Auth] Firebase init skipped:', e?.message)
      setUser(null)
      setLoading(false)
    }
    return () => unsub()
  }, [])

  // UI 테스트용 가짜 로그인 함수
  const mockSignIn = async () => {
    setUser({ uid: 'test-uid', email: 'test@oz.com', displayName: '테스트 유저' })
  }

  // UI 테스트용 가짜 로그아웃 함수
  const mockSignOut = async () => {
    setUser(null)
    try { await signOutUser() } catch (e) { } // 실제 firebase 연동이 안 되어 있어도 에러 무시
  }

  const value = useMemo(
    () => ({ user, loading, signOut: mockSignOut, signIn: mockSignIn }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
