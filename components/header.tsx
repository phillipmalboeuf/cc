import { FunctionComponent } from 'react'

import styles from './header.module.scss'
import { Logo } from './logo'
import { ContentService } from '@/services/content'

{/* @ts-expect-error Async Server Component */}
export const Header: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const nav = await ContentService.navigation('header')

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
        <a href='/'>
          EN
        </a>
      </nav>
    </header>
  </>
}