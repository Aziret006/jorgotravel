'use client'

import { cn } from '@/lib/utils'
import { ChevronDown, MapPin, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { HeroVideoBackground } from '@/components/jorgo/hero-video-background'

const SLIDE_INTERVAL = 3000

const SLIDES = [
  {
    id: 'trekking',
    video:
      'https://videos.pexels.com/video-files/2680434/2680434-hd_1920_1080_25fps.mp4',
    poster:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    title: 'Треккинг по Тянь-Шаню',
    subtitle: 'Пешие маршруты к вершинам, ледникам и альпийским лугам',
  },
  {
    id: 'lakes',
    video:
      'https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_24fps.mp4',
    poster:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80',
    title: 'Озёра Кыргызстана',
    subtitle: 'Иссык-Куль, Сон-Куль, Кёль-Суу — жемчужины Тянь-Шаня',
  },
  {
    id: 'adventures',
    video:
      'https://videos.pexels.com/video-files/6963395/6963395-hd_1920_1080_25fps.mp4',
    poster:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80',
    title: 'Наши приключения',
    subtitle: 'Посмотрите, как проходят наши туры по Кыргызстану',
  },
]

export function Hero() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => goTo(active + 1), [active, goTo])

  const slide = SLIDES[active]

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(next, SLIDE_INTERVAL)
    return () => window.clearInterval(id)
  }, [paused, next])

  return (
    <section
      id="top"
      className="relative min-h-svh w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 size-full">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {SLIDES.map((item, i) => (
            <div key={item.id} className="relative h-full w-full shrink-0">
              <HeroVideoBackground
                src={item.video}
                poster={item.poster}
                active={i === active}
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 sm:left-6 sm:block md:left-8"
        role="tablist"
        aria-label="Слайды hero"
      >
        <div className="flex flex-col items-center gap-3 rounded-full border border-white/15 bg-white/10 px-2.5 py-4 backdrop-blur-md">
          {SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Слайд ${i + 1}: ${item.title}`}
              onClick={() => goTo(i)}
              className="group relative flex items-center justify-center p-0.5"
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-500 ease-out',
                  i === active
                    ? 'h-8 w-2 bg-accent shadow-[0_0_12px_rgba(232,82,10,0.6)]'
                    : 'size-2 bg-white/35 group-hover:bg-white/60',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:hidden"
        role="tablist"
        aria-label="Слайды hero"
      >
        {SLIDES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Слайд ${i + 1}: ${item.title}`}
            onClick={() => goTo(i)}
            className={cn(
              'rounded-full transition-all duration-500',
              i === active ? 'h-2 w-6 bg-accent' : 'size-2 bg-white/40',
            )}
          />
        ))}
      </div>

      <div className="relative z-20 flex min-h-svh w-full flex-col justify-end px-4 pb-12 pt-28 sm:px-8 md:px-12 md:pb-16 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div key={active} className="hero-content-fade">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              Кыргызстан — страна свободы и гор
            </p>

            <div className="flex items-end gap-4">
              <h1 className="max-w-3xl text-balance font-heading text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl">
                {slide.title}
              </h1>
              <span className="mb-2 hidden shrink-0 font-heading text-sm font-semibold tracking-widest text-white/40 sm:block">
                {String(active + 1).padStart(2, '0')}
                <span className="mx-1 text-white/25">/</span>
                {String(SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/90 sm:text-lg md:text-xl">
              {slide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#tours"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-bold uppercase tracking-wide text-accent-foreground shadow-lg shadow-accent/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-accent/35"
              >
                Подробнее
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20"
              >
                Свяжитесь с нами
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/85 backdrop-blur-sm sm:gap-x-8 sm:px-6">
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
              4.9 из 5 — рейтинг туристов
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
            <span>500+ довольных путешественников</span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden="true" />
            <span>10+ лет опыта</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 h-0.5 bg-white/15">
        <div
          key={`progress-${active}`}
          className={cn(
            'h-full bg-accent hero-slide-progress',
            paused && 'paused',
          )}
        />
      </div>

      <a
        href="#formats"
        aria-label="Прокрутить вниз"
        className="absolute bottom-8 left-1/2 z-30 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-accent hover:text-accent"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
