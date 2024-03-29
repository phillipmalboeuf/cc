import { Jobs as ContentJobs, ContentService, Job } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { JobsPostings } from './postings'

import styles from '@/styles/jobs.module.scss'
import { Entry } from 'contentful'
import { Arrow } from './svgs'
import { useLocale } from '@/helpers/locales'

{/* @ts-expect-error Async Server Component */}
export const Jobs: FunctionComponent<{
  jobsList: ContentJobs
  tight?: boolean
  limit?: number
}> = async ({ jobsList, tight, limit }) => {
  const locale = useLocale()
  const jobs = jobsList?.jobs?.length ? jobsList?.jobs : (await ContentService.jobs(0, null, locale, limit)).items

  const groups = jobs.reduce<{
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
        <a href='/jobs' className='button'>{locale === 'fr-CA' ? 'Voir tout les emplois disponibles' : 'See all job opportunities'} <Arrow /></a>
      </nav>
    </>}

    <a id="jobs"></a>

    {jobsList?.grouped
      ? Object.entries(groups).map(([tag, jobs]) => <div className={styles.group}>
        <h3>{tag}</h3>
        <JobsPostings jobs={jobs} tight={jobsList?.tight || tight} />
      </div>)
      : <JobsPostings jobs={jobsList?.jobs || jobs} tight={jobsList?.tight || tight} />}
    
  </>
}