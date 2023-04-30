import { Content } from '@/components/content'
import { ContentService } from '@/services/content'

export default async function Page({ params }) {
  const page = await ContentService.page(params.id)

  return (
    <main>
      {page && <Content content={page.fields.content} />}
    </main>
  )
}