import { Cards as ContentCards } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from './cards.module.scss'

export const Cards: FunctionComponent<{
  cards: ContentCards
}> = ({ cards }) => {
  return <section className={`${styles.cards}`}>
    <ol>
      {cards.cards.map((card, i) => <li key={i}>
        {card.fields.media && <figure>
            <Image src={`https:${card.fields.media.fields.file.url}`} fill alt={card.fields.media.fields.title} sizes='25vw' style={{ objectFit: 'cover' }} />
        </figure>}

        {card.fields.title && <h3>{card.fields.title}</h3>}

        <main>
          {card.fields.body && documentToReactComponents(card.fields.body)}
        </main>

        {card.fields.buttons && <nav>
          {card.fields.buttons.map(button => <a className='button' href={button.fields.path}>
            {button.fields.label}
          </a>)}  
        </nav>}
      </li>)}
    </ol>
  </section>
}