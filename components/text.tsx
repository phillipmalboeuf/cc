import { Text as ContentText } from '@/services/content'
import { Fragment, FunctionComponent } from 'react'
import Image from 'next/image'

import styles from './text.module.scss'

export const Text: FunctionComponent<{
  text: ContentText
}> = ({ text }) => {
  return <section className={styles.text}>
    {text.title && <h2>{text.title}</h2>}
  </section>
}