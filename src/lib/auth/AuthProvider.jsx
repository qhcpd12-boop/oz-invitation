import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthChange, signOutUser } from './authService.js'

const AuthContext = createContext({
  user: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsub = () => {}
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

  const value = useMemo(
    () => ({ user, loading, signOut: signOutUser }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
