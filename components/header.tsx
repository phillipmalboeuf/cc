import { FunctionComponent } from 'react'

import styles from '@/styles/header.module.scss'
import { Logo } from './logo'
import { ContentService } from '@/services/content'
import Link from 'next/link'
import { ActiveNavigation } from './navigation'

{/* @ts-expect-error Async Server Component */}
export const Header: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const [nav, offices] = await Promise.all([
    ContentService.navigation('header'),
    ContentService.offices(0)
  ])

  // const path = usePathname()
  // console.log(path)

  return <>
    <header className={styles.header}>
      <nav>
        <Link className={styles.logo} href='/'>
          <Logo />
        </Link>
        <ActiveNavigation links={nav.fields.links} />
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