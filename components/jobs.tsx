import { Jobs as ContentJobs, ContentService } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { JobsPostings } from './postings'

{/* @ts-expect-error Async Server Component */}
export const Jobs: FunctionComponent<{
  jobsList: ContentJobs
  full?: boolean
}> = async ({ jobsList, full }) => {
  const jobs = await ContentService.jobs(0)
  return <JobsPostings jobs={jobsList?.jobs || jobs.items} full={full} />
}