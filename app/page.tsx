import { FinalCta } from '@/components/jorgo/final-cta'
import { Hero } from '@/components/jorgo/hero'
import { HowWeWork } from '@/components/jorgo/how-we-work'
import { PopularTours } from '@/components/jorgo/popular-tours'
import { Reviews } from '@/components/jorgo/reviews'
import { SiteFooter } from '@/components/jorgo/site-footer'
import { SiteHeader } from '@/components/jorgo/site-header'
import { SpecialOffer } from '@/components/jorgo/special-offer'
import { TourFormats } from '@/components/jorgo/tour-formats'
import { TourMap } from '@/components/jorgo/tour-map'
import { VideoGallery } from '@/components/jorgo/video-gallery'
import { WhyChooseUs } from '@/components/jorgo/why-choose-us'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <TourFormats />
        <WhyChooseUs />
        <PopularTours />
        <TourMap />
        <VideoGallery />
        <Reviews />
        <HowWeWork />
        <SpecialOffer />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  )
}
