from django.contrib import admin

from .models import Booking, Destination, Review, Tour, TourDay


class TourDayInline(admin.TabularInline):
    model = TourDay
    extra = 0


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'type', 'duration', 'price', 'difficulty', 'is_active']
    list_filter = ['type', 'difficulty', 'is_active']
    search_fields = ['title', 'slug', 'location']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [TourDayInline]


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'key', 'tour', 'lat', 'lng', 'is_active']
    list_filter = ['is_active']
    search_fields = ['name', 'key']


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['name', 'date_label', 'rating', 'tour', 'is_published', 'sort_order']
    list_filter = ['is_published', 'rating']
    list_editable = ['is_published', 'sort_order']
    search_fields = ['name', 'text']


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'tour_slug', 'date', 'guests', 'status', 'created_at']
    list_filter = ['status', 'date']
    search_fields = ['name', 'phone', 'email', 'tour_slug']
    readonly_fields = ['created_at']
