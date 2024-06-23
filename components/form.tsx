'use client'

import { Form as ContentForm, Field } from '@/services/content'
import { Fragment, FunctionComponent, useState } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/form.module.scss'
import { Media } from './media'
import { SubmitButton } from './submit'
import { SVG } from './svgs'
import { useLocale } from '@/helpers/locales'
import { Entry } from 'contentful'

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
  fields?: Entry<Field>[]
  action?: (formData: FormData) => Promise<void>
  consent?: boolean
}> = ({ title, form, fields, action, consent }) => {
  const locale = useLocale()
  const [success, setSucces] = useState(false)
  
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
    
    {form.fields && <fieldset>
      {!success && [...form.fields, ...(fields || [])].map(field => <label key={field.fields.name} className={styles[field.fields.type] + (!['first_name', 'last_name', 'email', 'location', 'phone', 'linkedin-profile'].includes(field.fields.name) ? ' '+ styles.wide : '')}>
        {{
          'Text': <input name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'Email': <input type='email' name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'Phone': <input type='tel' name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'Textarea': <textarea name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
          'File': <input type='file' name={field.fields.name} placeholder={field.fields.label} required={!field.fields.optional} />,
        }[field.fields.type || "Text"]}
        {field.fields.label && <span>{field.fields.label}</span>}
      </label>)}

      {!success && consent && <>
        <label htmlFor='background' className={styles.consent}>
          <input type='checkbox' name='background' id='background' required />
          <small>You acknowledge that as part of our hiring process, 2K will conduct a pre-employment background check. We may also require written verification from your current employer that you have ended your employment.</small>
        </label>
        <label htmlFor='privacy' className={styles.consent}>
          <input type='checkbox' name='privacy' id='privacy' required />
          <small>You acknowledge that your personal information will be collected and used by 2K based on the <a href='https://www.take2games.com/applicantprivacypolicy/' target='_blank' rel='noreferrer'><u>Privacy Notice for Job Applicants (the “Privacy Notice”)</u></a>. The Privacy Notice provides information about how we use your data and how you can exercise your data rights (such as access, correction, or deletion).  If you need more information, please contact the Privacy Contact identified in the Privacy Notice. </small>
        </label>
      </>}
      
      <SubmitButton label={success ? locale === 'fr-CA' ? 'Soumis' : 'Sent' : locale === 'fr-CA' ? 'Soumettre' : 'Send'} disabled={success} />
    </fieldset>}
  </form>
}