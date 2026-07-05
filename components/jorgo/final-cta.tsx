import { Mail, MessageCircle, Phone, Send } from 'lucide-react'

import { Reveal } from '@/components/jorgo/reveal'
import { YouTubeBackground } from '@/components/jorgo/youtube-embed'

const YOUTUBE_ID = '6v2L2UGZJAM'

const CONTACTS = [
  { icon: Phone, label: 'Позвонить', value: '+996 (999) 202 299', href: 'tel:+996999202299' },
  { icon: Send, label: 'Telegram', value: '@jorgotravel', href: 'https://t.me/jorgotravel' },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+996 (999) 202 299',
    href: 'https://wa.me/996999202299',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'jorgo.travel.kg@gmail.com',
    href: 'mailto:jorgo.travel.kg@gmail.com',
  },
]

export function FinalCta() {
  return (
    <section id="contact" className="relative min-h-[520px] overflow-hidden md:min-h-[600px]">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80"
        alt=""
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
        aria-hidden="true"
      />
      <YouTubeBackground
        videoId={YOUTUBE_ID}
        title="Горы Кыргызстана — фон секции контактов"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/75 to-primary/50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-24 text-center text-white md:px-6 md:py-32">
        <Reveal>
          <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Готовы к путешествию?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/90">
            Мы подберём для вас идеальный маршрут. Откройте Кыргызстан вместе с
            JorgoTravel — страной свободы, гор и настоящих эмоций.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACTS.map((contact) => {
              const Icon = contact.icon
              return (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:shadow-lg hover:shadow-accent/20"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-white/15 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold">{contact.label}</span>
                  <span className="text-xs text-white/75">{contact.value}</span>
                </a>
              )
            })}
          </div>

          <a
            href="tel:+996999202299"
            className="animate-shimmer animate-pulse-glow mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-9 py-4 text-base font-bold text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-[1.05]"
          >
            <Phone className="size-5" aria-hidden="true" />
            Свяжитесь с нами
          </a>
        </Reveal>
      </div>
    </section>
  )
}
