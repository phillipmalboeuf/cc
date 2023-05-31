import { Articles as ContentArticles, ContentService } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/articles.module.scss'
import { Media } from './media'
import { ArticlesGrid } from './grid'
import { Time } from './time'
import { Tags } from './tags'
import Link from 'next/link'

{/* @ts-expect-error Async Server Component */}
export const Articles: FunctionComponent<{
  articlesList: ContentArticles
  gallery?: boolean
}> = async ({ articlesList, gallery }) => {
  const articles = await ContentService.articles(articlesList.articlesTag.fields.id, 0)
  return <section className={`${styles.articles} ${styles[gallery ? 'Gallery' : articlesList.layout]}`}>
    {gallery
    ? <ol>
        {articles.items.map((article, i) => <Fragment key={article.sys.id}>
          <li>
            <Link href={`/${articlesList.articlesTag.fields.id}/articles/${article.fields.id}`}>
              <figure>
                <Media media={article.fields.media} sizes='(max-width: 888px) 100vw, 33vw' fill />
              </figure>
            </Link>
          </li>
        </Fragment>)}
      </ol>
    : <>
      {articlesList.layout === 'Grid' ? <>
        <ArticlesGrid articles={articles} tag={articlesList.articlesTag.fields.id} />
      </>
      : <ol>
        <li className={styles['featured']}>
          <article>
            <nav>
              <Time d={articles.items[0].fields.publishedAt} />
              <Tags tags={articles.items[0].fields.tags} path={`/${articlesList.articlesTag.fields.id}/articles`} />
            </nav>
            <Link href={`/${articlesList.articlesTag.fields.id}/articles/${articles.items[0].fields.id}`}>
              <h2>{articles.items[0].fields.title}</h2>
            </Link>
            <Link className='button' href={`/${articlesList.articlesTag.fields.id}/articles/${articles.items[0].fields.id}`}>
              Read
            </Link>
          </article>
          
          <figure>
            <Link href={`/${articlesList.articlesTag.fields.id}/articles/${articles.items[0].fields.id}`}>
              <Media media={articles.items[0].fields.media} sizes='100vw' fill />
            </Link>
          </figure>
        </li>
        {articles.items.map((article, i) => <Fragment key={article.sys.id}>
          {i > 0 && <li>
            <nav>
              <Time d={article.fields.publishedAt} />
              <Tags tags={article.fields.tags} path={`/${articlesList.articlesTag.fields.id}/articles`} />
            </nav>
            <Link href={`/${articlesList.articlesTag.fields.id}/articles/${article.fields.id}`}>
              <h4>{article.fields.title}</h4>
              <figure>
                <Media media={article.fields.media} sizes='(max-width: 888px) 100vw, 33vw' fill />
              </figure>
            </Link>
          </li>}
        </Fragment>)}
      </ol>}
    </>}
  </section>
}