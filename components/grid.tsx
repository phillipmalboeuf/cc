'use client'

import { Article, Articles as ContentArticles, ContentService, Job } from '@/services/content'
import { Fragment, FunctionComponent, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Entry, EntryCollection } from 'contentful'
import { useRouter } from 'next/navigation'
import { Media } from './media'

import styles from '@/styles/articles.module.scss'

export const ArticlesGrid: FunctionComponent<{
  tag: string
  articles: EntryCollection<Article>
}> = ({ tag, articles }) => {

  const [current, setCurrent] = useState<Entry<Article>>()
  // const [cursor, setCursor] = useState<{ left: number, top: number }>()
  const router = useRouter()

  return <>
    <nav>
      {articles.items.map((article, i) => <Fragment key={article.sys.id}>
        <a href={`/${tag}/articles/${article.fields.id}`}
          onPointerEnter={() => setCurrent(article)}
          onPointerLeave={() => setCurrent(undefined)}
          className={current?.fields.id === article.fields.id ? styles['current'] : undefined}
        >
          {article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toDateString()}</time>}
          <h4>{article.fields.title}</h4>
        </a>
      </Fragment>)}
    </nav>
    <ol>
      {articles.items.map((article, i) => <Fragment key={article.sys.id}>
        <li>
          <a href={`/${tag}/articles/${article.fields.id}`}
            onPointerEnter={() => setCurrent(article)}
            onPointerLeave={() => setCurrent(undefined)}
            className={current?.fields.id === article.fields.id ? styles['current'] : undefined}
          >
            <figure>
              <Media media={article.fields.media} sizes='50vw' fill />
              <figcaption>
                {article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toDateString()}</time>}
                <h3>{article.fields.title}</h3>
              </figcaption>
            </figure>
          </a>
        </li>
      </Fragment>)}
    </ol>
  </>
}