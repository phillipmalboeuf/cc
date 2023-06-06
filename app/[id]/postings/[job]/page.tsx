import { contentful } from '@/clients/contentful'
import { Content } from '@/components/content'
import { Form } from '@/components/form'
import { Time } from '@/components/time'
import { ContentService, Form as ContentForm } from '@/services/content'

import styles from '@/styles/article.module.scss'
import formStyles from '@/styles/form.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'

export default async function Job({ params }) {
  const [job, form] = await Promise.all([
    ContentService.job(params.job),
    contentful.getEntry<ContentForm>('17HakL4DkFWepV2wp9JxiH', { locale: process.env.LOCALE })
  ])

  form.fields.action = `${form.fields.action}${job.fields.greenhouseId}`
  form.fields.fields = form.fields.fields.map(field => ({
    ...field,
    fields: {
      ...field.fields,
      name: `job_application[${field.fields.name}]`
    }
  }))

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
      <div className={formStyles.form}>
        <Form title={form.fields.title} form={form.fields} />
      </div>
    </article>
  )
}