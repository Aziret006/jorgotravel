from django.urls import path

from . import views

urlpatterns = [
    path('health/', views.HealthView.as_view(), name='health'),
    path('tours/', views.TourListView.as_view(), name='tour-list'),
    path('tours/<slug:slug>/', views.TourDetailView.as_view(), name='tour-detail'),
    path('destinations/', views.DestinationListView.as_view(), name='destination-list'),
    path('reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('bookings/', views.BookingCreateView.as_view(), name='booking-create'),
]
