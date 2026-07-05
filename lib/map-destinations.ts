export type MapDestination = {
  id: string
  name: string
  slug?: string
  lat: number
  lng: number
  images: string[]
  description: string
}

export const MAP_DESTINATIONS: MapDestination[] = [
  {
    id: 'son-kul',
    name: 'Сон-Куль',
    slug: 'son-kul',
    lat: 41.8439,
    lng: 75.1194,
    description:
      'Высокогорное озеро на 3016 м — юрты, кочевники и бескрайние альпийские луга в сердце Кыргызстана.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'tash-rabat',
    name: 'Таш-Рабат',
    lat: 40.8883,
    lng: 75.2783,
    description:
      'Древний караван-сарай на Шёлковом пути — каменная крепость в горном ущелье на высоте 3200 м.',
    images: [
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'issyk-kul',
    name: 'Иссык-Куль',
    slug: 'issyk-kul',
    lat: 42.45,
    lng: 77.25,
    description:
      'Второе по величине высокогорное озеро в мире — «кыргызское море» с пляжами и горами Тянь-Шаня.',
    images: [
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'bishkek',
    name: 'Бишкек',
    slug: 'ala-archa',
    lat: 42.8746,
    lng: 74.5698,
    description:
      'Столица Кыргызстана — отправная точка для туров в Ала-Арчу, на Иссык-Куль и по всей стране.',
    images: [
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'arslanbob',
    name: 'Арсланбоб',
    slug: 'silk-road',
    lat: 39.9436,
    lng: 71.4958,
    description:
      'Крупнейший в мире грецкий ореховый лес — водопады, тропы и колорит южного Кыргызстана.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551524164-6cf77f5f7f8b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'karakol',
    name: 'Каракол',
    lat: 42.4907,
    lng: 78.3939,
    description:
      'Город у восточного берега Иссык-Куля — русская архитектура, базар и ворота к горным маршрутам.',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    ],
  },
]

export const DEFAULT_DESTINATION_ID = 'issyk-kul'

/** Ограничение карты только Кыргызстаном */
export const KG_BOUNDS: [[number, number], [number, number]] = [
  [39.1, 69.2],
  [43.4, 80.6],
]

export const KG_CENTER: [number, number] = [41.25, 74.8]
