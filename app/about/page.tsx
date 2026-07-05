import type { Metadata } from 'next'

import { AboutContent } from '@/components/jorgo/about-content'

export const metadata: Metadata = {
  title: 'О нас — JorgoTravel',
  description:
    'JorgoTravel — туристическая компания, организующая незабываемые путешествия по всему Кыргызстану. Горы Тянь-Шаня, озёра, каньоны и кочевые традиции.',
  openGraph: {
    title: 'О нас — JorgoTravel',
    description:
      'Откройте для себя настоящий Кыргызстан вместе с JorgoTravel.',
    type: 'website',
  },
}

export default function AboutPage() {
  return <AboutContent />
}
