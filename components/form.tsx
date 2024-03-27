'use client'

import { Form as ContentForm } from '@/services/content'
import { Fragment, FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/form.module.scss'
import { Media } from './media'
import { SubmitButton } from './submit'
import { SVG } from './svgs'

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
  action?: (formData: FormData) => Promise<void>
}> = ({ title, form, action }) => {
  const [success, setSucces] = useState(true)
  
  return <form action={action ? async (formData: FormData) => {
    await action(formData)
    setSucces(true)
  } : form.action}>
    <fieldset>
      {title && <h4>{success ? 'Your application has been sent!' : title}</h4>}
      {success && <figure>
        <SVG />
      </figure>}
    </fieldset>

    <fieldset>
      {!success && form.fields?.map(field => <label key={field.fields.name} className={styles[field.fields.type]}>
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
      <SubmitButton label={success ? 'Sent' : 'Send'} disabled={success} />
    </fieldset>
  </form>
}