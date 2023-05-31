'use client'

import { FunctionComponent, useEffect, useState } from 'react'

import styles from '@/styles/header.module.scss'
import { ContentService, Navigation } from '@/services/content'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ActiveNavigation: FunctionComponent<{
  links: Navigation['links']
}> = ({ links }) => {

  const path = usePathname()

  return <>
    {links.map(link => <Link key={link.sys.id} href={link.fields.path} className={path.startsWith(link.fields.path) ? styles['active'] : undefined}>
      {link.fields.label}
    </Link>)}
  </>
}

export const Menu: FunctionComponent<{
  links: Navigation['links'],
  footer: Navigation['links']
}> = ({ links, footer }) => {

  const path = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      document.documentElement.classList.toggle('menu', visible)
    }, visible ? 0 : 666)
    
  }, [visible])

  return <>
    <nav className={styles.mobile}>
      <Link className={styles.logo} href='/'>
        Cloud Chamber
      </Link>

      <button onClick={() => setVisible(!visible)}>{!visible ? 'Menu' : 'Close'}</button>
    </nav>
    <nav className={`${styles.menu} ${visible ? styles['visible'] : ''}`}>
      {links.map(link => <Link key={link.sys.id} href={link.fields.path} className={path.startsWith(link.fields.path) ? styles['active'] : undefined}
        onClick={() => setVisible(false)}>
        <h3>{link.fields.label}</h3>
      </Link>)}

      <nav className={`${styles.menuFooter}`}>
        {footer.map(link => <Link key={link.sys.id} href={link.fields.path} className={path.startsWith(link.fields.path) ? styles['active'] : undefined}
          onClick={() => setVisible(false)}>
          <small>{link.fields.label}</small>
        </Link>)}
      </nav>
    </nav>
  </>
}