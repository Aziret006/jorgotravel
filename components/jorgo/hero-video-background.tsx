'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

type HeroVideoBackgroundProps = {
  src: string
  poster: string
  active: boolean
  priority?: boolean
}

export function HeroVideoBackground({
  src,
  poster,
  active,
  priority = false,
}: HeroVideoBackgroundProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    if (active) {
      video.currentTime = 0
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [active])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={active}
      preload={priority ? 'auto' : 'metadata'}
      aria-hidden="true"
      className={cn(
        'absolute inset-0 size-full object-cover object-center',
        active && 'animate-ken-burns',
      )}
    />
  )
}
