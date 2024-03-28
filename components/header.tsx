import { FunctionComponent } from 'react'

import styles from '@/styles/header.module.scss'
import { ContentService } from '@/services/content'
import Link from 'next/link'
import { ActiveNavigation, LocaleSwitch, Menu, Time } from './navigation'
import { PetitLogo } from './3d'
import { useLocale } from '@/helpers/locales'

{/* @ts-expect-error Async Server Component */}
export const Header: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const [nav, footer, offices] = await Promise.all([
    ContentService.navigation('header'),
    ContentService.navigation('footer'),
    ContentService.offices(0),
  ])

  const locale = useLocale()

  return <>
    <header className={styles.header}>
      <nav>
        <Link className={styles.logo} href='/'>
          {/* <PetitLogo /> */}
          Cloud Chamber
        </Link>
        <ActiveNavigation links={nav.fields.links} />
      </nav>
      <nav>
        <ul>
          {offices.items.map(office => <li key={office.sys.id}>
            <Link href={office.fields.link || '/'}>{office.fields.initials}&nbsp;<Time office={office.fields} /></Link>
          </li>)}
        </ul>

        <div><LocaleSwitch currentLocale={locale} /></div>
      </nav>

      <Menu links={nav.fields.links} footer={footer.fields.links} />
    </header>
  </>
}