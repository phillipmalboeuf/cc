import { Content } from '@/components/content'
import { ContentService } from '@/services/content'

import styles from '@/styles/article.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

export default async function Job({ params }) {
  const job = await ContentService.job(params.job)

  return (
    <article className={styles.article}>
      {/* <figure>
        {article.fields.media && <Image src={`https:${article.fields.media.fields.file.url}`} fill alt={article.fields.media.fields.title} sizes='50vw' style={{ objectFit: 'cover' }} />}
      </figure> */}
      <main>
        <header>
           {job.fields.department && <a className='button' href={`/jobs?department=${job.fields.department.fields.id}`}>{job.fields.department.fields.label}</a>}
          <h2>{job.fields.title}</h2>
        </header>

        <footer>
          <aside>
          {job.fields.publishedAt && <time dateTime={new Date(job.fields.publishedAt).toISOString()}>{new Date(job.fields.publishedAt).toLocaleDateString()}</time>}
          </aside>
          <p>{job.fields.excerpt}</p>
          {job.fields.text && documentToReactComponents(job.fields.text)}
        </footer>

        <a href={`/${params.id}`}>Back</a>
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