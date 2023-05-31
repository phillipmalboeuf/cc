import { FunctionComponent } from 'react'

import styles from '@/styles/footer.module.scss'
// import { Logo } from './logo'
import { ContentService } from '@/services/content'
import Link from 'next/link'

{/* @ts-expect-error Async Server Component */}
export const Footer: FunctionComponent<{
  // svg: string
}> = async ({  }) => {
  const nav = await ContentService.navigation('footer')

  return <>
    <footer className={styles.footer}>
      <nav>
        {nav.fields.links.map(link => <Link key={link.sys.id} href={link.fields.path}>
          {link.fields.label}
        </Link>)}
      </nav>
    </footer>
  </>
}