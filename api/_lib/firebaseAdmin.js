import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

/**
 * Vercel Serverless에서 사용하는 Firebase Admin 싱글턴.
 * 환경변수
 *   FIREBASE_ADMIN_PROJECT_ID
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY  (개행은 \n 으로 저장)
 */
function buildCredential() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n')
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('FIREBASE_ADMIN_* env vars are missing')
  }
  return cert({ projectId, clientEmail, privateKey })
}

export function getAdminApp() {
  if (getApps().length) return getApps()[0]
  return initializeApp({ credential: buildCredential() })
}

export function getAdminDb() {
  return getFirestore(getAdminApp())
}
