'use client'

import { Reveal } from '@/components/jorgo/reveal'
import { YouTubeEmbed } from '@/components/jorgo/youtube-embed'

const YOUTUBE_ID = '6v2L2UGZJAM'

const GALLERY = [
  {
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80',
    caption: 'Рассвет на Сон-Куле',
  },
  {
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80',
    caption: 'Иссык-Куль на закате',
  },
  {
    image:
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=600&q=80',
    caption: 'Треккинг в горах',
  },
  {
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    caption: 'Каньон Кёль-Суу',
  },
]

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
            Горы, озёра и живые эмоции путешественников — в одном ролике.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <YouTubeEmbed
              videoId={YOUTUBE_ID}
              title="Видео о турах JorgoTravel по Кыргызстану"
            />
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {GALLERY.map((item, i) => (
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
