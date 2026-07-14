import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
} from '@/components/jorgo/social-icons'
import { Send } from 'lucide-react'

/** Social URLs from https://jorgotravel.com/ */
export const SOCIAL_URLS = {
  whatsapp: 'https://wa.me/996999202299',
  telegram: 'https://t.me/jorgo_travel',
  instagram: 'https://www.instagram.com/jorgo.travel/',
  facebook: 'https://www.facebook.com/people/JorgoTravel/61582684590073/',
  tiktok: 'https://www.tiktok.com/@jorgo.travel',
  vk: 'https://vk.ru/club233557389',
} as const

export const HEADER_SOCIALS = [
  { icon: WhatsappIcon, label: 'WhatsApp', href: SOCIAL_URLS.whatsapp },
  { icon: Send, label: 'Telegram', href: SOCIAL_URLS.telegram },
  { icon: InstagramIcon, label: 'Instagram', href: SOCIAL_URLS.instagram },
  { icon: FacebookIcon, label: 'Facebook', href: SOCIAL_URLS.facebook },
  { icon: TiktokIcon, label: 'TikTok', href: SOCIAL_URLS.tiktok },
] as const

export const FOOTER_SOCIALS = [
  { icon: InstagramIcon, label: 'Instagram', href: SOCIAL_URLS.instagram },
  { icon: TiktokIcon, label: 'TikTok', href: SOCIAL_URLS.tiktok },
  { icon: WhatsappIcon, label: 'WhatsApp', href: SOCIAL_URLS.whatsapp },
  { icon: FacebookIcon, label: 'Facebook', href: SOCIAL_URLS.facebook },
  { icon: Send, label: 'Telegram', href: SOCIAL_URLS.telegram },
] as const
