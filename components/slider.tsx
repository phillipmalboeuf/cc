'use client'

import { Fragment, FunctionComponent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoHeight from 'embla-carousel-auto-height'

import styles from '@/styles/slider.module.scss'

export const Slider: FunctionComponent<{
  // slider: ContentGallery
  slides: JSX.Element[]
  align?: 'start' | 'end' | 'center'
  particlesToShow: number
}> = ({ slides, align, particlesToShow }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align }, [])

  return <div ref={emblaRef} className={`${styles.slider}`} style={{
    ['--w' as any]: `${100/particlesToShow}%`
  }}>
    <ol>
      {slides}
    </ol>
  </div>
}