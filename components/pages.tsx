import { Index } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'

import styles from '@/styles/pages.module.scss'

export const Pages: FunctionComponent<{
  index: Index
}> = ({ index }) => {
  return <nav className={styles.pages}>
    {index.items.map(page => <Fragment key={page.fields.id}>
      <a href={`/${page.fields.id}`}>
        <h3>{page.fields.title}</h3>
        <svg width="44" height="31" viewBox="0 0 44 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="-4.37114e-08" y1="15.4995" x2="43" y2="15.4995" stroke="black"/>
          <path d="M28.1793 1.00012L42.8584 15.6792L28.1793 30.3583" stroke="black"/>
        </svg>
      </a>
      <aside>
        <figure style={{ background: page.fields.color }}>
          {page.fields.banner && <Image src={`https:${page.fields.banner.fields.file.url}`} alt={page.fields.banner.fields.title} fill sizes='(max-width: 888px) 100vw, 50vw' style={{ objectFit: 'cover' }} />}
        </figure>
      </aside>
    </Fragment>)}
  </nav>
}