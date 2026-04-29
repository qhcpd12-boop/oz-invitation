import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isFirebaseConfigured } from '../firebase.js'
import { getInvitation } from './invitationsService.js'

/**
 * 위저드 모든 단계가 공유하는 draft 상태 (Phase 1: 인증 폐지).
 *  - 인증 없음. 메모리 모드로만 동작.
 *  - 결제 시점(Phase 4)에서 phoneNumber+name과 함께 Firestore에 저장된다.
 *  - Phase 3에서 localStorage 폴백 추가 예정.
 */
export function useInvitationDraft() {
  const [params] = useSearchParams()
  const templateFromUrl = params.get('template') || params.get('templateId')
  const invitationIdFromUrl = params.get('invitationId')

  const [invitation, setInvitation] = useState(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)

  const debounceTimer = useRef(null)
  const pendingPatch = useRef({})

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      if (invitationIdFromUrl && isFirebaseConfigured) {
        try {
          const existing = await getInvitation(invitationIdFromUrl)
          if (existing && !cancelled) {
            setInvitation(mergeWithDraftShape(existing, templateFromUrl))
            setReady(true)
            return
          }
        } catch (e) {
          if (!cancelled) setError(e.message || '청첩장 불러오기 실패')
        }
      }

      if (!cancelled) {
        setInvitation(createLocalDraft(templateFromUrl))
        setReady(true)
      }
    }

    init()
    return () => {
      cancelled = true
    }
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

function emptyWedding() {
  return {
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
  }
}

function createLocalDraft(templateId) {
  return {
    id: 'draft-' + Date.now(),
    status: 'draft',
    templateId: templateId || null,
    slug: null,
    step: 1,
    wedding: emptyWedding(),
    gallery: [],
    buyerName: '',
    buyerPhone: '',
  }
}

function mergeWithDraftShape(existing, templateFromUrl) {
  return {
    ...createLocalDraft(templateFromUrl),
    ...existing,
    templateId: existing.templateId || templateFromUrl || null,
    wedding: { ...emptyWedding(), ...(existing.wedding || {}) },
    gallery: Array.isArray(existing.gallery) ? existing.gallery : [],
  }
}
