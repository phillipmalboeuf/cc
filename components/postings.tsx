'use client'

import { Jobs as ContentJobs, ContentService, Job } from '@/services/content'
import { Fragment, FunctionComponent, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/jobs.module.scss'
import { Entry, EntryCollection } from 'contentful'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Time } from './time'
import { usePhone } from '@/helpers/devices'

export const JobsPostings: FunctionComponent<{
  jobs: EntryCollection<Job>['items'],
  tight: boolean
}> = ({ jobs, tight }) => {

  const [current, setCurrent] = useState<Entry<Job>>()
  const [cursor, setCursor] = useState<{ left: number, top: number }>()
  const router = useRouter()

  const phone = usePhone()

  return <section className={`${styles.jobs} ${tight ? styles.tight : undefined}`}>
    <table>
      {/* {tight && <thead>
        <tr>
          <th>Job</th>
          <th>Department</th>
          <th>Office</th>
        </tr>
      </thead>} */}
      <tbody>
      {jobs.map((job, i) => <Fragment key={job.sys.id}>
        <tr style={tight && {
          [`--width` as string]: '50%',
          [`--color` as string]: job.fields.department.fields.color
        }} onClick={() => router.push(`/jobs/postings/${job.fields.id}`)}
          // onPointerEnter={() => setCurrent(job)}
          onPointerMove={(e) => setCursor({ left: e.clientX, top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 5 })}>
          <td className={(!tight && !phone) ? 'h4' : undefined}>
            <Link href={`/jobs/postings/${job.fields.id}`}>
              {job.fields.title}
            </Link>
          </td>
          <td className={(!tight && !phone) ? 'h4' : undefined}>
            {job.fields.office.fields.city}, {job.fields.office.fields.country}
          </td>
          {!tight && <td className={styles.buttons}>
            <span className='button button--flat' key={job.fields.department.fields.id} style={{
              backgroundColor: job.fields.department.fields.color
            }}>
              {job.fields.department.fields.label}
            </span>
            <Link className='button' href={`/jobs/postings/${job.fields.id}`}>
              See more
            </Link>
          </td>}
        </tr>
      </Fragment>
      )}
      </tbody>
    </table>

    {current && <aside
      style={{ backgroundColor: current.fields.department?.fields.color,
        ...tight && { top: cursor?.top, left: cursor?.left }
      }}
      onPointerLeave={() => setCurrent(undefined)}
    >
      <Link href={`/jobs/postings/${current.fields.id}`}>
        <nav><Time d={current.fields.publishedAt} /></nav>
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