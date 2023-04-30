import { Text as ContentText } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from './text.module.scss'

export const Text: FunctionComponent<{
  text: ContentText
}> = ({ text }) => {
  return <section className={`${styles.text} ${styles[text.layout]}`}>
    {text.media && <figure>
        <Image src={`https:${text.media.fields.file.url}`} width={text.media.fields.file.details.image.width} height={text.media.fields.file.details.image.width} alt={text.media.fields.title} sizes='100vw' style={{ objectFit: 'cover' }} />
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