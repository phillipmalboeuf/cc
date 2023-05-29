import { useState, useEffect } from 'react'

export function usePhone() {
  const [isPhone, setIsPhone] = useState(false)

  useEffect(() => {
    if (window.innerWidth <= 888) {
      setIsPhone(true)
    }
  }, [])

  return isPhone
}