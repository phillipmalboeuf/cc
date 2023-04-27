import { Fragment, FunctionComponent } from 'react'
import type { Page } from '@/services/content'
import { Pages } from './pages'
import { Text } from './text'

export const Content: FunctionComponent<{
  content: Page['content']
}> = ({ content }) => {
  return <>
    {content?.map(item => <Fragment key={item.sys.id}>
      {{
        'index': <Pages index={item.fields} />,
        'text': <Text text={item.fields} />
      }[item.sys.contentType.sys.id]}
    </Fragment>)}
  </>
}