from django.utils import timezone
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Destination, Review, Tour
from .serializers import (
    BookingCreateSerializer,
    DestinationSerializer,
    ReviewSerializer,
    TourDetailSerializer,
    TourListSerializer,
)


class HealthView(APIView):
    """GET /api/health/ — проверка, что API живо."""

    def get(self, request):
        return Response({'status': 'ok', 'time': timezone.now().isoformat()})


class TourListView(generics.ListAPIView):
    """GET /api/tours/ — список активных туров."""

    queryset = Tour.objects.filter(is_active=True)
    serializer_class = TourListSerializer


class TourDetailView(generics.RetrieveAPIView):
    """GET /api/tours/<slug>/ — полная информация о туре."""

    queryset = Tour.objects.filter(is_active=True).prefetch_related('itinerary')
    serializer_class = TourDetailSerializer
    lookup_field = 'slug'


class DestinationListView(generics.ListAPIView):
    """GET /api/destinations/ — точки для карты Кыргызстана."""

    queryset = Destination.objects.filter(is_active=True).select_related('tour')
    serializer_class = DestinationSerializer


class ReviewListView(generics.ListAPIView):
    """GET /api/reviews/ — опубликованные отзывы."""

    queryset = Review.objects.filter(is_published=True).select_related('tour')
    serializer_class = ReviewSerializer


class BookingCreateView(generics.CreateAPIView):
    """POST /api/bookings/ — заявка на бронирование с формы сайта."""

    serializer_class = BookingCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save()
        return Response(
            {
                'id': booking.id,
                'message': 'Заявка принята. Мы свяжемся с вами в ближайшее время.',
            },
            status=status.HTTP_201_CREATED,
        )
