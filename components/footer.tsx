import { FunctionComponent } from 'react'

import styles from './footer.module.scss'
// import { Logo } from './logo'
import { ContentService } from '@/services/content'

{/* @ts-expect-error Async Server Component */}
export const Footer: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const nav = await ContentService.navigation('footer')

  return <>
    <footer className={styles.footer}>
      <nav>
        {/* <a href='/'>
          <Logo />
        </a> */}
        {nav.fields.links.map(link => <a key={link.sys.id} href={link.fields.path}>
          {link.fields.label}
        </a>)}
      </nav>
    </footer>
  </>
}