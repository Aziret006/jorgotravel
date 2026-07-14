'use client'

import { Play } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

import { Reveal } from '@/components/jorgo/reveal'
import { JORGO_PRODUCT_VIDEOS } from '@/lib/jorgo-media'
import { cn } from '@/lib/utils'

const INITIAL_COUNT = 8

/** Первый кадр видео часто тёмный — перематываем для превью. */
const PREVIEW_TIME = 2

function seekPreview(el: HTMLVideoElement) {
  if (el.currentTime === 0 && el.paused) {
    el.currentTime = PREVIEW_TIME
  }
}

function VideoCard({
  video,
}: {
  video: (typeof JORGO_PRODUCT_VIDEOS)[number]
}) {
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

  return (
    <figure
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <div className="relative aspect-video overflow-hidden">
        <video
          ref={(el) => {
            ref.current = el
            // Метаданные могут загрузиться до гидратации — событие не сработает
            if (el && el.readyState >= 1) seekPreview(el)
          }}
          src={video.src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={video.title}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          onClick={() => (playing ? pause() : play())}
          onLoadedMetadata={(e) => seekPreview(e.currentTarget)}
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 transition-opacity duration-300',
            playing && 'opacity-0',
          )}
          aria-hidden="true"
        >
          <span className="flex size-14 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md">
            <Play className="ml-0.5 size-6 fill-white text-white" />
          </span>
        </div>
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8 font-heading text-sm font-bold text-white">
        {video.title}
      </figcaption>
    </figure>
  )
}

export function ProductsShowcase() {
  const [showAll, setShowAll] = useState(false)
  const videos = showAll ? JORGO_PRODUCT_VIDEOS : JORGO_PRODUCT_VIDEOS.slice(0, INITIAL_COUNT)

  return (
    <section
      id="locations"
      className="relative overflow-hidden bg-navy py-20 text-navy-foreground md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(27,174,130,0.2),transparent_45%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Наши локации
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Места, которые вы увидите своими глазами
          </h2>
          <p className="mt-4 text-pretty text-navy-foreground/70">
            Живые видео с наших маршрутов — наведите на карточку, чтобы посмотреть.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video, i) => (
            <Reveal key={video.id} delay={(i % 4) * 90}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>

        {!showAll && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-foreground sm:text-base"
            >
              Показать все локации ({JORGO_PRODUCT_VIDEOS.length})
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
