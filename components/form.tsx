import { Form as ContentForm } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/form.module.scss'
import { Media } from './media'

export const WholeForm: FunctionComponent<{
  form: ContentForm
}> = ({ form }) => {
  return <article className={styles.form}>
      
      <main>
        <header>
          {form.top && documentToReactComponents(form.top)}
        </header>

        <figure>
          <Media media={form.media} fill sizes='50vw' />
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
  return <form action={form.action}>
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
      <button type='submit'>Send</button>
    </fieldset>
  </form>
}