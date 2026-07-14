'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowRight, MapPin, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

import { HoverVideo } from '@/components/jorgo/hover-video'
import { Reveal } from '@/components/jorgo/reveal'
import { fetchDestinations } from '@/lib/api'
import {
  DEFAULT_DESTINATION_ID,
  MAP_DESTINATIONS,
  type MapDestination,
} from '@/lib/map-destinations'
import { useApiData } from '@/lib/use-api-data'
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
  const destinations = useApiData<MapDestination[]>(fetchDestinations, MAP_DESTINATIONS)
  const [activeId, setActiveId] = useState(DEFAULT_DESTINATION_ID)
  const active =
    destinations.find((d) => d.id === activeId) ?? destinations[0]

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
              <KyrgyzstanLeafletMap
                activeId={activeId}
                onSelect={setActiveId}
                destinations={destinations}
              />

              <div className="mt-4 flex flex-wrap gap-2">
                {destinations.map((dest) => (
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
  // Индекс -1 — видео локации, 0+ — фотографии
  const hasVideo = Boolean(destination.video)
  const [mediaIndex, setMediaIndex] = useState(hasVideo ? -1 : 0)

  useEffect(() => {
    setMediaIndex(destination.video ? -1 : 0)
  }, [destination.id, destination.video])

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg animate-in fade-in duration-500">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {hasVideo && mediaIndex === -1 && (
          <HoverVideo
            key={destination.id}
            src={destination.video!}
            label={`${destination.name} — видео`}
            className="absolute inset-0"
          />
        )}
        {destination.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${destination.name} — фото ${i + 1}`}
            className={cn(
              'absolute inset-0 size-full object-cover transition-all duration-700',
              i === mediaIndex
                ? 'scale-100 opacity-100'
                : 'pointer-events-none scale-105 opacity-0',
            )}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />

        <div className="pointer-events-none absolute bottom-4 left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
            <MapPin className="size-3.5" aria-hidden="true" />
            {destination.name}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 flex gap-1.5">
          {hasVideo && (
            <button
              type="button"
              aria-label="Видео"
              onClick={() => setMediaIndex(-1)}
              className={cn(
                'size-2.5 rounded-full transition-all duration-300',
                mediaIndex === -1 ? 'w-6 bg-accent' : 'bg-white/50 hover:bg-white/80',
              )}
            />
          )}
          {destination.images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Фото ${i + 1}`}
              onClick={() => setMediaIndex(i)}
              className={cn(
                'size-2.5 rounded-full transition-all duration-300',
                i === mediaIndex ? 'w-6 bg-white' : 'bg-white/50 hover:bg-white/80',
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

        <div className="mt-5 grid grid-cols-4 gap-2">
          {hasVideo && (
            <button
              type="button"
              onClick={() => setMediaIndex(-1)}
              className={cn(
                'relative overflow-hidden rounded-xl border-2 transition-all duration-300',
                mediaIndex === -1
                  ? 'border-accent shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <video
                src={destination.video}
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                className="aspect-[4/3] w-full object-cover"
                onLoadedMetadata={(e) => {
                  e.currentTarget.currentTime = 2
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                <Play className="size-5 fill-white text-white" aria-hidden="true" />
              </span>
            </button>
          )}
          {destination.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setMediaIndex(i)}
              className={cn(
                'overflow-hidden rounded-xl border-2 transition-all duration-300',
                i === mediaIndex
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
