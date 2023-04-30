import { Gallery as ContentGallery } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from './gallery.module.scss'

export const Gallery: FunctionComponent<{
  gallery: ContentGallery
}> = ({ gallery }) => {
  return <section className={`${styles.gallery}`}>
    <ol>
      {gallery.title && <li>
        <h4>{gallery.title}</h4>
      </li>}
      {gallery.medias.map((media, i) => <Fragment key={i}>
        {!!Math.round(Math.random()) && <li>
          <figure></figure>
        </li>}
        <li>
          <figure>
              <Image src={`https:${media.fields.file.url}`} fill alt={media.fields.title} sizes='14.3vw' style={{ objectFit: 'cover' }} />
          </figure>
        </li>
      </Fragment>)}
    </ol>
  </section>
}