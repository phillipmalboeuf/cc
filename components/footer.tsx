'use client'

import { FunctionComponent } from 'react'

import styles from '@/styles/footer.module.scss'
// import { Logo } from './logo'
import { ContentService, Navigation } from '@/services/content'
import Link from 'next/link'
import { Entry } from 'contentful'
import { usePathname } from 'next/navigation'

{/* @ts-expect-error Async Server Component */}
export const Footer: FunctionComponent<{
  nav: Entry<Navigation>
}> = async ({ nav }) => {
  const path = usePathname()

  return <>
    <footer className={styles.footer + ' ' + (['/', '/contact'].includes(path) ? styles.half : styles.full)}>
      <nav>
        {nav.fields.links.map(link => <Link key={link.sys.id} href={link.fields.path}>
          {link.fields.label}
        </Link>)}
      </nav>
    </footer>
  </>
}