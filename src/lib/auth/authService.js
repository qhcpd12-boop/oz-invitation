import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDb, getFirebaseAuth } from '../firebase.js'

export function onAuthChange(cb) {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, cb)
}

export async function signUpWithEmail({ email, password, displayName, phone }) {
  const auth = getFirebaseAuth()
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(cred.user, { displayName })
  }
  await setDoc(
    doc(getDb(), 'users', cred.user.uid),
    {
      displayName: displayName ?? null,
      email,
      phone: phone ?? null,
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
  return cred.user
}

export async function signInWithEmail({ email, password }) {
  const auth = getFirebaseAuth()
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function signOutUser() {
  try {
    await signOut(getFirebaseAuth())
  } catch (e) {
    console.warn('[Auth] signOut error', e)
  }
}
