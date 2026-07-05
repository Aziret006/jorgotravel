import { cn } from '@/lib/utils'

type YouTubeEmbedProps = {
  videoId: string
  title: string
  className?: string
  autoplay?: boolean
  mute?: boolean
}

export function YouTubeEmbed({
  videoId,
  title,
  className,
  autoplay = false,
  mute = false,
}: YouTubeEmbedProps) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
  })
  if (autoplay) params.set('autoplay', '1')
  if (mute) params.set('mute', '1')

  return (
    <iframe
      className={cn('size-full border-0', className)}
      src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
    />
  )
}

type YouTubeBackgroundProps = {
  videoId: string
  title: string
  className?: string
}

export function YouTubeBackground({ videoId, title, className }: YouTubeBackgroundProps) {
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: videoId,
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    disablekb: '1',
    fs: '0',
    iv_load_policy: '3',
  })

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden="true"
    >
      <iframe
        className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        tabIndex={-1}
      />
    </div>
  )
}
