import { Fragment, FunctionComponent } from 'react'
import { date } from '@/services/formatters'
import { ContentService, Tag } from '@/services/content'
import { Entry } from 'contentful'

export const Tags: FunctionComponent<{
  path: string
  tags: Entry<Tag>[]
  noLinks?: boolean
}> = ({ path, tags, noLinks }) => {
  return <>
    {tags.filter(tag => tag?.fields && !['culture', 'news'].includes(tag.fields.id)).map(tag => noLinks
    ? <span className='button' key={tag.fields.id} style={{
      backgroundColor: tag.fields.color
    }}>
      {tag.fields.label}
    </span>
    : <a className='button' key={tag.fields.id} style={{
      backgroundColor: tag.fields.color
    }} href={`${path}?tag=${tag.fields.id}`}>
      {tag.fields.label}
    </a>)}
  </>
}