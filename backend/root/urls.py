"""
URL configuration for root project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')

    WE MOSTYL USE CLASS-BASED VIEWS
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from __future__ import annotations

from rest_framework import routers

from django.conf import settings
from django.urls import path, include
from django.contrib import admin
from django.conf.urls.static import static

from brytisen import views

router = routers.DefaultRouter()
router.register(r'activities', views.ActivityView, 'activities')
router.register(r'reported-activities', views.ReportedActivityViewSet, 'reported activities')
router.register(r'reviews', views.ReviewView, 'reviews')
router.register(r'reported-reviews', views.ReportedReviewsViewSet, 'reported reviews')
router.register(r'favorited-activities', views.FavoritedActivityViewSet, 'favorited activities')

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('api/', include(router.urls)),
                  path('rest_framework/', include('rest_framework.urls')),
                  path('csrf/', views.CsrfView.as_view(), name='csrf'),
                  path('register/', views.RegisterView.as_view(), name='register'),
                  path('login/', views.LoginView.as_view(), name='log-in'),
                  path('logout/', views.LogoutView.as_view(), name='log-out'),
                  path('user/', views.UserView.as_view(), name='user'),
                  path('users/', views.AllUsersView.as_view(), name='users'),
                  path('', include(router.urls)),
                  #path('activities/<int:pk>/reviews/', views.RegisterView.as_view(), name='activity-reviews'),
                  # path('users/<str:activity_owner>/activities/', views.ActivityView.as_view({'get': 'list'}), name='user-activities'),
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
