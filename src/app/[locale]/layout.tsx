import Navbar from '@/components/Navbar'
import Providers from '@/components/providers/Providers.server'
import { Toaster } from '@/components/ui/Toaster'
import { Locale } from '@/config/i18n.config'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { polyfill } from 'interweave-ssr';
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

polyfill()

type Props = {
  children: React.ReactNode
  authModal: React.ReactNode
  params: { locale: Locale }
}

export async function generateMetadata({ params: { locale } }: Omit<Props, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'Project.Metadata' })

  return {
    title: t('title'),
    description: t('description'),
  } as Metadata
}

export default function RootLayout({ children, authModal, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <Providers locale={locale}>
          <Navbar />
          <Toaster />

          <div className='container pt-12 md:px-8'>
            {authModal}
            {children}
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  )
}
