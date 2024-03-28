'use client'

import { Cards as ContentCards, Text } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { Media } from './media'
import { usePhone } from '@/helpers/devices'

import styles from '@/styles/cards.module.scss'
import { Entry } from 'contentful'
import { Slider } from './slider'
import Link from 'next/link'
import { Arrow } from './svgs'

export const Cards: FunctionComponent<{
  cards: ContentCards
}> = ({ cards }) => {

  const phone = usePhone()

  return <section className={`${styles.cards}`}>
    {phone
    ? <Slider particlesToShow={1.1} align='start' slides={cards.cards.map((card, i) => <Card card={card} key={i} />)} />
    : <ol>
      {cards.cards.map((card, i) => <Card card={card} key={i} />)}
    </ol>}
  </section>
}

export const Card: FunctionComponent<{
  card: Entry<Text>
}> = ({ card }) => {

  return <li className={card.fields.id === 'in-development' ? styles.disabled : undefined}>
    {card.fields.media && <figure>
      <Media media={card.fields.media} sizes='(max-width: 888px) 100vw, 25vw' fill />
    </figure>}

    {card.fields.title && <h3>{card.fields.title}</h3>}

    <main>
      {card.fields.body && documentToReactComponents(card.fields.body)}
    </main>

    {card.fields.buttons && <nav>
      {card.fields.buttons.map(button => <Link className='button' target={button.fields.external ? '_blank' : undefined} key={button.fields.path} href={button.fields.path}>
        {button.fields.label} {button.fields.external && <Arrow />}
      </Link>)}  
    </nav>}
  </li>
}