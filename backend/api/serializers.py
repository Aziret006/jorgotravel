from rest_framework import serializers

from .models import Booking, Destination, Review, Tour, TourDay


class TourDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourDay
        fields = ['day', 'title', 'description']


class TourListSerializer(serializers.ModelSerializer):
    """Краткая карточка тура (списки, каталог)."""

    durationDays = serializers.IntegerField(source='duration_days')
    priceNote = serializers.CharField(source='price_note')
    groupSize = serializers.CharField(source='group_size')

    class Meta:
        model = Tour
        fields = [
            'slug', 'title', 'type', 'duration', 'durationDays',
            'price', 'priceNote', 'image', 'video', 'alt',
            'difficulty', 'groupSize', 'season', 'location',
        ]


class TourDetailSerializer(TourListSerializer):
    """Полная информация о туре, совместимая с типом Tour на фронтенде."""

    itinerary = TourDaySerializer(many=True, read_only=True)
    notIncluded = serializers.JSONField(source='not_included')

    class Meta(TourListSerializer.Meta):
        fields = TourListSerializer.Meta.fields + [
            'gallery', 'description', 'highlights',
            'itinerary', 'included', 'notIncluded',
        ]


class DestinationSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='key')
    slug = serializers.SlugField(source='tour.slug', default=None, read_only=True)

    class Meta:
        model = Destination
        fields = ['id', 'name', 'slug', 'lat', 'lng', 'images', 'video', 'description']


class ReviewSerializer(serializers.ModelSerializer):
    date = serializers.CharField(source='date_label')
    tour = serializers.SlugField(source='tour.slug', default=None, read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'name', 'date', 'rating', 'text', 'avatar', 'tour']


class BookingCreateSerializer(serializers.ModelSerializer):
    tour = serializers.SlugField(source='tour_slug', write_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'tour', 'date', 'guests', 'name', 'phone', 'email', 'note', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_tour(self, value):
        if not Tour.objects.filter(slug=value, is_active=True).exists():
            raise serializers.ValidationError('Тур с таким слагом не найден.')
        return value

    def validate_guests(self, value):
        if not 1 <= value <= 20:
            raise serializers.ValidationError('Количество гостей — от 1 до 20.')
        return value

    def create(self, validated_data):
        validated_data['tour'] = Tour.objects.filter(
            slug=validated_data['tour_slug']
        ).first()
        return super().create(validated_data)
