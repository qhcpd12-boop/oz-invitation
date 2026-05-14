import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { isFirebaseConfigured } from '../firebase.js'
import { getInvitation } from './invitationsService.js'

const CURRENT_DRAFT_SESSION_KEY = 'oz-invitation:current-draft'

export function readCurrentDraftFromSession() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(CURRENT_DRAFT_SESSION_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

function writeCurrentDraftToSession(invitation) {
  if (typeof window === 'undefined' || !invitation) return
  try {
    window.sessionStorage.setItem(CURRENT_DRAFT_SESSION_KEY, JSON.stringify(invitation))
  } catch {
    /* sessionStorage 사용 불가 환경은 무시 */
  }
}

/**
 * 위저드 모든 단계가 공유하는 draft 상태.
 *  - 인증 없음. sessionStorage로 새로고침/탭 이동 사이 draft를 보존.
 *  - 결제 시점에 sessionStorage의 최신 draft를 그대로 사용.
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
            const merged = mergeWithDraftShape(existing, templateFromUrl)
            setInvitation(merged)
            writeCurrentDraftToSession(merged)
            setReady(true)
            return
          }
        } catch (e) {
          if (!cancelled) setError(e.message || '청첩장 불러오기 실패')
        }
      }

      const restored = readCurrentDraftFromSession()
      if (restored && !cancelled) {
        const merged = mergeWithDraftShape(restored, templateFromUrl || restored.templateId)
        setInvitation(merged)
        writeCurrentDraftToSession(merged)
        setReady(true)
        return
      }

      if (!cancelled) {
        const fresh = createLocalDraft(templateFromUrl)
        setInvitation(fresh)
        writeCurrentDraftToSession(fresh)
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
    pendingPatch.current = {}
  }, [])

  const patch = useCallback((delta) => {
    setInvitation((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...delta }
      writeCurrentDraftToSession(next)
      return next
    })
    pendingPatch.current = { ...pendingPatch.current, ...delta }
  }, [])

  const patchWedding = useCallback((delta) => {
    setInvitation((prev) => {
      if (!prev) return prev
      const next = { ...prev, wedding: { ...prev.wedding, ...delta } }
      writeCurrentDraftToSession(next)
      return next
    })
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
    groomLastName: '',
    groomFirstName: '',
    groomRelation: '아들',
    groomFather: '',
    groomMother: '',
    groomFatherDeceased: false,
    groomMotherDeceased: false,
    bride: '',
    brideLastName: '',
    brideFirstName: '',
    brideRelation: '딸',
    brideFather: '',
    brideMother: '',
    brideFatherDeceased: false,
    brideMotherDeceased: false,
    deceasedFlowerMark: true,
    brideFirst: false,
    date: '',
    time: '',
    showCalendar: true,
    showCountdown: true,
    countdownText: '(신랑), (신부)의 결혼식이 (D-Day)일 남았습니다.',
    venue: '',
    address: '',
    coverImage: '',
    greetingTitle: '소중한 분들을 초대합니다',
    greeting: '',
    greetingImage: '',
    endingImage: '',
    endingVisualType: 'default',
    endingEffect: 'wave',
    endingPhotoRatio: 'fixed',
    endingMessage: `장담하건대, 세상이 다 겨울이어도
우리 사랑은 늘 봄처럼 따뜻하고
간혹, 여름처럼 뜨거울 겁니다.
이수동, 사랑가`,
    endingTextBold: false,
    endingTextItalic: false,
    endingTextUnderline: false,
    endingTextAlign: 'left',
    endingTextAccent: false,
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
    themeOptions: null,
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
    themeOptions: existing.themeOptions || null,
  }
}
