import { Locale, i18nConfig } from '@/config/i18n.config'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

const { cookie: i18nCookie, defaultLocale } = i18nConfig

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const { req } = opts
  const cookieHeader = req.headers.get('cookie')
  const cookies = cookieHeader?.split('; ').map((cookie) => {
    const [key, value] = cookie.split('=')
    return { key, value }
  })

  const locale = (cookies?.find((cookie) => cookie.key === i18nCookie)?.value ?? defaultLocale) as Locale

  return {
    locale,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>