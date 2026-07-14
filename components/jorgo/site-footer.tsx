'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useI18n } from '@/components/jorgo/i18n-provider'
import { LanguageSwitcher } from '@/components/jorgo/language-switcher'
import { FOOTER_SOCIALS } from '@/components/jorgo/social-links'

export function SiteFooter() {
  const { t } = useI18n()

  const nav = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.tours, href: '/#tours' },
    { label: t.nav.booking, href: '/booking' },
    { label: t.nav.reviews, href: '/#reviews' },
    { label: t.nav.contact, href: '/#contact' },
  ]

  return (
    <footer className="bg-footer-gradient text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="JorgoTravel"
                width={140}
                height={70}
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-foreground/70">
              {t.about.introP1}
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <h3 className="font-heading text-lg font-bold">Быстрые ссылки</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-navy-foreground/70 transition-colors duration-300 hover:text-orange"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-heading text-lg font-bold">Для подробной консультации</h3>
            <ul className="mt-4 space-y-2 text-sm text-navy-foreground/70">
              <li>
                <a
                  href="tel:+996999202299"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  +996 (999) 202 299
                </a>
              </li>
              <li>
                <a
                  href="mailto:jorgo.travel.kg@gmail.com"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  jorgo.travel.kg@gmail.com
                </a>
              </li>
              <li>Улица Карасаева, 7, Бишкек, Кыргызстан</li>
            </ul>
            <div className="mt-5 flex gap-3">
              {FOOTER_SOCIALS.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-navy-foreground transition-all duration-300 hover:scale-110 hover:bg-orange hover:text-accent-foreground"
                  >
                    <Icon className="size-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
            <div className="mt-5">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-navy-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} JorgoTravel. Все права защищены.</p>
          <p>Кыргызстан — страна свободы, гор и настоящих эмоций.</p>
        </div>
      </div>
    </footer>
  )
}
