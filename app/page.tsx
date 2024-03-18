import { FunctionComponent } from 'react'

import { ContentService } from '@/services/content'
import Image from 'next/image'
import { Logo } from '@/components/3d'
import { Content } from '@/components/content'


export default async function Home() {
  const page = await ContentService.page('home')

  return (
    <main>
      {/* <Logo /> */}
      <Content content={page.fields.content} />
    </main>
  )
}