'use client'

import {
  BadgeCheck,
  HeartHandshake,
  Map,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react'

import { CountUp } from '@/components/jorgo/count-up'
import { Reveal } from '@/components/jorgo/reveal'
import { YouTubeEmbed } from '@/components/jorgo/youtube-embed'
import { cn } from '@/lib/utils'

const YOUTUBE_ID = '6v2L2UGZJAM'

const STATS = [
  {
    value: 10,
    suffix: '+',
    label: 'лет опыта в организации туров',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    value: 500,
    suffix: '+',
    label: 'довольных туристов',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    value: 100,
    suffix: '%',
    label: 'авторские маршруты',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
  },
]

const ADVANTAGES = [
  {
    icon: BadgeCheck,
    title: 'Лицензированные гиды',
    description: 'Опытные проводники с сертификацией и знанием региона.',
    image:
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Map,
    title: '100% авторские маршруты',
    description: 'Уникальные программы, которых нет у других туроператоров.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: HeartHandshake,
    title: 'Индивидуальный подход',
    description: 'Подбираем тур под ваш уровень, интересы и бюджет.',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: ShieldCheck,
    title: 'Безопасность и страховка',
    description: 'Проверенное снаряжение и медицинская страховка в каждом туре.',
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Users,
    title: 'Небольшие группы',
    description: 'Камерные группы для комфорта и живого общения.',
    image:
      'https://images.unsplash.com/photo-1519641471654-76cebc7a3415?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Sparkles,
    title: 'Эмоции и впечатления',
    description: 'Мы создаём моменты, которые останутся с вами навсегда.',
    image:
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=800&q=80',
  },
]

export function WhyChooseUs() {
  return (
    <section id="why" className="relative overflow-hidden bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Почему выбирают нас
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Почему JorgoTravel — ваш лучший гид по Кыргызстану
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Цифры, которые говорят сами за себя — и команда, которая делает каждый тур особенным.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 120}>
              <article className="group relative overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                <img
                  src={stat.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-navy/75 backdrop-blur-[2px] transition-colors duration-500 group-hover:bg-navy/65" />
                <div className="relative px-6 py-10 text-center">
                  <div className="font-heading text-5xl font-bold text-white md:text-6xl">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-white/85">{stat.label}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <div className="grid lg:grid-cols-5">
              <div className="relative aspect-video lg:col-span-3 lg:aspect-auto lg:min-h-[320px]">
                <YouTubeEmbed
                  videoId={YOUTUBE_ID}
                  title="JorgoTravel — наши туры по Кыргызстану"
                />
              </div>
              <div className="flex flex-col justify-center bg-navy px-8 py-10 lg:col-span-2 lg:px-10">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                  Видео о нас
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-white md:text-3xl">
                  Посмотрите, как проходят наши туры
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                  Горы, озёра и настоящие эмоции — в одном ролике от JorgoTravel.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal key={item.title} delay={i * 80} className="group h-full">
                <article className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

                  <div className="relative mt-auto p-6">
                    <span
                      className={cn(
                        'mb-4 inline-flex size-12 items-center justify-center rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-110',
                        i % 2 === 0
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-accent text-accent-foreground',
                      )}
                    >
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-heading text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/85 transition-all duration-500 group-hover:text-white">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
