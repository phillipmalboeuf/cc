'use client'

import { Team as ContentTeam, Tag } from '@/services/content'
import { Fragment, FunctionComponent, useRef, useState } from 'react'
import Image from 'next/image'

import styles from '@/styles/team.module.scss'
import type { Entry } from 'contentful'
import { Media } from './media'
import Link from 'next/link'

export const Team: FunctionComponent<{
  team: ContentTeam
}> = ({ team }) => {
  const list = useRef<HTMLUListElement>()
  const tags = team.members.reduce((tags, member)=> {
    return {
      ...tags,
      ...member.fields.tag && { [member.fields.tag.fields.id]: member.fields.tag }
    }
  }, {} as {[id: string]: Entry<Tag>})
  const [active, setActive] = useState<string>()

  return <section className={`${styles.team}`} onPointerMove={(e) => {
    if (list.current) {
      list.current.scrollBy({ left: e.movementX / 2 })
    }
  }}>

    <nav>{Object.values(tags).map(tag => <Link key={tag.fields.id} onPointerEnter={() => setActive(tag.fields.id)} onPointerLeave={() => setActive(undefined)} className='button' href={`/team?tag=${tag.fields.id}`}>{tag.fields.label}</Link>)}</nav>

    <ul ref={list}>
      {[...team.members, ...team.members, ...team.members, ...team.members, ...team.members, ...team.members, ...team.members, ...team.members, ...team.members, ...team.members].map((member, i) => <Fragment key={i}>
        <li>
          <Link href={`/team/members/${member.fields.id}`} className={active === member.fields.tag.fields.id ? styles['active'] : undefined}>
            <figure>
              <Media media={member.fields.media} sizes='10vw' fill={false} no3D />
              <figcaption>{member.fields.name}<br />{member.fields.jobTitle}</figcaption>
            </figure>
          </Link>
        </li>
      </Fragment>)}
    </ul>
    
  </section>
}