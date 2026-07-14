# JorgoTravel Backend (Django + DRF)

REST API для лендинга JorgoTravel: туры, направления на карте и заявки на бронирование.

## Стек

- Django 6 + Django REST Framework
- SQLite по умолчанию (PostgreSQL — через переменные окружения)
- django-cors-headers для запросов с фронтенда
- gunicorn для production

## Эндпоинты

| Метод | URL | Описание |
|---|---|---|
| GET | `/api/health/` | Проверка работоспособности |
| GET | `/api/tours/` | Список туров (краткие карточки) |
| GET | `/api/tours/<slug>/` | Полная информация о туре с маршрутом по дням |
| GET | `/api/destinations/` | Точки для карты Кыргызстана |
| GET | `/api/reviews/` | Опубликованные отзывы |
| POST | `/api/bookings/` | Заявка на бронирование |
| — | `/admin/` | Django-админка (туры, направления, отзывы, заявки) |

## Наполнение данных

Всё содержимое сайта редактируется в админке `/admin/`:

- **Туры** — название, цена, описание, фото, маршрут по дням, «включено / не включено»
- **Направления** — точки на карте (координаты, фото, видео, привязка к туру)
- **Отзывы** — имя, оценка, текст, аватар; флаг «Опубликован» скрывает отзыв с сайта
- **Заявки на бронирование** — приходят с формы сайта, можно менять статус

Первичное наполнение данными с сайта: `manage.py seed_data` (повторный запуск обновляет записи).

Пример заявки на бронирование:

```json
POST /api/bookings/
{
  "tour": "son-kul",
  "date": "2026-08-01",
  "guests": 2,
  "name": "Иван",
  "phone": "+996 700 000 000",
  "email": "ivan@example.com",
  "note": "Комментарий"
}
```

## Локальный запуск (Windows)

```bash
cd backend
py -m venv .venv
.venv/Scripts/pip install -r requirements.txt
.venv/Scripts/python manage.py migrate
.venv/Scripts/python manage.py seed_data        # наполнить базу турами с сайта
.venv/Scripts/python manage.py createsuperuser  # для доступа в /admin/
.venv/Scripts/python manage.py runserver 8000
```

API будет доступно на `http://127.0.0.1:8000/api/`.
Фронтенд подхватит его через `NEXT_PUBLIC_API_URL` в `.env.local`.

## Деплой на сервер 165.245.220.106 (Linux)

```bash
cd backend
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

export DJANGO_DEBUG=0
export DJANGO_SECRET_KEY="сгенерируйте-длинный-случайный-ключ"
export DJANGO_ALLOWED_HOSTS="165.245.220.106"

.venv/bin/python manage.py migrate
.venv/bin/python manage.py seed_data
.venv/bin/python manage.py collectstatic --noinput

.venv/bin/gunicorn config.wsgi:application --bind 127.0.0.1:8001 --workers 3
```

Пример конфига nginx (проксирует `/api/` и `/admin/` на gunicorn, остальное — на Next.js):

```nginx
server {
    listen 80;
    server_name 165.245.220.106;

    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /admin/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
    }

    location /django-static/ {
        alias /path/to/backend/staticfiles/;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;  # Next.js
        proxy_set_header Host $host;
    }
}
```

## Переменные окружения

| Переменная | По умолчанию | Описание |
|---|---|---|
| `DJANGO_DEBUG` | `1` | На production поставить `0` |
| `DJANGO_SECRET_KEY` | dev-ключ | Обязательно заменить на production |
| `DJANGO_ALLOWED_HOSTS` | `165.245.220.106,localhost,127.0.0.1` | Через запятую |
| `CORS_ALLOWED_ORIGINS` | localhost:3000 + 165.245.220.106 | Origins фронтенда |
| `POSTGRES_DB` и др. | — | Если заданы, используется PostgreSQL вместо SQLite |
