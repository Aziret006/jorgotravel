import type { Metadata } from 'next'
import { Suspense } from 'react'

import { BookingContent } from '@/components/jorgo/booking-content'

export const metadata: Metadata = {
  title: 'Онлайн-бронирование — JorgoTravel',
  description:
    'Забронируйте тур по Кыргызстану онлайн: выберите маршрут, дату в календаре и оставьте заявку.',
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center pt-20 text-muted-foreground">
          Загрузка...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  )
}
