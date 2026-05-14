import { Box } from '@mui/material'
import { radii } from '../theme/index.js'

export default function TemplateCoverImage({ src, alt = '청첩장 사진', aspectRatio = '4 / 5', sx }) {
  if (!src) return null

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        display: 'block',
        width: '100%',
        aspectRatio,
        objectFit: 'cover',
        borderRadius: `${radii.md}px`,
        ...sx,
      }}
    />
  )
}
