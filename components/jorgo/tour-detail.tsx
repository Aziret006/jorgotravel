import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Mountain,
  Phone,
  Tag,
  Users,
  X,
} from 'lucide-react'

import { Reveal } from '@/components/jorgo/reveal'
import { SiteFooter } from '@/components/jorgo/site-footer'
import { SiteHeader } from '@/components/jorgo/site-header'
import type { Tour } from '@/lib/tours'
import { getRelatedTours } from '@/lib/tours'
import { cn } from '@/lib/utils'

type TourDetailProps = {
  tour: Tour
}

const DIFFICULTY_COLOR: Record<Tour['difficulty'], string> = {
  'Лёгкая': 'bg-primary/10 text-primary',
  'Средняя': 'bg-accent/10 text-accent',
  'Сложная': 'bg-navy/10 text-navy',
}

export function TourDetail({ tour }: TourDetailProps) {
  const related = getRelatedTours(tour.slug)

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[55vh] overflow-hidden pt-20 md:min-h-[65vh] md:pt-24">
          <img
            src={tour.image}
            alt={tour.alt}
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-end px-4 pb-10 md:min-h-[65vh] md:px-6 md:pb-14">
            <nav aria-label="Хлебные крошки" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-white/75">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Главная
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/#tours" className="transition-colors hover:text-white">
                    Туры
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-medium text-white">{tour.title}</li>
              </ol>
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-foreground shadow">
                <Tag className="size-3.5" aria-hidden="true" />
                {tour.type}
              </span>
              <span
                className={cn(
                  'rounded-full px-4 py-1.5 text-sm font-semibold',
                  DIFFICULTY_COLOR[tour.difficulty],
                )}
              >
                {tour.difficulty}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-balance font-heading text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              {tour.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4 text-primary" aria-hidden="true" />
                {tour.duration}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="size-4 text-primary" aria-hidden="true" />
                {tour.groupSize}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4 text-primary" aria-hidden="true" />
                {tour.season}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {tour.location}
              </span>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="border-b border-border bg-secondary">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
            {[
              { label: 'Длительность', value: tour.duration },
              { label: 'Группа', value: tour.groupSize },
              { label: 'Сложность', value: tour.difficulty },
              { label: 'Сезон', value: tour.season },
            ].map((stat) => (
              <div key={stat.label} className="bg-secondary px-6 py-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 font-heading text-lg font-bold text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div className="min-w-0">
              <Reveal>
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  О туре
                </h2>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {tour.description}
                </p>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  Главные впечатления
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {tour.highlights.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                    >
                      <span
                        className={cn(
                          'mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white',
                          i % 2 === 0 ? 'bg-primary' : 'bg-accent',
                        )}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-card-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  Программа по дням
                </h2>
                <ol className="relative mt-8 space-y-0">
                  <div
                    className="absolute bottom-4 left-5 top-4 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30"
                    aria-hidden="true"
                  />
                  {tour.itinerary.map((day) => (
                    <li key={day.day} className="relative flex gap-5 pb-8 last:pb-0">
                      <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary font-heading text-sm font-bold text-primary-foreground shadow-md">
                        {day.day}
                      </span>
                      <div className="flex-1 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md">
                        <h3 className="font-heading text-lg font-bold text-card-foreground">
                          День {day.day}. {day.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {day.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="mt-12 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <Check className="size-5 text-primary" aria-hidden="true" />
                    Включено в стоимость
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {tour.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                    <X className="size-5 text-muted-foreground" aria-hidden="true" />
                    Не включено
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {tour.notIncluded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <X
                          className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  Фотогалерея
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {tour.gallery.map((src, i) => (
                    <figure
                      key={src}
                      className="group overflow-hidden rounded-2xl border border-border shadow-sm"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={src}
                          alt={`${tour.title} — фото ${i + 1}`}
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Booking sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                  <div className="bg-header-gradient px-6 py-5 text-white">
                    <p className="text-sm font-medium text-white/80">Стоимость тура</p>
                    <p className="mt-1 font-heading text-3xl font-bold">{tour.price}</p>
                    {tour.priceNote && (
                      <p className="mt-1 text-xs text-white/70">{tour.priceNote}</p>
                    )}
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground">Длительность</span>
                        <span className="font-semibold text-foreground">{tour.duration}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <span className="text-muted-foreground">Группа</span>
                        <span className="font-semibold text-foreground">{tour.groupSize}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Регион</span>
                        <span className="font-semibold text-foreground">{tour.location}</span>
                      </div>
                    </div>

                    <Link
                      href={`/booking?tour=${tour.slug}`}
                      className="animate-pulse-glow flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <Phone className="size-5" aria-hidden="true" />
                      Забронировать
                    </Link>
                    <a
                      href="/#contact"
                      className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                    >
                      Задать вопрос
                    </a>
                    <p className="text-center text-xs text-muted-foreground">
                      Бесплатная консультация · Ответим в течение часа
                    </p>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </section>

        {/* Related tours */}
        <section className="border-t border-border bg-secondary py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <Reveal className="flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                  Ещё туры
                </span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
                  Вам также понравится
                </h2>
              </div>
              <Link
                href="/#tours"
                className="hidden items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent sm:inline-flex"
              >
                Все туры
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Reveal>

            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <Reveal key={item.slug} delay={i * 100} className="group h-full">
                  <Link
                    href={`/tours/${item.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
                        <Tag className="size-3.5" aria-hidden="true" />
                        {item.type}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-heading text-lg font-bold text-card-foreground">
                        {item.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" aria-hidden="true" />
                        {item.duration}
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4">
                        <span className="font-heading font-bold text-primary">{item.price}</span>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                          Подробнее
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative overflow-hidden bg-brand-gradient px-4 py-16 text-center text-white md:px-6 md:py-20">
          <div className="relative mx-auto max-w-2xl">
            <Mountain className="mx-auto size-12 opacity-80" aria-hidden="true" />
            <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
              Готовы отправиться в путь?
            </h2>
            <p className="mt-4 text-pretty text-white/90">
              Свяжитесь с нами — подберём даты, ответим на вопросы и поможем
              спланировать незабываемое путешествие.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="tel:+996999202299"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-accent shadow-lg transition-transform duration-300 hover:scale-[1.04]"
              >
                <Phone className="size-5" aria-hidden="true" />
                +996 (999) 202 299
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-3.5 text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
              >
                <ArrowLeft className="size-5" aria-hidden="true" />
                На главную
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
