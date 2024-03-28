// import { useState, useEffect } from 'react'

export function useLocale() {
  // const [locale, setLocale] = useState(process.env.NEXT_PUBLIC_LOCALE)

  // useEffect(() => {
  // }, [])

  return process.env.NEXT_PUBLIC_LOCALE
}