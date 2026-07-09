'use client'

import { Reveal } from '@/components/jorgo/reveal'
import { JORGO_EASTERN, JORGO_GALLERY } from '@/lib/jorgo-media'

export function VideoGallery() {
  return (
    <section id="video" className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(27,174,130,0.22),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Вдохновение в движении
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Посмотрите, как проходят наши туры
          </h2>
          <p className="mt-4 text-pretty text-navy-foreground/70">
            Реальные фото с маршрута «Восточный тур» — 9 локаций за 3 дня.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img
              src={JORGO_EASTERN.skazka}
              alt="Каньон Сказка — Восточный тур JorgoTravel"
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <p className="absolute bottom-6 left-6 font-heading text-2xl font-bold text-white md:text-3xl">
              Каньон Сказка
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {JORGO_GALLERY.map((item, i) => (
            <Reveal key={item.caption} delay={i * 90} className="group">
              <figure className="overflow-hidden rounded-2xl border border-white/10">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <figcaption className="bg-white/5 px-3 py-2.5 text-center text-xs font-medium text-navy-foreground/80">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
