from django.urls import path
from apps.cart.views import GetItemView

urlpatterns = [
    path("cart-items", GetItemView.as_view())
]
