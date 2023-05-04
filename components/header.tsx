import { FunctionComponent } from 'react'

import styles from '@/styles/header.module.scss'
import { Logo } from './logo'
import { ContentService } from '@/services/content'

{/* @ts-expect-error Async Server Component */}
export const Header: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const [nav, offices] = await Promise.all([
    ContentService.navigation('header'),
    ContentService.offices(0)
  ])

  return <>
    <header className={styles.header}>
      <nav>
        <a href='/'>
          <Logo />
        </a>
        {nav.fields.links.map(link => <a key={link.sys.id} href={link.fields.path}>
          {link.fields.label}
        </a>)}
      </nav>
      <nav>
        <ul>
          {offices.items.map(office => <li key={office.sys.id}>
            <a href={office.fields.link}>{office.fields.initials}</a>
          </li>)}
        </ul>
        <a href='/'>
          EN
        </a>
      </nav>
    </header>
  </>
}