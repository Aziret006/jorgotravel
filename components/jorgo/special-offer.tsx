'use client'

import { useEffect, useMemo, useState } from 'react'

function getRemaining(target: number) {
  const diff = Math.max(0, target - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

const UNITS = [
  { key: 'days', label: 'дней' },
  { key: 'hours', label: 'часов' },
  { key: 'minutes', label: 'минут' },
  { key: 'seconds', label: 'секунд' },
] as const

export function SpecialOffer() {
  // Target: 10 days from first mount — stable within the session.
  const target = useMemo(() => Date.now() + 10 * 24 * 60 * 60 * 1000, [])
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(() => getRemaining(target))

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const deadline = useMemo(
    () =>
      new Date(target).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
      }),
    [target],
  )

  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center text-primary-foreground shadow-xl md:px-12 md:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.15),transparent_45%)]"
            aria-hidden="true"
          />
          <div className="relative">
            <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
              Ограниченное предложение
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-balance font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              Скидка 15% на первый тур при бронировании до {deadline}
            </h2>

            {/* Countdown */}
            <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              {UNITS.map((unit) => (
                <div
                  key={unit.key}
                  className="flex min-w-20 flex-col items-center rounded-2xl bg-white/15 px-4 py-4 backdrop-blur transition-transform duration-300 hover:scale-105 sm:min-w-24"
                >
                  <span className="font-heading text-4xl font-bold tabular-nums sm:text-5xl">
                    {mounted ? String(time[unit.key]).padStart(2, '0') : '--'}
                  </span>
                  <span className="mt-1 text-xs font-medium uppercase tracking-wide text-primary-foreground/80">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="animate-shimmer mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-base font-bold text-accent shadow-lg transition-transform duration-300 hover:scale-[1.05]"
            >
              Забронировать сейчас
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
