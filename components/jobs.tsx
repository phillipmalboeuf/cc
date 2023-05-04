import { Jobs as ContentJobs, ContentService } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/jobs.module.scss'

{/* @ts-expect-error Async Server Component */}
export const Jobs: FunctionComponent<{
  jobsList: ContentJobs
}> = async ({ jobsList }) => {
  const jobs = await ContentService.jobs(0)
  return <section className={`${styles.jobs}`}>
    <table>
      <thead>
      <tr>
        <th>Job</th>
        <th>Department</th>
        <th>Office</th>
      </tr>
      </thead>
      <tbody>
      {jobs.items.map((job, i) => 
        <tr key={job.sys.id}>
          <td>
            <a href={`/jobs/postings/${job.fields.id}`}>
              {/* {job.fields.publishedAt && <time dateTime={new Date(job.fields.publishedAt).toISOString()}>{new Date(job.fields.publishedAt).toLocaleDateString()}</time>} */}
              {job.fields.title}
            </a>
          </td>
          <td>
            {job.fields.department.fields.label}
          </td>
          <td>
            {job.fields.office.fields.city}, {job.fields.office.fields.country}
          </td>
        </tr>
      )}
      </tbody>
    </table>
  </section>
}