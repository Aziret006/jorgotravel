const EASTERN_TOUR = 'Восточный тур (9локаций 3д-2н)'

/** Публичный URL для файлов из public/jorgo-video (кириллица и пробелы). */
export function jorgoMedia(...parts: string[]) {
  return `/jorgo-video/${parts.map((part) => encodeURIComponent(part)).join('/')}`
}

const m = (...path: string[]) => jorgoMedia(EASTERN_TOUR, ...path)

export const JORGO_EASTERN = {
  nebesnyMost: m('1 день', '2.Небесный мост 10.00', 'ккккк.jpeg'),
  burana: m('1 день', '3.Башня Бурана 12.00', 'WhatsApp Image 2026-06-24 at 17.58.441.jpeg'),
  burana2: m('1 день', '3.Башня Бурана 12.00', 'WhatsApp Image 2026-06-24 at 17.58.452.jpeg'),
  kattama: m('1 день', '4.Каттама с каймаком.чай из самовара 13.00', 'WhatsApp Image 2026-06-24 at 17.58.46.jpeg'),
  semenovka: m('2 день', '3.Семеновское+григорьевское ущ. 12.30', 'WhatsApp Image 2026-06-24 at 17.58.471.jpeg'),
  semenovka2: m('2 день', '3.Семеновское+григорьевское ущ. 12.30', 'WhatsApp Image 2026-06-24 at 17.58.473.jpeg'),
  karkyra: m('2 день', '5.Каркыра 17.00', 'WhatsApp Image 2026-06-24 at 17.58.49.jpeg'),
  karkyra2: m('2 день', '5.Каркыра 17.00', 'WhatsApp Image 2026-06-24 at 17.58.48.jpeg'),
  karakol: m('3 день', '1.Панорама Каракола 10.00', 'йаукпкерен.jpeg'),
  karakol2: m('3 день', '1.Панорама Каракола 10.00', 'уркеркнроеонг.jpeg'),
  jetiOguz: m('3 день', '2.Джетти Огуз 12.00', 'WhatsApp Image 2026-06-24 at 17.58.53.jpeg'),
  jetiOguz2: m('3 день', '2.Джетти Огуз 12.00', 'WhatsApp Image 2026-06-24 at 17.58.53111.jpeg'),
  skazka: m('3 день', '3.Каньон Сказка 15.00', '55енркр.jpeg'),
  skazka2: m('3 день', '3.Каньон Сказка 15.00', 'екрнкоеноен.jpeg'),
} as const

export const JORGO_GALLERY = [
  { image: JORGO_EASTERN.nebesnyMost, caption: 'Небесный мост' },
  { image: JORGO_EASTERN.burana, caption: 'Башня Бурана' },
  { image: JORGO_EASTERN.kattama, caption: 'Каттама и чай из самовара' },
  { image: JORGO_EASTERN.semenovka, caption: 'Семёновское ущелье' },
  { image: JORGO_EASTERN.karkyra, caption: 'Каркыра' },
  { image: JORGO_EASTERN.karakol, caption: 'Панорама Каракола' },
  { image: JORGO_EASTERN.jetiOguz, caption: 'Джетти-Огуз' },
  { image: JORGO_EASTERN.skazka, caption: 'Каньон Сказка' },
]

export const JORGO_HERO_SLIDES = [
  {
    id: 'bridge',
    image: JORGO_EASTERN.nebesnyMost,
    alt: 'Небесный мост — Восточный тур JorgoTravel',
    title: 'Восточный тур',
    subtitle: '9 локаций за 3 дня — от Небесного моста до Каньона Сказка',
  },
  {
    id: 'burana',
    image: JORGO_EASTERN.burana,
    alt: 'Башня Бурана — исторический маршрут',
    title: 'История и культура',
    subtitle: 'Башня Бурана, национальная кухня и живые традиции',
  },
  {
    id: 'jeti-oguz',
    image: JORGO_EASTERN.jetiOguz,
    alt: 'Скалы Джетти-Огуз у Иссык-Куля',
    title: 'Иссык-Куль и восток',
    subtitle: 'Джетти-Огуз, Каркыра и панорамы Каракола',
  },
  {
    id: 'skazka',
    image: JORGO_EASTERN.skazka,
    alt: 'Каньон Сказка — жемчужина восточного берега',
    title: 'Наши приключения',
    subtitle: 'Реальные моменты из туров JorgoTravel по Кыргызстану',
  },
]

export const JORGO_TOUR_GALLERY = [
  JORGO_EASTERN.nebesnyMost,
  JORGO_EASTERN.burana,
  JORGO_EASTERN.burana2,
  JORGO_EASTERN.kattama,
  JORGO_EASTERN.semenovka,
  JORGO_EASTERN.semenovka2,
  JORGO_EASTERN.karkyra,
  JORGO_EASTERN.karkyra2,
  JORGO_EASTERN.karakol,
  JORGO_EASTERN.karakol2,
  JORGO_EASTERN.jetiOguz,
  JORGO_EASTERN.jetiOguz2,
  JORGO_EASTERN.skazka,
  JORGO_EASTERN.skazka2,
]
