'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import {
  DEFAULT_LOCALE,
  getTranslation,
  type Locale,
  type TranslationKeys,
} from '@/lib/i18n'

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationKeys
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'jorgo-locale'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null
    if (stored) setLocaleState(stored)
    setMounted(true)
  }, [])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(STORAGE_KEY, next)
    document.documentElement.lang = next
  }

  useEffect(() => {
    if (mounted) document.documentElement.lang = locale
  }, [locale, mounted])

  const t = getTranslation(locale)

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
