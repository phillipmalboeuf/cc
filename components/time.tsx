import { Fragment, FunctionComponent } from 'react'
import { date } from '@/helpers/formatters'

export const Time: FunctionComponent<{
  d: string
}> = ({ d }) => {
  return d && <time className='button' dateTime={new Date(d).toISOString()}>{date(d)}</time>
}