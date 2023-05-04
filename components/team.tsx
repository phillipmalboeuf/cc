import { Team as ContentTeam, Tag } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'

import styles from '@/styles/team.module.scss'
import type { Entry } from 'contentful'

export const Team: FunctionComponent<{
  team: ContentTeam
}> = ({ team }) => {
  const tags = team.members.reduce((tags, member)=> {
    return {
      ...tags,
      ...member.fields.tag && { [member.fields.tag.fields.id]: member.fields.tag }
    }
  }, {} as {[id: string]: Entry<Tag>})
  return <section className={`${styles.team}`}>

    <nav>{Object.values(tags).map(tag => <a className='button' href={`/team?tag=${tag.fields.id}`}>{tag.fields.label}</a>)}</nav>

    <ul>
      {team.members.map((member, i) => <Fragment key={i}>
        <li>
          <a href={`/team/members/${member.fields.id}`}>
            <figure>
                {member.fields.media && <Image src={`https:${member.fields.media.fields.file.url}`} width={member.fields.media.fields.file.details.image.width} height={member.fields.media.fields.file.details.image.width} alt={member.fields.media.fields.title} sizes='10vw' style={{ objectFit: 'cover' }} />}
                <figcaption>{member.fields.name}<br />{member.fields.jobTitle}</figcaption>
            </figure>
          </a>
        </li>
      </Fragment>)}
    </ul>
    
  </section>
}