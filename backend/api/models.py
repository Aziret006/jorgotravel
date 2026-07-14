from django.db import models


class Tour(models.Model):
    DIFFICULTY_CHOICES = [
        ('Лёгкая', 'Лёгкая'),
        ('Средняя', 'Средняя'),
        ('Сложная', 'Сложная'),
    ]

    slug = models.SlugField(unique=True, verbose_name='Слаг')
    title = models.CharField(max_length=200, verbose_name='Название')
    type = models.CharField(max_length=100, verbose_name='Тип тура')
    duration = models.CharField(max_length=100, verbose_name='Длительность')
    duration_days = models.PositiveSmallIntegerField(verbose_name='Дней')
    price = models.CharField(max_length=100, verbose_name='Цена')
    price_note = models.CharField(max_length=200, blank=True, verbose_name='Примечание к цене')
    image = models.URLField(max_length=500, verbose_name='Обложка')
    video = models.CharField(max_length=500, blank=True, verbose_name='Видео превью')
    alt = models.CharField(max_length=300, verbose_name='Alt-текст обложки')
    gallery = models.JSONField(default=list, verbose_name='Галерея')
    description = models.TextField(verbose_name='Описание')
    highlights = models.JSONField(default=list, verbose_name='Особенности')
    included = models.JSONField(default=list, verbose_name='Включено')
    not_included = models.JSONField(default=list, verbose_name='Не включено')
    difficulty = models.CharField(
        max_length=20, choices=DIFFICULTY_CHOICES, verbose_name='Сложность'
    )
    group_size = models.CharField(max_length=50, verbose_name='Размер группы')
    season = models.CharField(max_length=100, verbose_name='Сезон')
    location = models.CharField(max_length=200, verbose_name='Локация')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    sort_order = models.PositiveSmallIntegerField(default=0, verbose_name='Порядок')

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = 'Тур'
        verbose_name_plural = 'Туры'

    def __str__(self):
        return self.title


class TourDay(models.Model):
    tour = models.ForeignKey(
        Tour, related_name='itinerary', on_delete=models.CASCADE, verbose_name='Тур'
    )
    day = models.PositiveSmallIntegerField(verbose_name='День')
    title = models.CharField(max_length=200, verbose_name='Заголовок')
    description = models.TextField(verbose_name='Описание')

    class Meta:
        ordering = ['day']
        unique_together = [('tour', 'day')]
        verbose_name = 'День маршрута'
        verbose_name_plural = 'Дни маршрута'

    def __str__(self):
        return f'{self.tour.slug} — день {self.day}'


class Destination(models.Model):
    """Точка на карте Кыргызстана."""

    key = models.SlugField(unique=True, verbose_name='Идентификатор')
    name = models.CharField(max_length=200, verbose_name='Название')
    tour = models.ForeignKey(
        Tour,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='destinations',
        verbose_name='Связанный тур',
    )
    lat = models.FloatField(verbose_name='Широта')
    lng = models.FloatField(verbose_name='Долгота')
    images = models.JSONField(default=list, verbose_name='Фото')
    video = models.CharField(max_length=500, blank=True, verbose_name='Видео')
    description = models.TextField(verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активна')
    sort_order = models.PositiveSmallIntegerField(default=0, verbose_name='Порядок')

    class Meta:
        ordering = ['sort_order', 'id']
        verbose_name = 'Направление'
        verbose_name_plural = 'Направления'

    def __str__(self):
        return self.name


class Review(models.Model):
    name = models.CharField(max_length=200, verbose_name='Имя гостя')
    date_label = models.CharField(
        max_length=100, verbose_name='Дата (текстом)', help_text='Например: «Август 2025»'
    )
    rating = models.PositiveSmallIntegerField(default=5, verbose_name='Оценка (1–5)')
    text = models.TextField(verbose_name='Текст отзыва')
    avatar = models.CharField(
        max_length=500,
        blank=True,
        default='/placeholder.svg?height=100&width=100',
        verbose_name='Аватар (URL)',
    )
    tour = models.ForeignKey(
        Tour,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='reviews',
        verbose_name='Тур',
    )
    is_published = models.BooleanField(default=True, verbose_name='Опубликован')
    sort_order = models.PositiveSmallIntegerField(default=0, verbose_name='Порядок')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создан')

    class Meta:
        ordering = ['sort_order', '-created_at']
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    def __str__(self):
        return f'{self.name} — {self.rating}/5'


class Booking(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новая'),
        ('confirmed', 'Подтверждена'),
        ('cancelled', 'Отменена'),
        ('completed', 'Завершена'),
    ]

    tour = models.ForeignKey(
        Tour,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='bookings',
        verbose_name='Тур',
    )
    tour_slug = models.CharField(max_length=100, verbose_name='Слаг тура')
    date = models.DateField(verbose_name='Дата начала')
    guests = models.PositiveSmallIntegerField(default=1, verbose_name='Гостей')
    name = models.CharField(max_length=200, verbose_name='Имя')
    phone = models.CharField(max_length=50, verbose_name='Телефон')
    email = models.EmailField(blank=True, verbose_name='Email')
    note = models.TextField(blank=True, verbose_name='Комментарий')
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='new', verbose_name='Статус'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создана')

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Заявка на бронирование'
        verbose_name_plural = 'Заявки на бронирование'

    def __str__(self):
        return f'{self.name} — {self.tour_slug} ({self.date})'
