'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { createBooking, fetchTours, type TourCard } from '@/lib/api'
import { useApiData } from '@/lib/use-api-data'
import { BookingCalendar, formatBookingDate } from '@/components/jorgo/booking-calendar'
import { GoogleBookingCalendar } from '@/components/jorgo/google-booking-calendar'
import { Reveal } from '@/components/jorgo/reveal'
import { SiteFooter } from '@/components/jorgo/site-footer'
import { SiteHeader } from '@/components/jorgo/site-header'
import { TOURS } from '@/lib/tours'
import { cn } from '@/lib/utils'

export function BookingContent() {
  const tours = useApiData<TourCard[]>(fetchTours, TOURS)
  const searchParams = useSearchParams()
  const initialTour = searchParams.get('tour') ?? ''

  const [tourSlug, setTourSlug] = useState(initialTour)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const minDateStr = useMemo(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }, [])

  const dateInputValue = date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    : ''

  const handleDateInput = (value: string) => {
    if (!value) {
      setDate(null)
      return
    }
    const [y, m, d] = value.split('-').map(Number)
    setDate(new Date(y, m - 1, d))
  }

  const selectedTour = useMemo(
    () => tours.find((t) => t.slug === tourSlug),
    [tours, tourSlug],
  )

  const validate = () => {
    const next: Record<string, string> = {}
    if (!tourSlug) next.tour = 'Выберите тур'
    if (!date) next.date = 'Выберите дату начала'
    if (!name.trim()) next.name = 'Введите имя'
    if (!phone.trim()) next.phone = 'Введите телефон'
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Некорректный email'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || !date) return

    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    setSubmitting(true)
    setSubmitError('')
    try {
      await createBooking({
        tour: tourSlug,
        date: dateStr,
        guests,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        note: note.trim() || undefined,
      })
      setSubmitted(true)
    } catch {
      setSubmitError(
        'Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с нами по WhatsApp.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-[80vh] items-center justify-center px-4 pt-24 pb-16">
          <Reveal className="max-w-md text-center">
            <CheckCircle2 className="mx-auto size-16 text-primary" aria-hidden="true" />
            <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
              Заявка отправлена!
            </h1>
            <p className="mt-4 text-muted-foreground">
              Мы получили вашу заявку на бронирование и свяжемся с вами в течение часа для
              подтверждения деталей.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                На главную
              </Link>
              <a
                href="tel:+996999202299"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground"
              >
                <Phone className="size-4" />
                Позвонить
              </a>
            </div>
          </Reveal>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden bg-header-gradient pt-[72px] pb-12 md:pt-20 md:pb-16">
          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <CalendarDays className="size-4" aria-hidden="true" />
                Онлайн-бронирование
              </span>
              <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
                Забронируйте тур
              </h1>
              <p className="mt-3 max-w-xl text-white/90">
                Выберите тур, дату и количество гостей — мы подтвердим бронирование в ближайшее
                время.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_380px] lg:gap-14">
            <Reveal>
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Tour */}
                <fieldset className="space-y-3">
                  <legend className="font-heading text-lg font-bold text-foreground">
                    1. Выберите тур
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {tours.map((tour) => (
                      <label
                        key={tour.slug}
                        className={cn(
                          'flex cursor-pointer gap-3 rounded-2xl border p-4 transition-all duration-300',
                          tourSlug === tour.slug
                            ? 'border-accent bg-accent/5 shadow-md ring-1 ring-accent/30'
                            : 'border-border bg-card hover:border-primary/30',
                        )}
                      >
                        <input
                          type="radio"
                          name="tour"
                          value={tour.slug}
                          checked={tourSlug === tour.slug}
                          onChange={() => setTourSlug(tour.slug)}
                          className="sr-only"
                        />
                        <img
                          src={tour.image}
                          alt=""
                          className="size-16 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-card-foreground">{tour.title}</p>
                          <p className="text-xs text-muted-foreground">{tour.duration}</p>
                          <p className="mt-1 text-sm font-bold text-primary">{tour.price}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.tour && (
                    <p className="text-sm text-destructive">{errors.tour}</p>
                  )}
                </fieldset>

                {/* Calendar */}
                <fieldset className="space-y-3">
                  <legend className="font-heading text-lg font-bold text-foreground">
                    2. Дата начала тура
                  </legend>
                  <p className="text-sm text-muted-foreground">
                    Нажмите на дату в календаре — затем заполните контакты и отправьте заявку.
                  </p>
                  <BookingCalendar selected={date} onSelect={setDate} />
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <label htmlFor="tour-date" className="mb-2 block text-sm font-medium text-foreground">
                      Или укажите дату вручную
                    </label>
                    <input
                      id="tour-date"
                      type="date"
                      min={minDateStr}
                      value={dateInputValue}
                      onChange={(e) => handleDateInput(e.target.value)}
                      className={cn(
                        'w-full max-w-xs rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 sm:max-w-sm',
                        errors.date ? 'border-destructive' : 'border-border',
                      )}
                    />
                  </div>
                  {date && (
                    <p className="text-sm font-medium text-primary">
                      Выбрано: {formatBookingDate(date)}
                    </p>
                  )}
                  {errors.date && (
                    <p className="text-sm text-destructive">{errors.date}</p>
                  )}

                  <details className="group rounded-2xl border border-border bg-card">
                    <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground transition-colors hover:text-primary">
                      Посмотреть занятость в Google Calendar (необязательно)
                    </summary>
                    <div className="border-t border-border">
                      <GoogleBookingCalendar embedded />
                    </div>
                  </details>
                </fieldset>

                {/* Guests + contacts */}
                <fieldset className="space-y-4">
                  <legend className="font-heading text-lg font-bold text-foreground">
                    3. Ваши данные
                  </legend>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Users className="size-4 text-primary" aria-hidden="true" />
                      Количество человек
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-lg font-bold transition-colors hover:bg-muted"
                        aria-label="Уменьшить"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-heading text-2xl font-bold text-foreground">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(20, g + 1))}
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-card text-lg font-bold transition-colors hover:bg-muted"
                        aria-label="Увеличить"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                        <User className="size-4 text-primary" aria-hidden="true" />
                        Имя *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className={cn(
                          'w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20',
                          errors.name ? 'border-destructive' : 'border-border',
                        )}
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                        <Phone className="size-4 text-primary" aria-hidden="true" />
                        Телефон *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+996 ..."
                        className={cn(
                          'w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20',
                          errors.phone ? 'border-destructive' : 'border-border',
                        )}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                      <Mail className="size-4 text-primary" aria-hidden="true" />
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hello@example.com"
                      className={cn(
                        'w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20',
                        errors.email ? 'border-destructive' : 'border-border',
                      )}
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="note" className="mb-1.5 flex items-center gap-2 text-sm font-medium">
                      <MessageSquare className="size-4 text-primary" aria-hidden="true" />
                      Комментарий
                    </label>
                    <textarea
                      id="note"
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Особые пожелания, диетические требования..."
                      className="w-full resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </fieldset>

                {submitError && (
                  <p className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="animate-pulse-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                >
                  <Send className="size-5" aria-hidden="true" />
                  {submitting ? 'Отправляем...' : 'Отправить заявку'}
                </button>
              </form>
            </Reveal>

            {/* Summary sidebar */}
            <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl">
                <div className="bg-header-gradient px-6 py-5 text-white">
                  <p className="text-sm text-white/80">Ваша заявка</p>
                  <p className="mt-1 font-heading text-xl font-bold">
                    {selectedTour?.title ?? 'Выберите тур'}
                  </p>
                </div>
                <div className="space-y-4 p-6 text-sm">
                  {selectedTour && (
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={selectedTour.image}
                        alt={selectedTour.alt}
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Дата</span>
                    <span className="font-semibold text-foreground">
                      {date ? date.toLocaleDateString('ru-RU') : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-border pb-3">
                    <span className="text-muted-foreground">Гостей</span>
                    <span className="font-semibold text-foreground">{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Стоимость</span>
                    <span className="font-heading text-lg font-bold text-primary">
                      {selectedTour?.price ?? '—'}
                    </span>
                  </div>
                  <p className="rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
                    После отправки заявки менеджер свяжется с вами для подтверждения даты и
                    оплаты. Бронирование считается подтверждённым после согласования.
                  </p>
                  <a
                    href="https://wa.me/996999202299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-primary py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <Phone className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
