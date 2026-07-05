import {
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  WhatsappIcon,
} from '@/components/jorgo/social-icons'
import { Send } from 'lucide-react'

export const HEADER_SOCIALS = [
  { icon: WhatsappIcon, label: 'WhatsApp', href: 'https://wa.me/996999202299' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/jorgotravel' },
  { icon: InstagramIcon, label: 'Instagram', href: '#' },
  { icon: FacebookIcon, label: 'Facebook', href: '#' },
  { icon: TiktokIcon, label: 'TikTok', href: '#' },
] as const
