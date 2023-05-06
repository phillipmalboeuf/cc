import { Form as ContentForm } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/form.module.scss'
import { Media } from './media'

export const Form: FunctionComponent<{
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
      <form action=''>
        <fieldset>
          {/* <h4>Apply for this job</h4> */}
        </fieldset>

        <fieldset>
          <button type='submit'>Send</button>
        </fieldset>
      </form>
    </article>
}