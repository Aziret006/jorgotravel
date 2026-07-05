'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useI18n } from '@/components/jorgo/i18n-provider'
import { LanguageSwitcher } from '@/components/jorgo/language-switcher'
import { HEADER_SOCIALS } from '@/components/jorgo/social-links'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { t } = useI18n()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navLinks = [
    { label: t.nav.about, href: '/about' },
    { label: t.nav.tours, href: '/#tours' },
    { label: t.nav.reviews, href: '/#reviews' },
    { label: t.nav.contact, href: '/#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 bg-header-gradient transition-shadow duration-500',
        scrolled && 'shadow-lg',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 md:h-20 md:gap-6 md:px-6">
        <Link
          href="/"
          className="relative h-12 w-28 shrink-0 transition-transform duration-300 hover:scale-[1.03] md:h-14 md:w-32"
        >
          <Image
            src="/logo.png"
            alt="JorgoTravel"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-sm font-semibold text-white/90 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:text-white hover:after:w-full',
                pathname === link.href && 'text-white after:w-full',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden items-center gap-0.5 md:flex">
            {HEADER_SOCIALS.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-9 items-center justify-center rounded-full text-white/85 transition-all duration-300 hover:scale-110 hover:bg-white/15 hover:text-white"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              )
            })}
          </div>

          <LanguageSwitcher className="hidden sm:block" />

          <Link
            href="/booking"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-md transition-all duration-300 hover:scale-[1.03] md:inline-flex"
          >
            {t.nav.booking}
          </Link>

          <a
            href="tel:+996999202299"
            className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg lg:inline-flex"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            <span className="hidden xl:inline">+996 (999) 202 299</span>
            <span className="xl:hidden">Позвонить</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'overflow-hidden border-t border-white/15 bg-header-gradient transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-[32rem]' : 'max-h-0 border-t-0',
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-3 flex flex-wrap gap-2 border-t border-white/15 pt-4">
            {HEADER_SOCIALS.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>

          <LanguageSwitcher className="mt-3" />

          <a
            href="tel:+996999202299"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-base font-semibold text-primary"
          >
            <Phone className="size-4 text-accent" aria-hidden="true" />
            +996 (999) 202 299
          </a>
        </nav>
      </div>
    </header>
  )
}
