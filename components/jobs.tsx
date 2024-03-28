import { Jobs as ContentJobs, ContentService, Job } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { JobsPostings } from './postings'

import styles from '@/styles/jobs.module.scss'
import { Entry } from 'contentful'
import { Arrow } from './svgs'

{/* @ts-expect-error Async Server Component */}
export const Jobs: FunctionComponent<{
  jobsList: ContentJobs
  tight?: boolean
  limit?: number
}> = async ({ jobsList, tight, limit }) => {
  const jobs = await ContentService.jobs(0, null, null, limit)

  const groups = jobs.items.reduce<{
    [tag: string]: Entry<Job>[]
  }>((groups, job) => {
    const tag = job.fields.department.fields.label
    if (!groups[tag]) {
      return {
        ...groups,
        [tag]: [job]
      }
    }

    return {
      ...groups,
      [tag]: [...groups[tag], job]
    }
  }, {})
  
  return <>
    {jobsList?.title && <>
      <hr />
      <nav className={styles.nav}>
        <h2>{jobsList.title}</h2>
        <a href='/jobs' className='button'>See all job opportunities <Arrow /></a>
      </nav>
    </>}

    <a id="jobs"></a>

    {jobsList?.grouped
      ? Object.entries(groups).map(([tag, jobs]) => <div className={styles.group}>
        <h3>{tag}</h3>
        <JobsPostings jobs={jobs} tight={jobsList?.tight || tight} />
      </div>)
      : <JobsPostings jobs={jobsList?.jobs || jobs.items} tight={jobsList?.tight || tight} />}
    
  </>
}