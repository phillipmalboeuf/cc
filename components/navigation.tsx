'use client'

import { FunctionComponent } from 'react'

import styles from '@/styles/header.module.scss'
import { Logo } from './logo'
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