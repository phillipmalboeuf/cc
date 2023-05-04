import { Content } from '@/components/content'
import { ContentService } from '@/services/content'

import styles from '@/styles/article.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

export default async function TeamMember({ params }) {
  const member = await ContentService.member(params.member)

  return (
    <article className={styles.article}>
      <figure style={{ backgroundColor: member.fields.tag?.fields.color }}>
        {member.fields.media && <Image src={`https:${member.fields.media.fields.file.url}`} fill alt={member.fields.media.fields.title} sizes='50vw' style={{ objectFit: 'cover' }} />}
      </figure>
      <main>
        <header>
          <h2>{member.fields.name}</h2>
          <em>{member.fields.jobTitle}</em>
        </header>

        <footer>
          {member.fields.introduction && documentToReactComponents(member.fields.introduction)}
        </footer>

        <a href='/team'>Back</a>
      </main>
      <nav>
        {member.fields.tag && <a className='button' href={`/team?tag=${member.fields.tag.fields.id}`}>{member.fields.tag.fields.label}</a>}
      </nav>
    </article>
  )
}