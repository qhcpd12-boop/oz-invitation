import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * 위저드 모든 단계가 공유하는 draft 상태 (Phase 1: 인증 폐지).
 *  - 인증 없음. 메모리 모드로만 동작.
 *  - 결제 시점(Phase 4)에서 phoneNumber+name과 함께 Firestore에 저장된다.
 *  - Phase 3에서 localStorage 폴백 추가 예정.
 */
export function useInvitationDraft() {
  const [params] = useSearchParams()
  const templateFromUrl = params.get('template') || params.get('templateId')

  const [invitation, setInvitation] = useState(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)

  const debounceTimer = useRef(null)
  const pendingPatch = useRef({})

  useEffect(() => {
    setInvitation({
      id: 'draft-' + Date.now(),
      status: 'draft',
      templateId: templateFromUrl || null,
      slug: null,
      step: 1,
      wedding: {
        groom: '',
        groomFather: '',
        groomMother: '',
        bride: '',
        brideFather: '',
        brideMother: '',
        date: '',
        time: '',
        venue: '',
        address: '',
        greeting: '',
        contactGroom: '',
        contactBride: '',
      },
      gallery: [],
      buyerName: '',
      buyerPhone: '',
    })
    setReady(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flush = useCallback(async () => {
    // Phase 1: no-op. Phase 4 결제 시점에 Firestore 저장.
    pendingPatch.current = {}
  }, [])

  const patch = useCallback((delta) => {
    setInvitation((prev) => (prev ? { ...prev, ...delta } : prev))
    pendingPatch.current = { ...pendingPatch.current, ...delta }
  }, [])

  const patchWedding = useCallback((delta) => {
    setInvitation((prev) =>
      prev ? { ...prev, wedding: { ...prev.wedding, ...delta } } : prev,
    )
    pendingPatch.current = {
      ...pendingPatch.current,
      wedding: { ...(pendingPatch.current.wedding || {}), ...delta },
    }
  }, [])

  return { invitation, ready, error, patch, patchWedding, flush }
}
