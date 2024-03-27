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
  // const jobs = await (await fetch('https://boards-api.greenhouse.io/v1/boards/cloudchamberen/jobs', {
  //   headers: {
  //   //  'Authorization': `Basic ${Buffer.from(process.env.CONTENTFUL_SPACE_ID).toString('base64')}`
  //   }
  // })).json()
  // console.log(jobs)

  const [job, form] = await Promise.all([
    ContentService.job(params.job),
    contentful.getEntry<ContentForm>('17HakL4DkFWepV2wp9JxiH', { locale: process.env.LOCALE })
  ])

  form.fields.action = `${form.fields.action}${job.fields.greenhouseId}`

  async function submit(url: string, formData: FormData) {
    "use server"

    const application = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.GREENHOUSE_KEY).toString('base64')}`
      },
      body: JSON.stringify({
        "first_name": formData.get("first_name"),
        "last_name": formData.get("last_name"),
        "email": formData.get("email"),
        "location": formData.get("location"),
        "phone": formData.get("phone"),
        ...((formData.get("resume") as File).size) ? {
          "resume_content": await (formData.get("resume") as File).text(),
          "resume_content_filename": (formData.get("resume") as File).name
        } : {},
        ...((formData.get("cover_letter") as File).size) ? {
          "cover_letter_content": await (formData.get("cover_letter") as File).text(),
          "cover_letter_content_filename": (formData.get("cover_letter") as File).name
        } : {}
      })
    })
    console.log(application)
  }

  return (
    <article className={styles.article}>
      <main>
        <header>
           {job.fields.department && <Link className='button button--flat' style={{ backgroundColor: job.fields.department.fields.color }} href={`/jobs?department=${job.fields.department.fields.id}`}>{job.fields.department.fields.label}</Link>}
          <h2>{job.fields.title}</h2>

          <Link className={styles.back} href={`/${params.id}`}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="38" height="38" rx="5.5" stroke="currentColor"/>
              <line x1="35" y1="20" x2="4" y2="20" stroke="currentColor"/>
              <line x1="35" y1="20" x2="4" y2="20" stroke="currentColor"/>
            </svg>
          </Link>

          <Link className={`button ${styles.apply}`} href="#apply">
            Apply now
          </Link>
        </header>

        <footer>
          {/* <aside>
            <Time d={job.fields.publishedAt} />
          </aside> */}
          <p>{job.fields.excerpt}</p>
          {job.fields.text && documentToReactComponents(job.fields.text)}
        </footer>

        {/* <Link href={`/${params.id}`}>Back</Link> */}
      </main>
      <div className={formStyles.form} id="apply">
        <Form title={form.fields.title} form={form.fields} action={submit.bind(null, form.fields.action)} />
      </div>
    </article>
  )
}