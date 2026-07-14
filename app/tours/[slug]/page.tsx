import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TourDetail } from '@/components/jorgo/tour-detail'
import { fetchTour } from '@/lib/api'
import { getTourBySlug, TOURS, type Tour } from '@/lib/tours'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return TOURS.map((tour) => ({ slug: tour.slug }))
}

// Туры, добавленные через админку, тоже должны открываться
export const dynamicParams = true

/** Тур из API; если бэкенд недоступен — статичные данные. */
async function getTour(slug: string): Promise<Tour | undefined> {
  try {
    return await fetchTour(slug, { next: { revalidate: 60 } } as RequestInit)
  } catch {
    return getTourBySlug(slug)
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = await getTour(slug)

  if (!tour) {
    return { title: 'Тур не найден — JorgoTravel' }
  }

  return {
    title: `${tour.title} — JorgoTravel`,
    description: tour.description,
    openGraph: {
      title: `${tour.title} — JorgoTravel`,
      description: tour.description,
      images: [{ url: tour.image }],
    },
  }
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params
  const tour = await getTour(slug)

  if (!tour) {
    notFound()
  }

  return <TourDetail tour={tour} />
}
