import { Content } from '@/components/content'
import { Media } from '@/components/media'
import { ContentService } from '@/services/content'

import styles from '@/styles/article.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

export default async function Article({ params }) {
  const article = await ContentService.article(params.article)

  return (
    <article className={styles.article}>
      <figure>
        <Media media={article.fields.media} sizes='50vw' fill />
      </figure>
      <main>
        <header>
          <h2>{article.fields.title}</h2>
        </header>

        <footer>
          <aside>
            {article.fields.publishedAt && <time dateTime={new Date(article.fields.publishedAt).toISOString()}>{new Date(article.fields.publishedAt).toLocaleDateString()}</time>}
            {article.fields.collaborators.map(person => <span key={person.sys.id}>{person.fields.jobTitle}: {person.fields.name}</span>)}
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