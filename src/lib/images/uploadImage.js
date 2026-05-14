import { upload } from '@vercel/blob/client'

const MAX_EDGE = 1200
const JPEG_QUALITY = 0.88
const MAX_BYTES = 5 * 1024 * 1024
const LOCAL_MAX_EDGE = 900
const LOCAL_QUALITY = 0.8
const BLOB_UPLOAD_ENDPOINT = '/api/blob/upload'

/**
 * 이미지 업로드 — Vercel Blob → 실패 시 base64 fallback.
 *  1. 리사이즈 (max 1200px, JPEG 0.88)
 *  2. Vercel Blob client upload (presigned URL → 직접 PUT)
 *  3. /api/blob/upload 가 응답 안 하거나 실패하면 base64 data URL로 fallback
 *     (로컬 dev에서 vercel dev 없이도 미리보기가 작동)
 */
export async function uploadImage(file, { invitationId = 'temp', index = 0 } = {}) {
  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드할 수 있습니다.')
  }

  const resized = await resizeImage(file, MAX_EDGE, JPEG_QUALITY)
  if (resized.size > MAX_BYTES) {
    throw new Error('이미지가 너무 큽니다. 5MB 이하 이미지로 시도해 주세요.')
  }

  const ext = guessExt(resized.type)
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${index}`
  const pathname = `invitations/${sanitize(invitationId)}/${id}.${ext}`

  // 같은 origin에 Serverless API가 있는지 (Vercel 배포 또는 vercel dev) 가벼운 사전 체크
  try {
    const result = await withTimeout(
      upload(pathname, resized, {
        access: 'public',
        handleUploadUrl: BLOB_UPLOAD_ENDPOINT,
        contentType: resized.type || 'image/jpeg',
      }),
      25000,
      'Vercel Blob 업로드가 응답하지 않습니다.',
    )
    return result.url
  } catch (err) {
    console.warn('[uploadImage] Vercel Blob 실패, base64 fallback:', err?.message || err)
    const compact = await resizeImage(file, LOCAL_MAX_EDGE, LOCAL_QUALITY)
    return blobToDataUrl(compact)
  }
}

function withTimeout(promise, ms, message) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), ms)
    promise.then(
      (value) => {
        clearTimeout(timer)
        resolve(value)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      },
    )
  })
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('이미지 읽기에 실패했습니다.'))
    reader.readAsDataURL(blob)
  })
}

async function resizeImage(file, maxEdge, quality) {
  const image = await loadImage(file)
  const { width, height } = fitSize(image.width, image.height, maxEdge)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('이미지 처리 컨텍스트를 생성할 수 없습니다.')
  ctx.drawImage(image, 0, 0, width, height)

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', quality)
  })
  if (!blob) throw new Error('이미지 변환에 실패했습니다.')
  return blob
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      resolve(image)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('이미지 로드에 실패했습니다.'))
    }
    image.src = url
  })
}

function fitSize(width, height, maxEdge) {
  const longest = Math.max(width, height)
  if (longest <= maxEdge) return { width, height }
  const ratio = maxEdge / longest
  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  }
}

function guessExt(contentType) {
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('gif')) return 'gif'
  return 'jpg'
}

function sanitize(value) {
  return String(value || 'temp').replace(/[^a-zA-Z0-9_-]/g, '')
}
