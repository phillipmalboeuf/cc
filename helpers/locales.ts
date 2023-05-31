// import { useState, useEffect } from 'react'

export function useLocale() {
  // const [locale, setLocale] = useState(process.env.LOCALE)

  // useEffect(() => {
  // }, [])

  return process.env.LOCALE
}