import { FunctionComponent } from 'react'

import { ContentService } from '@/services/content'
import Image from 'next/image'
import { Logo } from '@/components/3d'
import { Content } from '@/components/content'
import { Video } from '@/components/video'


export default async function Home() {
  const page = await ContentService.page('home')

  return (
    <main className='home' style={{ minHeight: '88vh' }}>
      {/* <Logo /> */}
      {page.fields.video && <Video media={page.fields.video} />}
      <Content content={page.fields.content} />
    </main>
  )
}