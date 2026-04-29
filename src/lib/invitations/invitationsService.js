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

const emptyWedding = () => ({
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
    patch.rsvpEnabled = !!draft.rsvpEnabled
  }

  await setDoc(
    doc(getDb(), COL, id),
    patch,
    { merge: true },
  )
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
