'use client'

import { Article, Articles as ContentArticles, ContentService, Job } from '@/services/content'
import { Fragment, FunctionComponent, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Entry, EntryCollection } from 'contentful'
import { useRouter } from 'next/navigation'
import { Media } from './media'

import styles from '@/styles/articles.module.scss'
import { Time } from './time'
import { Tags } from './tags'
import { usePhone } from '@/helpers/devices'
import Link from 'next/link'

export const ArticlesGrid: FunctionComponent<{
  tag: string
  articles: EntryCollection<Article>
}> = ({ tag, articles }) => {

  const [current, setCurrent] = useState<Entry<Article>>()
  // const [cursor, setCursor] = useState<{ left: number, top: number }>()
  const phone = usePhone()

  return phone
  ? <ol>
    {articles.items.map((article, i) => <Fragment key={article.sys.id}>
      <li>
        <nav>
          <Time d={article.fields.publishedAt} />
          <Tags tags={article.fields.tags} path={`/${tag}/articles`} />
        </nav>
        <Link href={`/${tag}/articles/${article.fields.id}`}>
          <h4>{article.fields.title}</h4>
          <figure>
            <Media media={article.fields.media} sizes='(max-width: 888px) 100vw, 33vw' fill />
          </figure>
        </Link>
      </li>
    </Fragment>)}
  </ol>
  : <>
    <nav>
      {articles.items.map((article, i) => <Fragment key={article.sys.id}>
        <Link href={`/${tag}/articles/${article.fields.id}`}
          onPointerEnter={() => setCurrent(article)}
          onPointerLeave={() => setCurrent(undefined)}
          className={current?.fields.id === article.fields.id ? styles['current'] : undefined}
        >
          <nav>
            <Time d={article.fields.publishedAt} />
            <Tags tags={article.fields.tags} path={`/${tag}/articles`} noLinks />
          </nav>

          <h4>{article.fields.title}</h4>
        </Link>
      </Fragment>)}
    </nav>
    <ol>
      {articles.items.map((article, i) => <Fragment key={article.sys.id}>
        <li>
          
          <Link href={`/${tag}/articles/${article.fields.id}`}
            onPointerEnter={() => setCurrent(article)}
            onPointerLeave={() => setCurrent(undefined)}
            className={current?.fields.id === article.fields.id ? styles['current'] : undefined}
          >
            <figure>
              <Media media={article.fields.media} sizes='(max-width: 888px) 100vw, 50vw' fill />
              <figcaption style={{ backgroundColor: article.fields.tags.find(t => !['culture', 'news'].includes(t.fields.id))?.fields.color }}>
                <nav>
                  <Time d={article.fields.publishedAt} />
                  <Tags tags={article.fields.tags} path={`/${tag}/articles`} noLinks />
                </nav>
                
                <h3>{article.fields.title}</h3>
              </figcaption>
            </figure>
          </Link>
        </li>
      </Fragment>)}
    </ol>
  </>
}