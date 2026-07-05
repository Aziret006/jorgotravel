import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { SiteFooter } from '@/components/jorgo/site-footer'
import { SiteHeader } from '@/components/jorgo/site-header'

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-accent">404</p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-foreground">Тур не найден</h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Возможно, маршрут был перемещён. Вернитесь на главную и выберите тур из каталога.
        </p>
        <Link
          href="/#tours"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-bold text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-[1.04]"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
          К турам
        </Link>
      </main>
      <SiteFooter />
    </>
  )
}
