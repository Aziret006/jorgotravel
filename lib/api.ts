import type { Tour } from '@/lib/tours'
import type { MapDestination } from '@/lib/map-destinations'

/**
 * Базовый URL Django-бэкенда.
 * Production: http://165.245.220.106/api (nginx проксирует на gunicorn).
 * Локально можно переопределить в .env.local: NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://165.245.220.106/api'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new ApiError(res.status, detail)
  }
  return res.json() as Promise<T>
}

export class ApiError extends Error {
  status: number
  detail: string

  constructor(status: number, detail: string) {
    super(`API error ${status}`)
    this.status = status
    this.detail = detail
  }
}

/** Краткая карточка тура из каталога (без маршрута и галереи). */
export type TourCard = Omit<
  Tour,
  'gallery' | 'description' | 'highlights' | 'itinerary' | 'included' | 'notIncluded'
>

/** GET /api/tours/ — список туров (краткие карточки). */
export function fetchTours(init?: RequestInit): Promise<TourCard[]> {
  return apiFetch('/tours/', init)
}

/** GET /api/tours/:slug/ — полная информация о туре (совместимо с типом Tour). */
export function fetchTour(slug: string, init?: RequestInit): Promise<Tour> {
  return apiFetch(`/tours/${slug}/`, init)
}

/** GET /api/destinations/ — точки для карты Кыргызстана. */
export function fetchDestinations(init?: RequestInit): Promise<MapDestination[]> {
  return apiFetch('/destinations/', init)
}

export type Review = {
  id: number
  name: string
  date: string
  rating: number
  text: string
  avatar: string
  tour: string | null
}

/** GET /api/reviews/ — опубликованные отзывы. */
export function fetchReviews(init?: RequestInit): Promise<Review[]> {
  return apiFetch('/reviews/', init)
}

export type BookingPayload = {
  tour: string
  /** Дата в формате YYYY-MM-DD */
  date: string
  guests: number
  name: string
  phone: string
  email?: string
  note?: string
}

export type BookingResponse = {
  id: number
  message: string
}

/** POST /api/bookings/ — отправка заявки на бронирование. */
export function createBooking(payload: BookingPayload): Promise<BookingResponse> {
  return apiFetch('/bookings/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
