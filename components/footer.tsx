import { FunctionComponent } from 'react'

import styles from '@/styles/footer.module.scss'
// import { Logo } from './logo'
import { ContentService, Navigation } from '@/services/content'
import Link from 'next/link'
import { Entry } from 'contentful'
import { ActiveNavigation } from './navigation'
import { SVG } from './svgs'

{/* @ts-expect-error Async Server Component */}
export const Footer: FunctionComponent<{
  // nav: Entry<Navigation>
}> = async ({ }) => {
  const [nav, copyright] = await Promise.all([
    ContentService.navigation('footer'),
    ContentService.navigation('copyright'),
  ])

  return <>
    <footer className={styles.footer}>
      <figure>
        <SVG />
      </figure>
      <main>
        <small>
          <p>{copyright.fields.description}</p>
          <p><a href='http://caserne.com' target='_blank' rel='noopener noreferrer'>Design par Caserne</a></p>
        </small>
        
        <nav>
          <ActiveNavigation links={nav.fields.links} />
        </nav>
        <nav>
          <ActiveNavigation links={copyright.fields.links} />
        </nav>
        <figure>
          <SVG />
        </figure>
      </main>
    </footer>
  </>
}