import { Content } from '@/components/content'
import { ContentService } from '@/services/content'

import styles from '@/styles/article.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

export default async function Article({ params }) {
  const article = await ContentService.article(params.article)

  return (
    <article className={styles.article}>
      <figure>
        {article.fields.media && <Image src={`https:${article.fields.media.fields.file.url}`} fill alt={article.fields.media.fields.title} sizes='50vw' style={{ objectFit: 'cover' }} />}
      </figure>
      <main>
        <header>
          <h2>{article.fields.title}</h2>
        </header>

        <footer>
          <aside>
          {article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toLocaleDateString()}</time>}
          </aside>
          {article.fields.text && documentToReactComponents(article.fields.text)}
        </footer>

        <a href={`/${params.id}`}>Back</a>
      </main>
      {/* <nav>
        {member.fields.tag && <a className='button' href={`/team?tag=${member.fields.tag.fields.id}`}>{member.fields.tag.fields.label}</a>}
      </nav> */}
    </article>
  )
}