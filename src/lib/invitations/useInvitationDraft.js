import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider.jsx'
import { isFirebaseConfigured } from '../firebase.js'
import {
  getOrCreateDraft,
  subscribeInvitation,
  updateInvitation,
} from './invitationsService.js'

/**
 * 위저드 모든 단계가 공유하는 draft 상태.
 *  - Firebase 미설정 시 메모리 모드(데모)로 동작.
 *  - patch() 는 디바운스 후 Firestore upsert.
 */
export function useInvitationDraft() {
  const { user, loading } = useAuth()
  const [params] = useSearchParams()
  const planFromUrl = params.get('plan')

  const [invitation, setInvitation] = useState(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)

  const debounceTimer = useRef(null)
  const pendingPatch = useRef({})

  // 초기 로드
  useEffect(() => {
    if (loading) return
    if (!isFirebaseConfigured) {
      setInvitation({
        id: 'demo-draft',
        ownerId: user?.uid || 'demo',
        status: 'draft',
        plan: planFromUrl || 'standard',
        templateId: null,
        slug: null,
        step: 1,
        wedding: {
          groom: '', bride: '', date: '', time: '', venue: '', address: '', greeting: '',
        },
        gallery: [],
        rsvpEnabled: true,
      })
      setReady(true)
      return
    }
    if (!user) return
    let unsub = () => {}
    ;(async () => {
      try {
        const draft = await getOrCreateDraft({
          userId: user.uid,
          plan: planFromUrl || 'standard',
        })
        setInvitation(draft)
        unsub = subscribeInvitation(draft.id, (next) => {
          if (next) setInvitation(next)
        })
        setReady(true)
      } catch (e) {
        console.error(e)
        setError(e)
        setReady(true)
      }
    })()
    return () => unsub()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  const flush = useCallback(async () => {
    if (!invitation || !isFirebaseConfigured) return
    const patch = pendingPatch.current
    pendingPatch.current = {}
    if (Object.keys(patch).length === 0) return
    try {
      await updateInvitation(invitation.id, patch)
    } catch (e) {
      console.error('[Invitation] save failed', e)
      setError(e)
    }
  }, [invitation])

  /** @param {Record<string, unknown>} delta @param {{ persist?: boolean }} [opts] persist=false 이면 UI만 갱신(예: 모의 결제 완료) */
  const patch = useCallback(
    (delta, opts = {}) => {
      const persist = opts.persist !== false
      setInvitation((prev) => (prev ? { ...prev, ...delta } : prev))
      if (!persist) return
      pendingPatch.current = { ...pendingPatch.current, ...delta }
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(flush, 500)
    },
    [flush],
  )

  const patchWedding = useCallback(
    (delta) => {
      setInvitation((prev) =>
        prev ? { ...prev, wedding: { ...prev.wedding, ...delta } } : prev,
      )
      pendingPatch.current = {
        ...pendingPatch.current,
        wedding: { ...(pendingPatch.current.wedding || {}), ...delta },
      }
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      debounceTimer.current = setTimeout(flush, 500)
    },
    [flush],
  )

  return { invitation, ready, error, patch, patchWedding, flush }
}
