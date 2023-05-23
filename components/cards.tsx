import { Cards as ContentCards } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/cards.module.scss'
import { Media } from './media'

export const Cards: FunctionComponent<{
  cards: ContentCards
}> = ({ cards }) => {
  return <section className={`${styles.cards}`}>
    <ol>
      {cards.cards.map((card, i) => <li key={i}>
        {card.fields.media && <figure>
          <Media media={card.fields.media} sizes='(max-width: 888px) 100vw, 25vw' fill />
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