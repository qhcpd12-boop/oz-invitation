import { createContext, useContext } from 'react'

export const InvitationDraftContext = createContext(null)

export function useDraft() {
  const ctx = useContext(InvitationDraftContext)
  if (!ctx) throw new Error('useDraft must be used inside CreateLayout')
  return ctx
}
