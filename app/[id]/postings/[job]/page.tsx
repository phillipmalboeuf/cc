import { contentful } from '@/clients/contentful'
import { Content } from '@/components/content'
import { Form } from '@/components/form'
import { Time } from '@/components/time'
import { useLocale } from '@/helpers/locales'
import { ContentService, Form as ContentForm, Text } from '@/services/content'

import styles from '@/styles/article.module.scss'
import formStyles from '@/styles/form.module.scss'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Link from 'next/link'

export default async function Job({ params }) {
  const locale = useLocale()
  const [job, form, text] = await Promise.all([
    ContentService.job(params.job, locale),
    contentful.getEntry<ContentForm>('17HakL4DkFWepV2wp9JxiH', { locale: process.env.NEXT_PUBLIC_LOCALE }),
    contentful.getEntry<Text>('5Xah2xYW79dVNZimm5wFyu', { locale: process.env.NEXT_PUBLIC_LOCALE })
  ])

  form.fields.action = `${form.fields.action}${job.fields.greenhouseId}`

  async function submit(url: string, formData: FormData) {
    "use server"

    const { first_name, last_name, email, location, phone, ...rest } = Object.fromEntries(formData) as { [key: string]: string }
    const { resume, cover_letter } = Object.fromEntries(formData) as { [key: string]: File }

    delete rest['resume']
    delete rest['cover_letter']
    delete rest['background']
    delete rest['privacy']

    const attributes = rest && Object.values(rest)
    const body = {
        first_name,
        last_name,
        email,
        location,
        phone,
        ...attributes?.length ? {
          attributes: attributes.map(a => ({ text_value: a }))
        } : {},
        ...(resume.size) ? {
          "resume_content": await resume.text(),
          "resume_content_filename": resume.name
        } : {},
        ...(cover_letter.size) ? {
          "cover_letter_content": await cover_letter.text(),
          "cover_letter_content_filename": cover_letter.name
        } : {}
      }
    // console.log(JSON.stringify(body, null, 2))

    const application = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.GREENHOUSE_KEY).toString('base64')}`
      },
      body: JSON.stringify(body)
    })
    
    // console.log(application.ok, url)
    // console.log(application)
    if (!application.ok) {
      throw new Error("An error has occured")
    }
  }

  return (
    <article className={styles.article}>
      <main>
        <header>
           {job.fields.department && <Link className='button button--flat' style={{ backgroundColor: job.fields.department.fields.color }} href={`/jobs?department=${job.fields.department.fields.id}`}>{job.fields.department.fields.label}</Link>}
          <h2>{job.fields.title}</h2>

          <Link className={styles.back} href={`/${params.id}#jobs`}>
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
          {/* <hr /> */}
          <p>{job.fields.excerpt}</p>
          {job.fields.text && documentToReactComponents(job.fields.text)}

          {text && <>
            <hr />
            <h3>{text.fields.title}</h3>
            {text.fields.body && documentToReactComponents(text.fields.body)}
          </>}
        </footer>

        {/* <Link href={`/${params.id}`}>Back</Link> */}
      </main>
      <div className={formStyles.form} id="apply">
        <Form title={form.fields.title} form={form.fields} fields={job.fields.extraFields} consent action={submit.bind(null, form.fields.action)} />
      </div>
    </article>
  )
}