'use client'

import { Jobs as ContentJobs, ContentService, Job } from '@/services/content'
import { Fragment, FunctionComponent, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/jobs.module.scss'
import { Entry, EntryCollection } from 'contentful'
import { useRouter } from 'next/navigation'
import { Time } from './time'
import Link from 'next/link'

export const JobsPostings: FunctionComponent<{
  jobs: EntryCollection<Job>
}> = ({ jobs }) => {

  const [current, setCurrent] = useState<Entry<Job>>()
  const [cursor, setCursor] = useState<{ left: number, top: number }>()
  const router = useRouter()

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
      {jobs.items.map((job, i) => <Fragment key={job.sys.id}>
        <tr onClick={() => router.push(`/jobs/postings/${job.fields.id}`)}
          onPointerEnter={() => setCurrent(job)}
          onPointerMove={(e) => setCursor({ left: e.clientX, top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 5 })}>
          <td>
            <Link href={`/jobs/postings/${job.fields.id}`}>
              {job.fields.title}
            </Link>
          </td>
          <td>
            {job.fields.department.fields.label}
          </td>
          <td>
            {job.fields.office.fields.city}, {job.fields.office.fields.country}
          </td>
        </tr>
      </Fragment>
      )}
      </tbody>
    </table>

    {current && <aside
      style={{ backgroundColor: current.fields.department?.fields.color, top: cursor?.top, left: cursor?.left }}
      onPointerLeave={() => setCurrent(undefined)}
    >
      <Link href={`/jobs/postings/${current.fields.id}`}>
        <Time d={current.fields.publishedAt} />
        <h3>{current.fields.title}</h3>

        <p>{current.fields.excerpt}</p>
        
        <table>
          <tbody>
            <tr>
              <td>Team</td>
              <td>{current.fields.department?.fields.label}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{current.fields.office.fields.city}, {current.fields.office.fields.country}</td>
            </tr>
          </tbody>
        </table>
      </Link>
    </aside>}
  </section>
}