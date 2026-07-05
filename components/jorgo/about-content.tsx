'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Bus,
  Car,
  CheckCircle2,
  Compass,
  Footprints,
  Landmark,
  Mountain,
  Phone,
  Sparkles,
  Waves,
} from 'lucide-react'

import { useI18n } from '@/components/jorgo/i18n-provider'
import { Reveal } from '@/components/jorgo/reveal'
import { SiteFooter } from '@/components/jorgo/site-footer'
import { SiteHeader } from '@/components/jorgo/site-header'
import { cn } from '@/lib/utils'

const FORMAT_ICONS = [Mountain, Waves, Compass, Footprints, Landmark, Sparkles]

const TRANSPORT = [
  {
    key: 'minivan' as const,
    icon: Car,
    image:
      'https://images.unsplash.com/photo-1519641471654-76cebc7a3415?auto=format&fit=crop&w=1200&q=80',
    accent: 'primary' as const,
  },
  {
    key: 'sprinter' as const,
    icon: Bus,
    image:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    accent: 'accent' as const,
  },
]

export function AboutContent() {
  const { t } = useI18n()
  const a = t.about

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] w-full overflow-hidden pt-[72px] md:pt-20">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80"
            alt="Горы и озёра Кыргызстана"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />

          <div className="relative mx-auto flex min-h-[calc(70vh-5rem)] max-w-7xl flex-col justify-center px-4 py-16 md:px-6 md:py-24">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                {a.heroEyebrow}
              </span>
              <h1 className="mt-6 max-w-3xl text-balance font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                {a.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/90">
                {a.heroSubtitle}
              </p>
              <a
                href="/#contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-bold text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-[1.04]"
              >
                {a.contactCta}
              </a>
            </Reveal>
          </div>
        </section>

        {/* Intro */}
        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16 md:px-6">
            <Reveal direction="left" className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
                    alt="Горы Кыргызстана"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=600&q=80"
                    alt="Зимние горы"
                    className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80"
                  alt="Панорама Тянь-Шаня"
                  className="h-full min-h-[320px] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>

            <Reveal direction="right">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                JorgoTravel
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                {a.introTitle}
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{a.introP1}</p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{a.introP2}</p>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="JorgoTravel"
                  width={120}
                  height={60}
                  className="h-14 w-auto object-contain"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Formats */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                {a.formatsTitle}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {a.formats.map((format, i) => {
                const Icon = FORMAT_ICONS[i]
                return (
                  <Reveal key={format} delay={i * 80}>
                    <article className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                      <span
                        className={cn(
                          'flex size-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110',
                          i % 2 === 0
                            ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                            : 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
                        )}
                      >
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <p className="font-medium leading-snug text-card-foreground">{format}</p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Transport */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                {a.transportTitle}
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                {a.transportTitle}
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {TRANSPORT.map((vehicle, i) => {
                const Icon = vehicle.icon
                const title = vehicle.key === 'minivan' ? a.minivanTitle : a.sprinterTitle
                const features =
                  vehicle.key === 'minivan' ? a.minivanFeatures : a.sprinterFeatures

                return (
                  <Reveal key={vehicle.key} delay={i * 120}>
                    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img
                          src={vehicle.image}
                          alt={title}
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-3">
                          <span
                            className={cn(
                              'flex size-12 items-center justify-center rounded-xl text-white shadow-lg',
                              vehicle.accent === 'primary' ? 'bg-primary' : 'bg-accent',
                            )}
                          >
                            <Icon className="size-6" aria-hidden="true" />
                          </span>
                          <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
                        </div>
                      </div>
                      <ul className="space-y-3 p-6 md:p-8">
                        {features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <CheckCircle2
                              className={cn(
                                'mt-0.5 size-5 shrink-0',
                                vehicle.accent === 'primary' ? 'text-primary' : 'text-accent',
                              )}
                              aria-hidden="true"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="bg-navy py-20 text-navy-foreground md:py-28">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-bold md:text-4xl">{a.whyTitle}</h2>
            </Reveal>

            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {a.whyItems.map((item, i) => (
                <Reveal key={item} delay={i * 90}>
                  <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <p className="font-medium leading-relaxed text-navy-foreground">{item}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-brand-gradient px-4 py-20 text-center text-white md:px-6 md:py-28">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]"
            aria-hidden="true"
          />
          <Reveal className="relative mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl md:text-5xl">{a.ctaTitle}</h2>
            <p className="mt-5 text-pretty text-lg text-white/90">{a.ctaSubtitle}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+996999202299"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-accent shadow-lg transition-transform duration-300 hover:scale-[1.04]"
              >
                <Phone className="size-5" aria-hidden="true" />
                {a.ctaButton}
              </a>
              <Link
                href="/#tours"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t.nav.tours}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
