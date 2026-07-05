'use client'

import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Reveal } from './reveal'

const REVIEWS = [
  {
    name: 'Анна Ковалёва',
    date: 'Август 2025',
    rating: 5,
    text: 'Тур на Сон-Куль превзошёл все ожидания! Гиды профессионалы, маршрут продуман до мелочей. Ночёвка в юрте под звёздным небом — это что-то невероятное.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Дмитрий Соколов',
    date: 'Июль 2025',
    rating: 5,
    text: 'Джип-экспедиция к Кёль-Суу — настоящее приключение. Дороги сложные, но команда JorgoTravel всё организовала на высшем уровне. Виды просто космос!',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Мария Лебедева',
    date: 'Июнь 2025',
    rating: 5,
    text: 'Впервые была в Кыргызстане и влюбилась в эту страну. Индивидуальный маршрут собрали именно под меня. Спасибо за заботу и безопасность на всём пути!',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Игорь Мельников',
    date: 'Сентябрь 2025',
    rating: 5,
    text: 'Треккинг в Ала-Арче с JorgoTravel — лучший активный отдых за последние годы. Отличное снаряжение, вкусная еда в лагере и невероятная природа.',
    avatar: '/placeholder.svg?height=100&width=100',
  },
]

export function Reviews() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % REVIEWS.length), [])
  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <section id="reviews" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Reveal className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            Отзывы реальных туристов
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Что говорят наши гости
          </h2>
        </Reveal>

        <Reveal
          className="mt-12"
          // pause auto-rotate on hover / focus
        >
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {REVIEWS.map((review) => (
                  <article
                    key={review.name}
                    className="w-full shrink-0 px-1"
                    aria-hidden={REVIEWS[index].name !== review.name}
                  >
                    <div className="mx-1 rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
                      <Quote className="size-10 text-primary/25" aria-hidden="true" />
                      <div className="mt-4 flex gap-1" aria-label={`Оценка ${review.rating} из 5`}>
                        {Array.from({ length: review.rating }).map((_, s) => (
                          <Star
                            key={s}
                            className="size-5 fill-accent text-accent"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-pretty text-lg leading-relaxed text-card-foreground">
                        {review.text}
                      </p>
                      <div className="mt-6 flex items-center gap-4">
                        <img
                          src={review.avatar || '/placeholder.svg'}
                          alt={review.name}
                          className="size-12 rounded-full object-cover"
                          loading="lazy"
                        />
                        <div>
                          <p className="font-heading font-bold text-card-foreground">
                            {review.name}
                          </p>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Controls */}
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущий отзыв"
              className="absolute left-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground max-md:hidden"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующий отзыв"
              className="absolute right-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-card-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground max-md:hidden"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {REVIEWS.map((review, i) => (
              <button
                key={review.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Показать отзыв ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === index ? 'w-8 bg-accent' : 'w-2.5 bg-border hover:bg-accent/50',
                )}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
