'use client'
 
import { FunctionComponent } from 'react'
import { useFormStatus } from 'react-dom'
 
export const SubmitButton: FunctionComponent<{
  label: string
  disabled?: boolean
}> = ({ label, disabled }) => {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending || disabled} aria-disabled={pending || disabled}>
      {pending ? 'One moment...' : label}
    </button>
  )
}