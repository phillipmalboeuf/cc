import { Fragment, FunctionComponent } from 'react'
import { date } from '@/helpers/formatters'
import { ContentService, Tag } from '@/services/content'
import { Entry } from 'contentful'
import Link from 'next/link'

export const Tags: FunctionComponent<{
  path: string
  tags: Entry<Tag>[]
  noLinks?: boolean
}> = ({ path, tags, noLinks }) => {
  return <>
    {tags.filter(tag => tag?.fields && !['culture', 'news'].includes(tag.fields.id)).map(tag => noLinks
    ? <span className='button button--flat' key={tag.fields.id} style={{
      backgroundColor: tag.fields.color,
      ...tag.fields.color === '#FFF' ? { borderColor: 'transparent' } : {}
    }}>
      {tag.fields.label}
    </span>
    : <Link className='button button--flat' key={tag.fields.id} style={{
      backgroundColor: tag.fields.color,
      ...tag.fields.color === '#FFF' ? { borderColor: 'transparent' } : {}
    }} href={`${path}?tag=${tag.fields.id}`}>
      {tag.fields.label}
    </Link>)}
  </>
}