'use client'

import { cn } from '@/lib/utils'
import { JORGO_HERO_SLIDES } from '@/lib/jorgo-media'
import { ArrowRight, ChevronDown, MapPin, Star, Users, Award } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

const SLIDE_INTERVAL = 4000

const SLIDES = JORGO_HERO_SLIDES

const STATS = [
  { icon: Star, value: '4.9', label: 'рейтинг туристов' },
  { icon: Users, value: '500+', label: 'путешественников' },
  { icon: Award, value: '10+', label: 'лет опыта' },
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
      {/* Background slides — crossfade */}
      <div className="absolute inset-0 size-full">
        {SLIDES.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={i !== active}
          >
            <img
              src={item.image}
              alt={item.alt}
              className={cn(
                'size-full object-cover object-center',
                i === active && 'animate-ken-burns',
              )}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,transparent_0%,rgba(0,0,0,0.35)_100%)]"
          aria-hidden="true"
        />
      </div>

      {/* Slide nav — desktop */}
      <div className="absolute bottom-32 left-4 z-30 hidden flex-col gap-4 sm:left-8 md:bottom-auto md:left-10 md:top-1/2 md:-translate-y-1/2 lg:left-14">
        <div
          className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-black/25 p-3 backdrop-blur-xl"
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
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-300',
                i === active ? 'bg-white/15' : 'hover:bg-white/10',
              )}
            >
              <span
                className={cn(
                  'font-heading text-xs font-bold tabular-nums transition-colors',
                  i === active ? 'text-accent' : 'text-white/40',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'hidden max-w-[120px] truncate text-xs font-medium transition-colors lg:block',
                  i === active ? 'text-white' : 'text-white/50 group-hover:text-white/80',
                )}
              >
                {item.title}
              </span>
              <span
                className={cn(
                  'ml-auto h-1 rounded-full transition-all duration-500',
                  i === active ? 'w-8 bg-accent' : 'w-3 bg-white/25',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile dots */}
      <div
        className="absolute bottom-28 left-1/2 z-30 flex -translate-x-1/2 gap-2 md:hidden"
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
              i === active ? 'h-2 w-7 bg-accent shadow-[0_0_10px_rgba(232,82,10,0.5)]' : 'size-2 bg-white/40',
            )}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex min-h-svh w-full flex-col justify-end px-4 pb-14 pt-28 sm:px-8 md:px-12 md:pb-20 lg:px-16">
        <div className="mx-auto w-full max-w-7xl md:pl-44 lg:pl-52">
          <div key={active} className="hero-content-fade max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white/95 shadow-lg backdrop-blur-md">
              <span className="flex size-6 items-center justify-center rounded-full bg-accent/90">
                <MapPin className="size-3.5 text-white" aria-hidden="true" />
              </span>
              Кыргызстан — страна свободы и гор
            </p>

            <div className="flex items-start justify-between gap-6">
              <div>
                <h1 className="text-balance font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                  {slide.title}
                </h1>
                <span className="mt-3 block h-1 w-16 rounded-full bg-accent shadow-[0_0_16px_rgba(232,82,10,0.5)]" />
              </div>
              <div className="hidden shrink-0 flex-col items-end pt-2 sm:flex">
                <span className="font-heading text-3xl font-bold tabular-nums text-white/90 md:text-4xl">
                  {String(active + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
                  / {String(SLIDES.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg md:text-xl md:leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#tours"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-[0_8px_32px_rgba(232,82,10,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(232,82,10,0.45)] sm:text-base"
              >
                Подробнее
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/20 sm:text-base"
              >
                Свяжитесь с нами
              </a>
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-3 md:max-w-3xl">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/30 px-4 py-3.5 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-black/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="size-4 fill-accent/20" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-bold leading-none text-white">{stat.value}</p>
                    <p className="mt-0.5 text-xs text-white/60">{stat.label}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/10">
        <div
          key={`progress-${active}`}
          className={cn(
            'h-full bg-gradient-to-r from-accent/80 via-accent to-accent/90 hero-slide-progress shadow-[0_0_12px_rgba(232,82,10,0.6)]',
            paused && 'paused',
          )}
        />
      </div>

      <a
        href="#formats"
        aria-label="Прокрутить вниз"
        className="absolute bottom-10 right-6 z-30 hidden size-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-white/80 backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent md:flex lg:right-10"
      >
        <ChevronDown className="size-5 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
