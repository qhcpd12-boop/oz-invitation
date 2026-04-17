import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { palette, radii } from '../theme/index.js'

/**
 * 요금제 비교표.
 *  columns: [{ key, label, highlight? }]
 *  rows: [{ label, values: { key: string|boolean } }]
 */
export default function ComparisonTable({ columns, rows }) {
  const renderCell = (v) => {
    if (v === true) return <Box sx={{ color: palette.primary, fontWeight: 700 }}>✓</Box>
    if (v === false) return <Box sx={{ color: palette.textPlaceholder }}>✕</Box>
    return <Typography variant="body2">{v}</Typography>
  }

  return (
    <Box
      sx={{
        borderRadius: `${radii.lg}px`,
        border: `1px solid ${palette.border}`,
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ background: palette.surface }}>
            <TableCell sx={{ fontWeight: 700 }}>기능</TableCell>
            {columns.map((c) => (
              <TableCell
                key={c.key}
                align="center"
                sx={{
                  fontWeight: 700,
                  color: c.highlight ? palette.primary : 'inherit',
                  background: c.highlight ? palette.pinkSoft : 'transparent',
                }}
              >
                {c.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell sx={{ color: 'text.secondary' }}>{r.label}</TableCell>
              {columns.map((c) => (
                <TableCell key={c.key} align="center">
                  {renderCell(r.values[c.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
