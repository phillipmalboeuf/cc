import { Articles as ContentArticles, ContentService } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/articles.module.scss'

{/* @ts-expect-error Async Server Component */}
export const Articles: FunctionComponent<{
  articlesList: ContentArticles
}> = async ({ articlesList }) => {
  const articles = await ContentService.articles(articlesList.articlesTag.fields.id, 0)
  return <section className={`${styles.articles}`}>
    <ol>
      {articles.items.map((article, i) => <Fragment key={article.sys.id}>
        <li>
          <a href={`/${articlesList.articlesTag.fields.id}/articles/${article.fields.id}`}>
            {article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toLocaleDateString()}</time>}
            <h4>{article.fields.title}</h4>
            <figure>
              {article.fields.media && <Image src={`https:${article.fields.media.fields.file.url}`} fill alt={article.fields.media.fields.title} sizes='33vw' style={{ objectFit: 'cover' }} />}
            </figure>
          </a>
        </li>
      </Fragment>)}
    </ol>
  </section>
}