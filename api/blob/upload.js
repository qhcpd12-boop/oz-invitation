import { handleUpload } from '@vercel/blob/client'

/**
 * POST /api/blob/upload
 *
 * Vercel Blob client-side upload flow:
 *  1. 클라이언트가 @vercel/blob/client `upload()` 호출
 *  2. SDK가 이 endpoint에 토큰 요청
 *  3. handleUpload가 검증 후 한 번 쓸 수 있는 토큰 발급
 *  4. 클라이언트 SDK가 토큰으로 Blob에 직접 PUT
 *  5. 업로드 완료되면 onUploadCompleted 콜백 실행 (옵션)
 *
 * 필요 환경변수: BLOB_READ_WRITE_TOKEN (Vercel Storage > Blob 생성 시 자동 주입)
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
        ],
        maximumSizeInBytes: 10 * 1024 * 1024, // 10MB
        tokenPayload: JSON.stringify({}),
      }),
      onUploadCompleted: async () => {
        // 업로드 완료 후 후처리가 필요하면 여기서 (현재는 클라이언트가 URL 직접 사용)
      },
    })

    return res.status(200).json(jsonResponse)
  } catch (err) {
    console.error('[/api/blob/upload] error:', err)
    return res.status(400).json({ error: err?.message || 'Upload handler failed' })
  }
}
