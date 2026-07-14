'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Play, Tag } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

import { Reveal } from './reveal'
import { fetchTours, type TourCard } from '@/lib/api'
import { TOURS } from '@/lib/tours'
import { useApiData } from '@/lib/use-api-data'
import { cn } from '@/lib/utils'

/** Первый кадр видео часто тёмный — перематываем для превью. */
const PREVIEW_TIME = 2

function seekPreview(el: HTMLVideoElement) {
  if (el.currentTime === 0 && el.paused) {
    el.currentTime = PREVIEW_TIME
  }
}

function TourCardMedia({ tour }: { tour: TourCard }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    const el = ref.current
    if (!el) return
    void el.play().catch(() => {})
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    ref.current?.pause()
    setPlaying(false)
  }, [])

  if (!tour.video) {
    return (
      <img
        src={tour.image}
        alt={tour.alt}
        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    )
  }

  return (
    <span className="block size-full" onMouseEnter={play} onMouseLeave={pause}>
      <video
        ref={(el) => {
          ref.current = el
          // Метаданные могут загрузиться до гидратации — событие не сработает
          if (el && el.readyState >= 1) seekPreview(el)
        }}
        src={tour.video}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={tour.alt}
        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        onLoadedMetadata={(e) => seekPreview(e.currentTarget)}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300',
          playing && 'opacity-0',
        )}
        aria-hidden="true"
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md">
          <Play className="ml-0.5 size-5 fill-white text-white" />
        </span>
      </span>
    </span>
  )
}

export function PopularTours() {
  const tours = useApiData<TourCard[]>(fetchTours, TOURS)

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
          {tours.map((tour, i) => (
            <Reveal
              key={tour.slug}
              delay={(i % 3) * 100}
              className="group h-full"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
                <Link href={`/tours/${tour.slug}`} className="relative aspect-[4/3] overflow-hidden">
                  <TourCardMedia tour={tour} />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
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
