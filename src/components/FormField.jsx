import { Stack, TextField, Typography } from '@mui/material'
import { palette } from '../theme/index.js'

/**
 * 위저드/회원가입 폼에서 라벨·헬퍼·에러를 통일한 입력 필드.
 */
export default function FormField({
  label,
  required = false,
  helperText,
  error,
  children,
  ...textFieldProps
}) {
  return (
    <Stack spacing={1}>
      {label && (
        <Typography
          component="label"
          sx={{ fontSize: 14, fontWeight: 700, color: palette.textPrimary }}
        >
          {label}
          {required && <span style={{ color: palette.primary }}> *</span>}
        </Typography>
      )}
      {children ?? <TextField error={!!error} helperText={error || helperText} {...textFieldProps} />}
    </Stack>
  )
}
