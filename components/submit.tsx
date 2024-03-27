'use client'
 
import { FunctionComponent } from 'react'
import { useFormStatus } from 'react-dom'
 
export const SubmitButton: FunctionComponent<{
  label: string
}> = ({ label }) => {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? 'One moment...' : label}
    </button>
  )
}