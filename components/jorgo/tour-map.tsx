'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Reveal } from '@/components/jorgo/reveal'
import {
  DEFAULT_DESTINATION_ID,
  MAP_DESTINATIONS,
  type MapDestination,
} from '@/lib/map-destinations'
import { cn } from '@/lib/utils'

const KyrgyzstanLeafletMap = dynamic(
  () =>
    import('@/components/jorgo/kyrgyzstan-leaflet-map').then(
      (mod) => mod.KyrgyzstanLeafletMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] items-center justify-center rounded-2xl bg-muted md:h-[520px]">
        <p className="text-sm text-muted-foreground">Загрузка карты…</p>
      </div>
    ),
  },
)

export function TourMap() {
  const [activeId, setActiveId] = useState(DEFAULT_DESTINATION_ID)
  const active =
    MAP_DESTINATIONS.find((d) => d.id === activeId) ?? MAP_DESTINATIONS[0]

  return (
    <section id="map" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            🇰🇬 Кыргызстан
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Интерактивная карта туров
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Спутниковая карта как в Google Earth — нажмите на место и сразу увидите
            фотографии.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-lg md:p-4">
              <KyrgyzstanLeafletMap activeId={activeId} onSelect={setActiveId} />

              <div className="mt-4 flex flex-wrap gap-2">
                {MAP_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => setActiveId(dest.id)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300',
                      activeId === dest.id
                        ? 'bg-accent text-accent-foreground shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary',
                    )}
                  >
                    ○ {dest.name}
                  </button>
                ))}
              </div>
            </div>

            <DestinationPanel destination={active} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DestinationPanel({ destination }: { destination: MapDestination }) {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    setImageIndex(0)
  }, [destination.id])

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg animate-in fade-in duration-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {destination.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${destination.name} — фото ${i + 1}`}
            className={cn(
              'absolute inset-0 size-full object-cover transition-all duration-700',
              i === imageIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
            <MapPin className="size-3.5" aria-hidden="true" />
            {destination.name}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {destination.images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Фото ${i + 1}`}
              onClick={() => setImageIndex(i)}
              className={cn(
                'size-2.5 rounded-full transition-all duration-300',
                i === imageIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <h3 className="font-heading text-2xl font-bold text-card-foreground">
          {destination.name}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
          {destination.description}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {destination.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setImageIndex(i)}
              className={cn(
                'overflow-hidden rounded-xl border-2 transition-all duration-300',
                i === imageIndex
                  ? 'border-accent shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>

        {destination.slug ? (
          <Link
            href={`/tours/${destination.slug}`}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] hover:bg-primary/90"
          >
            Тур в {destination.name}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        ) : (
          <a
            href="/#contact"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] hover:bg-primary/90"
          >
            Узнать о туре
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}
