import { Team as ContentTeam, Tag } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'

import styles from '@/styles/team.module.scss'
import type { Entry } from 'contentful'
import { Media } from './media'

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

    <nav>{Object.values(tags).map(tag => <a key={tag.fields.id} className='button' href={`/team?tag=${tag.fields.id}`}>{tag.fields.label}</a>)}</nav>

    <ul>
      {team.members.map((member, i) => <Fragment key={i}>
        <li>
          <a href={`/team/members/${member.fields.id}`}>
            <figure>
              <Media media={member.fields.media} sizes='10vw' fill={false} no3D />
              <figcaption>{member.fields.name}<br />{member.fields.jobTitle}</figcaption>
            </figure>
          </a>
        </li>
      </Fragment>)}
    </ul>
    
  </section>
}