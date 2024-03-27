import { Form as ContentForm } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/form.module.scss'
import { Media } from './media'
import { SubmitButton } from './submit'

export const WholeForm: FunctionComponent<{
  form: ContentForm
}> = ({ form }) => {
  return <article className={styles.form}>
      
      <main>
        <header>
          {form.top && documentToReactComponents(form.top)}
        </header>

        <figure>
          <Media media={form.media} fill sizes='50vw' no3D />
        </figure>

        <footer>
          {form.bottom && documentToReactComponents(form.bottom)}
        </footer>
      </main>
      <Form form={form} title={form.title} />
    </article>
}

export const Form: FunctionComponent<{
  title?: string
  form: ContentForm
}> = ({ title, form }) => {

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
  
  return <form action={submit.bind(null, form.action)}>
    <fieldset>
      {title && <h4>{title}</h4>}
    </fieldset>

    <fieldset>
      {form.fields?.map(field => <label key={field.fields.name} className={styles[field.fields.type]}>
        {{
          'Text': <input name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'Email': <input type='email' name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'Phone': <input type='tel' name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'Textarea': <textarea name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'File': <input type='file' name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
        }[field.fields.type || "Text"]}
        {field.fields.label && <span>{field.fields.label}</span>}
      </label>)}
    </fieldset>

    <fieldset>
      <SubmitButton label='Send' />
    </fieldset>
  </form>
}