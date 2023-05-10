import { Articles as ContentArticles, ContentService } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/articles.module.scss'
import { Media } from './media'
import { ArticlesGrid } from './grid'

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
            <a href={`/${articlesList.articlesTag.fields.id}/articles/${article.fields.id}`}>
              {/* {article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toLocaleDateString()}</time>}
              <h4>{article.fields.title}</h4> */}
              <figure>
                <Media media={article.fields.media} sizes='33vw' fill />
              </figure>
            </a>
          </li>
        </Fragment>)}
      </ol>
    : <>
      {articlesList.layout === 'Grid' ? <>
        <ArticlesGrid articles={articles} tag={articlesList.articlesTag.fields.id} />
      </>
      : <ol>
        {articles.items.map((article, i) => <Fragment key={article.sys.id}>
          <li>
            <nav>{article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toLocaleDateString()}</time>}</nav>
            <a href={`/${articlesList.articlesTag.fields.id}/articles/${article.fields.id}`}>
              <h4>{article.fields.title}</h4>
              <figure>
                <Media media={article.fields.media} sizes='33vw' fill />
              </figure>
            </a>
          </li>
        </Fragment>)}
      </ol>}
    </>}
  </section>
}