import { Fragment, FunctionComponent } from 'react'
import type { Page } from '@/services/content'
import { Pages } from './pages'
import { Text } from './text'
import { Cards } from './cards'
import { Gallery } from './gallery'
import { Team } from './team'
import { Articles } from './articles'
import { Jobs } from './jobs'
import { WholeForm } from './form'

export const Content: FunctionComponent<{
  content: Page['content']
}> = ({ content }) => {
  return <>
    {content?.map(item => <Fragment key={item.sys.id}>
      {{
        'index': <Pages index={item.fields} />,
        'text': <Text text={item.fields} />,
        'cards': <Cards cards={item.fields} />,
        'gallery': <Gallery gallery={item.fields} />,
        'team': <Team team={item.fields} />,
        'articlesList': <Articles articlesList={item.fields} />,
        'jobsList': <Jobs jobsList={item.fields} />,
        'form': <WholeForm form={item.fields} />,
      }[item.sys.contentType.sys.id]}
    </Fragment>)}
  </>
}