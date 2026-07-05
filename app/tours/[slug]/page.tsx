import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { TourDetail } from '@/components/jorgo/tour-detail'
import { getTourBySlug, TOURS } from '@/lib/tours'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return TOURS.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tour = getTourBySlug(slug)

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
  const tour = getTourBySlug(slug)

  if (!tour) {
    notFound()
  }

  return <TourDetail tour={tour} />
}
