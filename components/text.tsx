import { Text as ContentText } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from 'styles/text.module.scss'
import { Media } from './media'

export const Text: FunctionComponent<{
  text: ContentText
}> = ({ text }) => {
  return <section className={`${styles.text} ${styles[text.layout]}`}>
    {text.media && <figure>
      <Media media={text.media} sizes='100vw' fill />
    </figure>}

    <div>
      <header>
        {text.title && <h2>{text.title}</h2>}
        {text.buttons && <nav>
          {text.buttons.map(button => <a className='button' href={button.fields.path}>
            {button.fields.label}
          </a>)}  
        </nav>}
      </header>

      <main>
        {text.body && documentToReactComponents(text.body)}
      </main>
    </div>
  </section>
}