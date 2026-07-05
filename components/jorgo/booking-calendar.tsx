'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

type BookingCalendarProps = {
  selected: Date | null
  onSelect: (date: Date) => void
  minDate?: Date
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function BookingCalendar({ selected, onSelect, minDate }: BookingCalendarProps) {
  const today = startOfDay(new Date())
  const min = minDate ? startOfDay(minDate) : today

  const [view, setView] = useState(() => {
    const base = selected ?? today
    return { year: base.getFullYear(), month: base.getMonth() }
  })

  const days = useMemo(() => {
    const first = new Date(view.year, view.month, 1)
    const last = new Date(view.year, view.month + 1, 0)
    const startPad = (first.getDay() + 6) % 7
    const cells: (Date | null)[] = []

    for (let i = 0; i < startPad; i++) cells.push(null)
    for (let d = 1; d <= last.getDate(); d++) {
      cells.push(new Date(view.year, view.month, d))
    }
    return cells
  }, [view.month, view.year])

  const canGoPrev =
    view.year > min.getFullYear() ||
    (view.year === min.getFullYear() && view.month > min.getMonth())

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() =>
            setView((v) => {
              const m = v.month - 1
              return m < 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: m }
            })
          }
          aria-label="Предыдущий месяц"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="font-heading text-lg font-bold text-foreground">
          {MONTHS[view.month]} {view.year}
        </p>
        <button
          type="button"
          onClick={() =>
            setView((v) => {
              const m = v.month + 1
              return m > 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: m }
            })
          }
          aria-label="Следующий месяц"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1 text-xs font-semibold text-muted-foreground">
            {d}
          </span>
        ))}
        {days.map((day, i) => {
          if (!day) return <span key={`empty-${i}`} />
          const disabled = day < min
          const isSelected = selected ? isSameDay(day, selected) : false
          const isToday = isSameDay(day, today)

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-xl text-sm font-medium transition-all duration-200',
                disabled && 'cursor-not-allowed text-muted-foreground/40',
                !disabled && !isSelected && 'text-foreground hover:bg-primary/10 hover:text-primary',
                isToday && !isSelected && 'ring-1 ring-primary/40',
                isSelected && 'scale-105 bg-accent text-accent-foreground shadow-md',
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function formatBookingDate(date: Date) {
  return date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
