import { Header } from '@/components/header'
import localFont from 'next/font/local'

import '@/styles/globals.scss'
import { Footer } from '@/components/footer'
import { useLocale } from '@/helpers/locales'
import { ContentService } from '@/services/content'

const antique = localFont({
  src: [{ path: './fonts/Antique-Legacy-Regular.woff2' }, { path: './fonts/Antique-Legacy-Regular.woff' }],
  variable: '--antique',
  display: 'swap',
})

export const metadata = {
  title: 'Cloud Chamber',
  description: 'Cloud Chamber is looking for a creative and inspirational Animation Director to join us in bringing the world of BioShock to life. You will oversee a team of animators and manage the gameplay animation content for the entire project.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = useLocale()
  const footer = await ContentService.navigation('footer')
  
  return (
    <html lang={locale === 'fr-CA' ? 'fr' : 'en'} className={antique.variable}>
      <body>
        <Header />
        {children}
        <Footer nav={footer} />
      </body>
    </html>
  )
}
