// 'use client'

import { Index, Page } from '@/services/content'
import { Fragment, FunctionComponent, Suspense, useState } from 'react'
import { Media } from './media'

import styles from '@/styles/pages.module.scss'
import { Entry } from 'contentful'
import { Jobs } from './jobs'
import { Articles } from './articles'
import Link from 'next/link'

export const Pages: FunctionComponent<{
  index: Index
}> = ({ index }) => {
  // const [current, setCurrent] = useState<Entry<Page>>()

  return <nav className={styles.pages}>
    {index.items.map((page, index) => <Fragment key={page.fields.id}>
      <Link href={`/${page.fields.id}`} style={{ ['--index' as any]: index }}>
        <h2>{page.fields.title}</h2>
        <svg width="44" height="31" viewBox="0 0 44 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="-4.37114e-08" y1="15.4995" x2="43" y2="15.4995" stroke="black"/>
          <path d="M28.1793 1.00012L42.8584 15.6792L28.1793 30.3583" stroke="black"/>
        </svg>
      </Link>
      <aside style={{ ['--index' as any]: index }}>
        <PagesAside page={page} />
      </aside>
    </Fragment>)}
  </nav>
}

export const PagesAside: FunctionComponent<{
  page: Entry<Page>
}> = ({ page }) => {

  const articles = page.fields.content?.find(c => c.sys.contentType.sys.id === 'articlesList')
  const jobs = page.fields.content?.find(c => c.sys.contentType.sys.id === 'jobsList')

  return articles
    ? <figure><Articles articlesList={articles.fields} gallery /></figure>
    : jobs
      ? <figure><Jobs jobsList={jobs.fields} /></figure>
      : <Link href={`/${page.fields.id}`}>
        <figure style={{ background: page.fields.color }}>
          <Media media={page.fields.banner} sizes='(max-width: 888px) 100vh, 50vw' fill />
        </figure>
      </Link>
}