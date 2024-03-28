import { Text as ContentText } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/text.module.scss'
import { Media } from './media'
import Link from 'next/link'
import { Arrow } from './svgs'

export const Text: FunctionComponent<{
  text: ContentText
}> = ({ text }) => {
  return text.layout === 'Accordeon' ? <details className={`${styles.text} ${styles[text.layout]}`}>
    <summary>
      <h2 className='h3'>{text.title}</h2>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="38" height="38" rx="5.5" stroke="currentColor"/>
        <line x1="35" y1="20" x2="4" y2="20" stroke="currentColor"/>
        <line x1="35" y1="20" x2="4" y2="20" stroke="currentColor"/>
      </svg>
    </summary>

    <main>
      {text.body && <div>{documentToReactComponents(text.body)}</div>}
      {text.secondBody && <div>{documentToReactComponents(text.secondBody)}</div>}

      {text.buttons && <nav>
        {text.buttons.map(button => <Link className='button' target={button.fields.external ? '_blank' : undefined} key={button.fields.path} href={button.fields.path}>
          {button.fields.label} {button.fields.external && <Arrow />}
        </Link>)}  
      </nav>}
    </main>
  </details> : <section className={`${styles.text} ${styles[text.layout]}${text.background ? ` ${styles.background}` : ''}`}>
    {text.background && <figure className={styles.back}>
      <Media media={text.background} sizes='100vw' fill={false} no3D eager />
    </figure>}

    {text.tag && <nav>
      <span className='button button--flat' style={{ backgroundColor: text.tag.fields.color }}>{text.tag.fields.label}</span>
    </nav>}

    <main>
      {text.media && <figure>
        <Media media={text.media} sizes='100vw' fill={false} no3D eager />
      </figure>}

      {text.title && <header>
        <h2 className={text.layout === 'Hero' ? 'h1' : undefined}>{text.title}</h2>
      </header>}

      {text.body && <div>{documentToReactComponents(text.body)}</div>}
      {text.secondBody && <div>{documentToReactComponents(text.secondBody)}</div>}
      {text.thirdBody && <div>{documentToReactComponents(text.thirdBody)}</div>}
    </main>

    {text.buttons && <nav>
      {text.buttons.map(button => <Link className='button' target={button.fields.external ? '_blank' : undefined} key={button.fields.path} href={button.fields.path}>
          {button.fields.label} {button.fields.external && <Arrow />}
        </Link>)}
    </nav>}
  </section>
}