import { Header } from '@/components/header'
import '@/styles/globals.scss'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Cloud Chamber',
  description: 'Cloud Chamber is looking for a creative and inspirational Animation Director to join us in bringing the world of BioShock to life. You will oversee a team of animators and manage the gameplay animation content for the entire project.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
