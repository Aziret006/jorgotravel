export type Locale = 'ru' | 'en' | 'fr' | 'de' | 'it' | 'ky' | 'pt' | 'es'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ky', label: 'Кыргызча' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'es', label: 'Español' },
]

export type TranslationKeys = {
  nav: {
    about: string
    tours: string
    booking: string
    reviews: string
    contact: string
  }
  lang: string
  about: {
    metaTitle: string
    metaDescription: string
    heroEyebrow: string
    heroTitle: string
    heroSubtitle: string
    introTitle: string
    introP1: string
    introP2: string
    contactCta: string
    formatsTitle: string
    formats: string[]
    transportTitle: string
    minivanTitle: string
    minivanFeatures: string[]
    sprinterTitle: string
    sprinterFeatures: string[]
    whyTitle: string
    whyItems: string[]
    ctaTitle: string
    ctaSubtitle: string
    ctaButton: string
  }
}

const ru: TranslationKeys = {
  nav: {
    about: 'О нас',
    tours: 'Туры',
    booking: 'Бронирование',
    reviews: 'Отзывы',
    contact: 'Контакты',
  },
  lang: 'Язык',
  about: {
    metaTitle: 'О нас — JorgoTravel',
    metaDescription:
      'JorgoTravel — туристическая компания, организующая незабываемые путешествия по всему Кыргызстану.',
    heroEyebrow: 'Путешествия по Кыргызстану',
    heroTitle: 'Откройте для себя настоящий Кыргызстан',
    heroSubtitle:
      'Мы подберём для вас идеальный маршрут. Откройте Кыргызстан вместе с JorgoTravel — страной свободы, гор и настоящих эмоций.',
    introTitle: 'Кто мы',
    introP1:
      'JorgoTravel — туристическая компания, организующая незабываемые путешествия по всему Кыргызстану. Мы помогаем увидеть страну во всей её красоте: величественные горы Тянь-Шаня, прозрачные озёра, широкие долины, каньоны и аутентичные кочевые традиции.',
    introP2:
      'Мы работаем как с индивидуальными туристами, так и с группами, подбирая маршруты под ваши интересы, уровень комфорта и время путешествия.',
    contactCta: 'Свяжитесь с нами',
    formatsTitle: 'Мы предлагаем разнообразные форматы путешествий',
    formats: [
      'Горные и треккинг-туры',
      'Туры к озёрам (Иссык-Куль, Сон-Куль, Кёль-Суу и др.)',
      'Джип-туры и экспедиции',
      'Конные туры',
      'Культурно-исторические маршруты',
      'Индивидуальные авторские туры',
    ],
    transportTitle: 'Наш транспорт',
    minivanTitle: 'Минивэн и джип',
    minivanFeatures: [
      'Подходит для небольших групп',
      'Комфортен для экстремальных поездок и коротких туров',
      'Кондиционер, удобные сиденья',
      'Идеален для семей и компаний до 6–7 человек',
    ],
    sprinterTitle: 'Спринтер',
    sprinterFeatures: [
      'Отличный вариант для средних и больших групп',
      'Просторный салон и место для багажа',
      'Подходит для длительных поездок и горных маршрутов',
      'Вместимость до 15–18 человек',
    ],
    whyTitle: 'Почему выбирают нас',
    whyItems: [
      'Путешествия по всей территории Кыргызстана',
      'Опытные гиды и водители',
      'Индивидуальный подход к каждому клиенту',
      'Комфорт и безопасность на всех этапах тура',
      'Честные цены без скрытых платежей',
    ],
    ctaTitle: 'Готовы к путешествию?',
    ctaSubtitle:
      'Свяжитесь с нами — подберём маршрут, ответим на вопросы и поможем спланировать незабываемую поездку.',
    ctaButton: 'Связаться с нами',
  },
}

const en: TranslationKeys = {
  nav: {
    about: 'About Us',
    tours: 'Tours',
    booking: 'Booking',
    reviews: 'Reviews',
    contact: 'Contacts',
  },
  lang: 'Language',
  about: {
    metaTitle: 'About Us — JorgoTravel',
    metaDescription:
      'JorgoTravel is a tour company organizing unforgettable journeys across Kyrgyzstan.',
    heroEyebrow: 'Travel in Kyrgyzstan',
    heroTitle: 'Discover the real Kyrgyzstan',
    heroSubtitle:
      'We will find the perfect route for you. Discover Kyrgyzstan with JorgoTravel — a land of freedom, mountains and genuine emotions.',
    introTitle: 'Who we are',
    introP1:
      'JorgoTravel is a tour company organizing unforgettable journeys across Kyrgyzstan. We help you see the country in all its beauty: majestic Tian Shan mountains, crystal-clear lakes, wide valleys, canyons and authentic nomadic traditions.',
    introP2:
      'We work with individual travelers and groups, tailoring routes to your interests, comfort level and travel time.',
    contactCta: 'Contact us',
    formatsTitle: 'We offer a variety of travel formats',
    formats: [
      'Mountain and trekking tours',
      'Lake tours (Issyk-Kul, Son-Kul, Kel-Suu, etc.)',
      'Jeep tours and expeditions',
      'Horse riding tours',
      'Cultural and historical routes',
      'Individual custom tours',
    ],
    transportTitle: 'Our transport',
    minivanTitle: 'Minivan & Jeep',
    minivanFeatures: [
      'Suitable for small groups',
      'Comfortable for off-road and short tours',
      'Air conditioning, comfortable seats',
      'Ideal for families and groups up to 6–7 people',
    ],
    sprinterTitle: 'Sprinter',
    sprinterFeatures: [
      'Great for medium and large groups',
      'Spacious cabin and luggage space',
      'Suitable for long trips and mountain routes',
      'Capacity up to 15–18 people',
    ],
    whyTitle: 'Why choose us',
    whyItems: [
      'Travel across all of Kyrgyzstan',
      'Experienced guides and drivers',
      'Individual approach to every client',
      'Comfort and safety at every stage',
      'Honest prices with no hidden fees',
    ],
    ctaTitle: 'Ready to travel?',
    ctaSubtitle:
      'Contact us — we will plan your route, answer questions and help organize an unforgettable trip.',
    ctaButton: 'Get in touch',
  },
}

export const translations: Record<Locale, TranslationKeys> = {
  ru,
  en,
  fr: {
    ...en,
    nav: { about: 'À propos', tours: 'Tours', booking: 'Réservation', reviews: 'Avis', contact: 'Contacts' },
    lang: 'Langue',
    about: {
      ...en.about,
      metaTitle: 'À propos — JorgoTravel',
      heroTitle: 'Découvrez le vrai Kirghizistan',
      formatsTitle: 'Nous proposons divers formats de voyage',
    },
  },
  de: {
    ...en,
    nav: { about: 'Über uns', tours: 'Touren', booking: 'Buchung', reviews: 'Bewertungen', contact: 'Kontakt' },
    lang: 'Sprache',
    about: { ...en.about, metaTitle: 'Über uns — JorgoTravel', heroTitle: 'Entdecken Sie das echte Kirgisistan' },
  },
  it: {
    ...en,
    nav: { about: 'Chi siamo', tours: 'Tour', booking: 'Prenotazione', reviews: 'Recensioni', contact: 'Contatti' },
    lang: 'Lingua',
    about: { ...en.about, metaTitle: 'Chi siamo — JorgoTravel', heroTitle: 'Scopri il vero Kirghizistan' },
  },
  ky: {
    ...ru,
    nav: { about: 'Биз жөнүндө', tours: 'Турлар', booking: 'Брондоо', reviews: 'Пикирлер', contact: 'Байланыш' },
    lang: 'Тил',
  },
  pt: {
    ...en,
    nav: { about: 'Sobre nós', tours: 'Tours', booking: 'Reserva', reviews: 'Avaliações', contact: 'Contatos' },
    lang: 'Idioma',
    about: { ...en.about, metaTitle: 'Sobre nós — JorgoTravel', heroTitle: 'Descubra o verdadeiro Quirguistão' },
  },
  es: {
    ...en,
    nav: { about: 'Sobre nosotros', tours: 'Tours', booking: 'Reserva', reviews: 'Reseñas', contact: 'Contactos' },
    lang: 'Idioma',
    about: { ...en.about, metaTitle: 'Sobre nosotros — JorgoTravel', heroTitle: 'Descubre la auténtica Kirguistán' },
  },
}

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations.ru
}

export const DEFAULT_LOCALE: Locale = 'ru'
