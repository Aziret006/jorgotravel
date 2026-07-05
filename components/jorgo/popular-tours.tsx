import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'

import { Reveal } from './reveal'
import { TOURS } from '@/lib/tours'

export function PopularTours() {
  return (
    <section id="tours" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Популярные туры
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Наши хиты сезона
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Самые востребованные маршруты, которые выбирают наши путешественники.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {TOURS.map((tour, i) => (
            <Reveal
              key={tour.slug}
              delay={(i % 3) * 100}
              className="group h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                <Link href={`/tours/${tour.slug}`} className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.alt}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
                    <Tag className="size-3.5" aria-hidden="true" />
                    {tour.type}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <Link href={`/tours/${tour.slug}`}>
                    <h3 className="font-heading text-xl font-bold text-card-foreground transition-colors duration-300 group-hover:text-primary">
                      {tour.title}
                    </h3>
                  </Link>
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="size-4" aria-hidden="true" />
                    {tour.duration}
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className="font-heading text-lg font-bold text-primary">
                      {tour.price}
                    </span>
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-card-foreground transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground"
                    >
                      Подробнее
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
