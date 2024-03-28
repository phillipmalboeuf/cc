'use client'

import { Fragment, FunctionComponent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoHeight from 'embla-carousel-auto-height'

import styles from '@/styles/slider.module.scss'
import { useLocale } from '@/helpers/locales'

export const Slider: FunctionComponent<{
  // slider: ContentGallery
  slides: JSX.Element[]
  align?: 'start' | 'end' | 'center'
  particlesToShow: number
  buttons?: boolean
}> = ({ slides, align, buttons, particlesToShow }) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align }, [])
  const locale = useLocale()

  return <div ref={emblaRef} className={`${styles.slider}`} style={{
    ['--w' as any]: `${100/particlesToShow}%`
  }}>
    <ol>
      {slides}
    </ol>
    {buttons && <nav>
      <button onClick={() => embla.scrollPrev()}>{locale === 'fr-CA' ? 'Précédent' : 'Previous'}</button>
      <button onClick={() => embla.scrollNext()}>{locale === 'fr-CA' ? 'Suivant' : 'Next'}</button>
    </nav>}
  </div>
}