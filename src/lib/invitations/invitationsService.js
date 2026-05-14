import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { getDb } from '../firebase.js'

const COL = 'invitations'
const LOCAL_PUBLISHED_KEY = 'oz-invitation:published'

const emptyWedding = () => ({
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
  venue: '',
  address: '',
  coverImage: '',
  greetingTitle: '소중한 분들을 초대합니다',
  greeting: '',
  greetingImage: '',
  endingImage: '',
  endingMessage: '',
  contactGroom: '',
  contactBride: '',
})

/**
 * 사용자의 가장 최근 draft 한 건을 가져온다. 없으면 새로 만든다.
 *  → 위저드는 동시에 1건의 draft만 다룬다.
 */
export async function getOrCreateDraft({ userId, plan = 'standard' }) {
  if (!userId) throw new Error('userId required')
  const db = getDb()
  const colRef = collection(db, COL)

  const q = query(
    colRef,
    where('ownerId', '==', userId),
    where('status', '==', 'draft'),
    limit(1),
  )
  const snap = await getDocs(q)
  if (!snap.empty) {
    const d = snap.docs[0]
    return { id: d.id, ...d.data() }
  }

  const created = await addDoc(colRef, {
    ownerId: userId,
    status: 'draft',
    plan,
    templateId: null,
    slug: null,
    step: 1,
    wedding: emptyWedding(),
    gallery: [],
    rsvpEnabled: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  const fresh = await getDoc(created)
  return { id: fresh.id, ...fresh.data() }
}

export async function getInvitation(id) {
  const snap = await getDoc(doc(getDb(), COL, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export function subscribeInvitation(id, cb) {
  return onSnapshot(doc(getDb(), COL, id), (s) => {
    cb(s.exists() ? { id: s.id, ...s.data() } : null)
  })
}

export async function updateInvitation(id, patch) {
  await updateDoc(doc(getDb(), COL, id), {
    ...patch,
    updatedAt: serverTimestamp(),
  })
}

export async function findPublishedBySlug(slug) {
  if (!getCanUseFirebase()) {
    return (await findBlobPublishedBySlug(slug)) || findLocalPublishedBySlug(slug)
  }
  const db = getDb()
  const q = query(
    collection(db, COL),
    where('slug', '==', slug),
    where('status', 'in', ['paid', 'published']),
    limit(1),
  )
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return { id: d.id, ...d.data() }
}

export async function publishInvitation(id, slug, draft = null) {
  if (!getCanUseFirebase()) {
    const published = await publishBlobInvitation(slug, draft)
    return published || publishLocalInvitation(slug, draft)
  }

  const patch = {
    slug,
    status: 'published',
    step: 4,
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  if (draft) {
    patch.templateId = draft.templateId || null
    patch.buyerName = String(draft.buyerName || '').trim()
    patch.buyerPhone = normalizePhone(draft.buyerPhone)
    patch.wedding = draft.wedding || emptyWedding()
    patch.gallery = Array.isArray(draft.gallery) ? draft.gallery : []
    patch.themeOptions = draft.themeOptions || null
    patch.rsvpEnabled = !!draft.rsvpEnabled
  }

  await setDoc(
    doc(getDb(), COL, id),
    patch,
    { merge: true },
  )
}

export function publishLocalInvitation(slug, draft = null) {
  if (typeof window === 'undefined' || !slug || !draft) return null
  const published = readLocalPublished()
  const now = new Date().toISOString()
  const record = {
    ...draft,
    id: draft.id || `local-${slug}`,
    slug,
    status: 'published',
    step: 4,
    publishedAt: now,
    updatedAt: now,
  }
  published[slug] = record
  window.localStorage.setItem(LOCAL_PUBLISHED_KEY, JSON.stringify(published))
  return record
}

export function findLocalPublishedBySlug(slug) {
  if (!slug) return null
  return readLocalPublished()[slug] || null
}

async function publishBlobInvitation(slug, draft = null) {
  if (!slug || !draft || typeof window === 'undefined') return null
  try {
    const res = await fetch('/api/invitations/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, draft }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json?.error || 'Blob publish failed')
    if (json?.invitation) {
      publishLocalInvitation(slug, json.invitation)
      return json.invitation
    }
  } catch (e) {
    console.warn('[publishBlobInvitation] fallback to localStorage:', e?.message || e)
  }
  return null
}

async function findBlobPublishedBySlug(slug) {
  if (!slug || typeof window === 'undefined') return null
  try {
    const res = await fetch(`/api/invitations/by-slug?slug=${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    })
    if (res.status === 404) return null
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json?.error || 'Blob lookup failed')
    return json?.invitation || null
  } catch (e) {
    console.warn('[findBlobPublishedBySlug] fallback to localStorage:', e?.message || e)
    return null
  }
}

export async function findInvitationsByBuyer({ name, phoneNumber }) {
  const buyerName = String(name || '').trim()
  const buyerPhone = normalizePhone(phoneNumber)
  if (!buyerName || !buyerPhone) return []

  const q = query(
    collection(getDb(), COL),
    where('buyerName', '==', buyerName),
    where('buyerPhone', '==', buyerPhone),
    where('status', 'in', ['paid', 'published']),
    limit(10),
  )
  const snap = await getDocs(q)
  if (snap.empty) return []
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

function normalizePhone(value) {
  return String(value || '').replace(/\D+/g, '')
}

function readLocalPublished() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(LOCAL_PUBLISHED_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function getCanUseFirebase() {
  try {
    getDb()
    return true
  } catch {
    return false
  }
}
