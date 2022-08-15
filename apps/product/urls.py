from apps.product.views import ProductDetailView, ListProductView, ListBySearchView, ListRelatedView, ListSearchView
from django.urls import path
app_name = "product"
urlpatterns = [
    path("product/<productId>", ProductDetailView.as_view()),
    path("get_products", ListProductView.as_view()),
    path("search", ListSearchView.as_view()),
    path("related/<productId>", ListRelatedView.as_view()),
    path("by/search", ListBySearchView.as_view())
]
