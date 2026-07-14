'use client'

import { Play } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

/** Первый кадр видео часто тёмный — перематываем для превью. */
const PREVIEW_TIME = 2

function seekPreview(el: HTMLVideoElement) {
  if (el.currentTime === 0 && el.paused) {
    el.currentTime = PREVIEW_TIME
  }
}

type HoverVideoProps = {
  src: string
  label: string
  className?: string
  videoClassName?: string
}

/** Видео, которое проигрывается при наведении курсора (или по тапу). */
export function HoverVideo({ src, label, className, videoClassName }: HoverVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const play = useCallback(() => {
    const el = ref.current
    if (!el) return
    void el.play().catch(() => {})
    setPlaying(true)
  }, [])

  const pause = useCallback(() => {
    ref.current?.pause()
    setPlaying(false)
  }, [])

  return (
    <span
      className={cn('relative block size-full', className)}
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <video
        ref={(el) => {
          ref.current = el
          // Метаданные могут загрузиться до гидратации — событие не сработает
          if (el && el.readyState >= 1) seekPreview(el)
        }}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        className={cn('size-full object-cover', videoClassName)}
        onClick={() => (playing ? pause() : play())}
        onLoadedMetadata={(e) => seekPreview(e.currentTarget)}
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300',
          playing && 'opacity-0',
        )}
        aria-hidden="true"
      >
        <span className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-md">
          <Play className="ml-0.5 size-5 fill-white text-white" />
        </span>
      </span>
    </span>
  )
}
