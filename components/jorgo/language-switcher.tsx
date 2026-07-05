'use client'

import { ChevronDown, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useI18n } from '@/components/jorgo/i18n-provider'
import { LOCALES } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  variant?: 'header' | 'footer'
  className?: string
}

export function LanguageSwitcher({ variant = 'header', className }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[6]

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const isHeader = variant === 'header'

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.lang}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg text-sm font-medium transition-colors',
          isHeader
            ? 'px-2.5 py-2 text-white/90 hover:bg-white/10'
            : 'border border-white/15 bg-white/5 px-3 py-2 text-navy-foreground hover:bg-white/10',
        )}
      >
        <Globe className="size-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown
          className={cn('size-4 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.lang}
          className={cn(
            'absolute z-50 max-h-72 min-w-[180px] overflow-y-auto rounded-xl border shadow-xl',
            isHeader
              ? 'right-0 top-full mt-2 border-white/20 bg-navy text-white'
              : 'bottom-full left-0 mb-2 border-border bg-card text-card-foreground',
          )}
        >
          <li className="border-b border-inherit px-4 py-2.5 text-xs font-semibold uppercase tracking-wider opacity-60">
            {t.lang}
          </li>
          {LOCALES.map((lang) => (
            <li key={lang.code} role="option" aria-selected={locale === lang.code}>
              <button
                type="button"
                onClick={() => {
                  setLocale(lang.code)
                  setOpen(false)
                }}
                className={cn(
                  'w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-primary/15',
                  locale === lang.code &&
                    (isHeader ? 'bg-primary/25 font-semibold text-white' : 'bg-primary/10 font-semibold text-primary'),
                )}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
