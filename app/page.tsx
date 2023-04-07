import { ContentService } from '@/services/content'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from './page.module.scss'

export default async function Home() {
  const page = await ContentService.page('home')

  return (
    <main className={styles.main}>
      <h1>Cloud Chamber</h1>
      {JSON.stringify(page)}
    </main>
  )
}
