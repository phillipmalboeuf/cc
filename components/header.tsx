import { FunctionComponent } from 'react'

import styles from '@/styles/header.module.scss'
import { ContentService } from '@/services/content'
import Link from 'next/link'
import { ActiveNavigation, Menu } from './navigation'
import { PetitLogo } from './3d'

{/* @ts-expect-error Async Server Component */}
export const Header: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const [nav, footer, offices] = await Promise.all([
    ContentService.navigation('header'),
    ContentService.navigation('footer'),
    ContentService.offices(0),
  ])

  // const path = usePathname()
  // console.log(path)

  return <>
    <header className={styles.header}>
      <nav>
        <Link className={styles.logo} href='/'>
          <PetitLogo />
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

      <Menu links={nav.fields.links} footer={footer.fields.links} />
    </header>
  </>
}