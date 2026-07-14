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

const productVideo = (file: string) => jorgoMedia('products', file)

/** Видео всех локаций из public/jorgo-video/products. */
export const JORGO_PRODUCT_VIDEOS = [
  { id: 'skazka', title: 'Каньон Сказка', src: productVideo('Сказка (4).mp4') },
  { id: 'jeti-oguz', title: 'Джети-Огуз', src: productVideo('Жети-огуз (4).mp4') },
  { id: 'karkyra', title: 'Долина Каркыра', src: productVideo('Каркыра 2 (4).mp4') },
  {
    id: 'uyulgan-tash',
    title: 'Уйулган-Таш (Каркыра)',
    src: productVideo('Уйулган таш Каркыра (4).mp4'),
  },
  {
    id: 'karakol-ski',
    title: 'Горнолыжная база «Каракол»',
    src: productVideo('Горнолыжный  Каракол (4).mp4'),
  },
  {
    id: 'karakol-mosque',
    title: 'Дунганская мечеть (Каракол)',
    src: productVideo('Каракол мечеть (4).mp4'),
  },
  {
    id: 'karakol-church',
    title: 'Свято-Троицкий собор (Каракол)',
    src: productVideo('Каракол церковь (4).mp4'),
  },
  { id: 'rukh-ordo', title: 'Рух Ордо', src: productVideo('Рух Ордо (4).mp4') },
  { id: 'hawaii', title: 'Пляж «Гавайи»', src: productVideo('Гавайи (4).mp4') },
  {
    id: 'hot-spring-1',
    title: 'Горячие источники',
    src: productVideo('Горячий источник 1 (4).mp4'),
  },
  {
    id: 'hot-spring-orukty',
    title: 'Горячий источник Орукту',
    src: productVideo('Горячий источник орукту (4).mp4'),
  },
  { id: 'hippodrome', title: 'Ипподром', src: productVideo('ипподром (4).mp4') },
  { id: 'ferris-wheel', title: 'Колесо обозрения', src: productVideo('Колесо (4).mp4') },
  { id: 'square', title: 'Центральная площадь', src: productVideo('Площадь (4).mp4') },
  { id: 'kemin-2', title: 'Кемин', src: productVideo('кемин 22mp4 (4).mp4') },
  { id: 'kemin-3', title: 'Кеминская долина', src: productVideo('кемин 3 (4).mp4') },
  { id: 'gorge-1', title: 'Горное ущелье', src: productVideo('ущелье 1 (4).mp4') },
  { id: 'gorge-2', title: 'Живописное ущелье', src: productVideo('ущелье 2 (4).mp4') },
] as const

export const JORGO_HERO_SLIDES = [
  {
    id: 'karkyra',
    image: JORGO_EASTERN.karkyra,
    video: productVideo('Каркыра 2 (4).mp4'),
    alt: 'Долина Каркыра — альпийские луга',
    title: 'Долина Каркыра',
    subtitle: 'Бескрайние альпийские луга на востоке Кыргызстана',
  },
  {
    id: 'jeti-oguz',
    image: JORGO_EASTERN.jetiOguz,
    video: productVideo('Жети-огуз (4).mp4'),
    alt: 'Скалы Джетти-Огуз у Иссык-Куля',
    title: 'Восточный тур',
    subtitle: '9 локаций за 3 дня — от Небесного моста до Каньона Сказка',
  },
  {
    id: 'skazka',
    image: JORGO_EASTERN.skazka,
    video: productVideo('Сказка (4).mp4'),
    alt: 'Каньон Сказка — жемчужина восточного берега',
    title: 'Каньон Сказка',
    subtitle: 'Марсианские пейзажи на южном берегу Иссык-Куля',
  },
  {
    id: 'karakol',
    image: JORGO_EASTERN.karakol,
    video: productVideo('Горнолыжный  Каракол (4).mp4'),
    alt: 'Горнолыжная база Каракол',
    title: 'Горнолыжный Каракол',
    subtitle: 'Снежные склоны и панорамы хребта Терскей Ала-Тоо',
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
