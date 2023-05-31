import { Content } from '@/components/content'
import { Time } from '@/components/time'
import { ContentService } from '@/services/content'

import styles from '@/styles/article.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'

export default async function Job({ params }) {
  const job = await ContentService.job(params.job)

  return (
    <article className={styles.article}>
      <main>
        <header>
           {job.fields.department && <Link className='button' href={`/jobs?department=${job.fields.department.fields.id}`}>{job.fields.department.fields.label}</Link>}
          <h2>{job.fields.title}</h2>
        </header>

        <footer>
          <aside>
            <Time d={job.fields.publishedAt} />
          </aside>
          <p>{job.fields.excerpt}</p>
          {job.fields.text && documentToReactComponents(job.fields.text)}
        </footer>

        <Link href={`/${params.id}`}>Back</Link>
      </main>
      <form action=''>
        <fieldset>
          <h4>Apply for this job</h4>
        </fieldset>

        <fieldset>
          <button type='submit'>Send</button>
        </fieldset>
      </form>
    </article>
  )
}