'use client'

import { FunctionComponent, useState } from 'react'

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
  links: Navigation['links']
}> = ({ links }) => {

  const path = usePathname()
  const [visible, setVisible] = useState(false)

  return <>
    <nav className={styles.mobile}>
      <Link className={styles.logo} href='/'>
        Cloud Chamber
      </Link>

      <button onClick={() => setVisible(!visible)}>{!visible ? 'Menu' : 'Close'}</button>
    </nav>
    <nav className={`${styles.menu} ${visible ? styles['visible'] : ''}`}>
      {links.map(link => <Link key={link.sys.id} href={link.fields.path} className={path.startsWith(link.fields.path) ? styles['active'] : undefined}>
        <h3>{link.fields.label}</h3>
      </Link>)}
    </nav>
  </>
}