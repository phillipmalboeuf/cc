import { Gallery as ContentGallery } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import styles from '@/styles/gallery.module.scss'
import { Media } from './media'
import { Slider } from './slider'

export const Gallery: FunctionComponent<{
  gallery: ContentGallery
}> = ({ gallery }) => {
  return <section className={`${styles.gallery} ${styles[gallery.layout]}`}>
    {gallery.layout !== 'Slider' ? <ol>
      {gallery.title && <li>
        <h4>{gallery.title}</h4>
      </li>}
      {gallery.medias.map((media, i) => <Fragment key={i}>
        {!!Math.round(Math.random()) && <li>
          {/* <figure></figure> */}
        </li>}
        <li>
          <figure>
            <Media media={media} sizes={'(max-width: 888px) 50vw, 14.3vw'} fill />
          </figure>
        </li>
      </Fragment>)}
    </ol> : <Slider particlesToShow={1} align='center' buttons slides={gallery.medias.map((media, i) => <li className='slide' key={i}>
      <figure>
        <Media media={media} sizes={'100vw'} fill />
      </figure>
    </li>)} />}
  </section>
}