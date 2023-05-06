import { Gallery as ContentGallery } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/gallery.module.scss'
import { Media } from './media'

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
            <Media media={media} sizes='14.3vw' fill />
          </figure>
        </li>
      </Fragment>)}
    </ol>
  </section>
}