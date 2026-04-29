import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

/**
 * Firebase 클라이언트 초기화.
 * 환경변수가 비어 있으면 init하지 않고 에러를 throw 한다.
 */
const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let _app = null
let _db = null

function ensureInit() {
  if (_app) return
  if (!cfg.apiKey || !cfg.projectId) {
    throw new Error(
      'Firebase env vars missing — set VITE_FIREBASE_* in .env.local',
    )
  }
  _app = getApps().length ? getApp() : initializeApp(cfg)
  _db = getFirestore(_app)
}

export function getFirebaseApp() {
  ensureInit()
  return _app
}

export function getDb() {
  ensureInit()
  return _db
}

export const isFirebaseConfigured = Boolean(cfg.apiKey && cfg.projectId)
