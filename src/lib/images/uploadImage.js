import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getStorageClient } from '../firebase.js'

const MAX_EDGE = 1200
const JPEG_QUALITY = 0.88
const MAX_BYTES = 5 * 1024 * 1024

export async function uploadImage(file, { invitationId = 'temp', index = 0 } = {}) {
  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드할 수 있습니다.')
  }

  const resized = await resizeImage(file, MAX_EDGE, JPEG_QUALITY)
  if (resized.size > MAX_BYTES) {
    throw new Error('이미지가 너무 큽니다. 5MB 이하 이미지로 시도해 주세요.')
  }

  const ext = guessExt(file.type)
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${index}`
  const path = `invitations/${sanitize(invitationId)}/${id}.${ext}`
  const storageRef = ref(getStorageClient(), path)

  await uploadBytes(storageRef, resized, {
    contentType: resized.type || 'image/jpeg',
    cacheControl: 'public,max-age=31536000,immutable',
  })
  return getDownloadURL(storageRef)
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
  return 'jpg'
}

function sanitize(value) {
  return String(value || 'temp').replace(/[^a-zA-Z0-9_-]/g, '')
}

