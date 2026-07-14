'use client'

import { useEffect, useState } from 'react'

/**
 * Загружает данные из Django API на клиенте.
 * Пока идёт запрос (или если API недоступен) — используется fallback,
 * поэтому сайт продолжает работать даже без бэкенда.
 */
export function useApiData<T>(fetcher: () => Promise<T>, fallback: T): T {
  const [data, setData] = useState<T>(fallback)

  useEffect(() => {
    let cancelled = false
    fetcher()
      .then((result) => {
        const hasData = Array.isArray(result) ? result.length > 0 : Boolean(result)
        if (!cancelled && hasData) {
          setData(result)
        }
      })
      .catch(() => {
        // API недоступен — остаёмся на статичных данных
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return data
}
