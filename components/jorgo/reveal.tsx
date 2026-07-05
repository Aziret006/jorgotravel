'use client'

import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  /** direction of entrance animation */
  direction?: 'up' | 'left' | 'right'
  /** delay in ms, applied via inline transition-delay */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as any

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'reveal',
        direction === 'left' && 'reveal-left',
        direction === 'right' && 'reveal-right',
        visible && 'is-visible',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
