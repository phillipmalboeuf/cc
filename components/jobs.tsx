import { Jobs as ContentJobs, ContentService } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { JobsPostings } from './postings'

import styles from '@/styles/jobs.module.scss'

{/* @ts-expect-error Async Server Component */}
export const Jobs: FunctionComponent<{
  jobsList: ContentJobs
  tight?: boolean
  limit?: number
}> = async ({ jobsList, tight, limit }) => {
  const jobs = await ContentService.jobs(0, null, null, limit)
  return <>
    {jobsList?.title && <>
      <hr />
      <nav className={styles.nav}>
        <h2>{jobsList.title}</h2>
        <a href='/jobs' className='button'>See all job opportunities</a>
      </nav>
    </>}
    <JobsPostings jobs={jobsList?.jobs || jobs.items} tight={tight} />
  </>
}