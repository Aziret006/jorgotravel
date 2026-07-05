'use client'

import { Compass, Footprints, Landmark, Mountain, Sparkles, Waves } from 'lucide-react'

import { Reveal } from '@/components/jorgo/reveal'
import { YouTubeEmbed } from '@/components/jorgo/youtube-embed'
import { cn } from '@/lib/utils'

const YOUTUBE_ID = '6v2L2UGZJAM'

const FORMATS = [
  {
    icon: Mountain,
    title: 'Горные и треккинг-туры',
    description: 'Пешие маршруты по хребтам Тянь-Шаня для любого уровня подготовки.',
    tagline: 'Вершины, которые запомнятся навсегда',
    image:
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=900&q=80',
    accent: 'primary' as const,
  },
  {
    icon: Waves,
    title: 'Туры к озёрам',
    description: 'Иссык-Куль, Сон-Куль, Кёль-Суу и другие жемчужины страны.',
    tagline: 'Кристальная вода и горные панорамы',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
    accent: 'accent' as const,
  },
  {
    icon: Compass,
    title: 'Джип-туры и экспедиции',
    description: 'Внедорожные приключения к самым труднодоступным локациям.',
    tagline: 'Туда, куда не доедет обычный автомобиль',
    image:
      'https://images.unsplash.com/photo-1519641471654-76cebc7a3415?auto=format&fit=crop&w=900&q=80',
    accent: 'primary' as const,
  },
  {
    icon: Footprints,
    title: 'Конные туры',
    description: 'Кочевые маршруты верхом по традициям кыргызских наездников.',
    tagline: 'Юрты, степи и свобода кочевой жизни',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    accent: 'accent' as const,
  },
  {
    icon: Landmark,
    title: 'Культурно-исторические маршруты',
    description: 'Великий Шёлковый путь, петроглифы и живые традиции народа.',
    tagline: 'История, которую можно потрогать',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    accent: 'primary' as const,
  },
  {
    icon: Sparkles,
    title: 'Индивидуальные авторские туры',
    description: 'Маршрут, собранный под ваши интересы, темп и бюджет.',
    tagline: 'Ваше путешествие — ваши правила',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
    accent: 'accent' as const,
  },
]

function FormatCard({
  format,
  index,
  featured = false,
}: {
  format: (typeof FORMATS)[0]
  index: number
  featured?: boolean
}) {
  const Icon = format.icon

  return (
    <Reveal
      delay={index * 100}
      className={cn('group h-full', featured && 'sm:col-span-2 lg:col-span-2 lg:row-span-2')}
    >
      <article
        className={cn(
          'relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl',
          featured && 'min-h-[360px] md:min-h-[520px]',
        )}
      >
        {featured ? (
          <>
            <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-navy">
              <YouTubeEmbed
                videoId={YOUTUBE_ID}
                title="Видео о горных турах JorgoTravel"
              />
            </div>
            <div className="relative flex flex-1 flex-col bg-navy p-6 md:p-8">
              <span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-primary/90 text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {format.tagline}
              </p>
              <h3 className="mt-1 font-heading text-2xl font-bold text-white md:text-3xl">
                {format.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                {format.description}
              </p>
            </div>
          </>
        ) : (
          <>
            <img
              src={format.image}
              alt={format.title}
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-navy/20 transition-opacity duration-500 group-hover:via-navy/60" />
            <div className="relative mt-auto p-6 md:p-8">
              <span
                className={cn(
                  'mb-3 inline-flex size-11 items-center justify-center rounded-xl backdrop-blur transition-transform duration-500 group-hover:scale-110',
                  format.accent === 'primary'
                    ? 'bg-primary/90 text-primary-foreground'
                    : 'bg-accent/90 text-accent-foreground',
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                {format.tagline}
              </p>
              <h3 className="mt-1 font-heading text-xl font-bold text-white drop-shadow-md">
                {format.title}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 md:text-base">
                {format.description}
              </p>
            </div>
          </>
        )}
      </article>
    </Reveal>
  )
}

export function TourFormats() {
  const [featured, ...rest] = FORMATS

  return (
    <section id="formats" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div
        className="pointer-events-none absolute -right-32 top-20 size-96 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-20 size-80 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Форматы путешествий
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Мы предлагаем разнообразные форматы путешествий
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Выберите приключение по душе — от спокойных прогулок у озёр до
            экстремальных экспедиций в горы.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormatCard format={featured} index={0} featured />
          {rest.map((format, i) => (
            <FormatCard key={format.title} format={format} index={i + 1} />
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href="#tours"
            className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-bold text-accent-foreground shadow-lg transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-accent/30"
          >
            Смотреть далее
          </a>
        </Reveal>
      </div>
    </section>
  )
}
