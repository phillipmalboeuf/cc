import { Content } from '@/components/content'
import { Media } from '@/components/media'
import { ContentService } from '@/services/content'

import styles from '@/styles/article.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'

export default async function TeamMember({ params }) {
  const member = await ContentService.member(params.member)

  return (
    <article className={styles.article}>
      <figure style={{ backgroundColor: member.fields.tag?.fields.color }}>
        <Media media={member.fields.media} sizes='50vw' fill />
      </figure>
      <main>
        <header>
          <h2>{member.fields.name}</h2>
          <em>{member.fields.jobTitle}</em>
        </header>

        <footer>
          {member.fields.introduction && documentToReactComponents(member.fields.introduction)}
        </footer>

        <Link href='/team'>Back</Link>
      </main>
      <nav>
        {member.fields.tag && <Link className='button' href={`/team?tag=${member.fields.tag.fields.id}`}>{member.fields.tag.fields.label}</Link>}
      </nav>
    </article>
  )
}