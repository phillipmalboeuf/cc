import { Text as ContentText } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from 'styles/text.module.scss'
import { Media } from './media'
import Link from 'next/link'

export const Text: FunctionComponent<{
  text: ContentText
}> = ({ text }) => {
  return <section className={`${styles.text} ${styles[text.layout]}`}>
    {text.media && <figure>
      <Media media={text.media} sizes='100vw' fill={false} />
    </figure>}

    <div>
      {(text.title || text.buttons) && <header>
        {text.title && <h2>{text.title}</h2>}
        {text.buttons && <nav>
          {text.buttons.map(button => <Link className='button' href={button.fields.path}>
            {button.fields.label}
          </Link>)}  
        </nav>}
      </header>}

      <main>
        {text.body && documentToReactComponents(text.body)}
      </main>
    </div>
  </section>
}