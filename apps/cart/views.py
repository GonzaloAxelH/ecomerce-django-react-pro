from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.cart.models import Cart, CartItem


from apps.product.models import Product
from apps.product.serializers import ProductSerializer

# return Response({"key":"value"},status=status.HTTP_100_CONTINUE)


class GetItemView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.order_by("product").filter(cart=cart)
            result = []

            for cart_item in cart_items:
                item = {}
                item["id"] = cart_item.id
                item["count"] = cart_item.count
                product = Product.objects.get(id=cart_item.product.id)
                product = ProductSerializer(product)
                item["product"] = product.data
                result.append(item)

            return Response({"cart": result}, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Shomthing went wrong when retriving cart items"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AddItemView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        try:
            product_id = int(data["prodcut_id"])
        except:
            return "error"
        count = 1

        try:
            if not Product.objects.filter(id=product_id).exists():
                return "error"
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)
            if CartItem.objects.filter(cart=cart, product=product).exists():
                return "error no existe en el carrito"

            if int(product.quantity) > 0:
                CartItem.objects.create(
                    product=product, cart=cart, count=count)
                if CartItem.objects.filter(cart=cart, product=product).exists():
                    total_items = int(cart.total_items) + 1
                    Cart.objects.filter(user=user).update(
                        total_items=total_items)

                    cart_items = CartItem.objects.order_by(
                        "product").filter(cart=cart)
                    result = []

                    for cart_item in cart_items:
                        item = {}
                        item["id"] = cart_item.id
                        item["count"] = cart_item.count
                        product = Product.objects.get(id=cart_item.product.id)
                        product = ProductSerializer(product)
                        item["product"] = product.data
                        result.append(item)

                    return Response({"cart": result}, status=status.HTTP_201_CREATED)
                else:
                    return "error producto agotado"
            else:
                return "error producto agotado"
        except:
            return "error 500"


class GetTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            cart_items = CartItem.objects.filter(cart=cart)
            total_cost = 0.0
            total_cost_compare = 0.0

            if cart_items.exists():
                for cart_item in cart_items:
                    total_cost += float(cart_item.product.price) * \
                        float(cart_item.count)
                    total_cost_compare += float(cart_item.product.compare_price) * \
                        float(cart_item.count)
                total_cost = round(total_cost, 2)
                total_cost_compare = round(total_cost_compare, 2)
            return Response({"total_cost": total_cost, "total_cost_compare": total_cost_compare}, status=status.HTTP_200_OK)
        except:
            return "error 500"


class GetItemTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            cart = Cart.objects.get(user=user)
            total_items = cart.total_items
            return Response({"total_items": total_items, }, status=status.HTTP_200_OK)
        except:
            return "error"


class UpdateItemView(APIView):
    def put(self, request, format=None):
        user = self.request.user
        data = self.request.data
        try:
            product_id = int(data["prodcut_id"])
        except:
            return "error"

        try:
            count = int(data["count"])
        except:
            return "error"

        try:
            if not Product.objects.filter(id=product_id).exists():
                return "error"
            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)
            if CartItem.objects.filter(cart=cart, product=product).exists():
                return "El prodcto no esta en elcarrito"
            quantity = product.quantity
            if count <= quantity:
                cart_items = CartItem.objects.filter(
                    product=product, cart=cart).update(count=count)
                result = []

                for cart_item in cart_items:
                    item = {}
                    item["id"] = cart_item.id
                    item["count"] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)
                    item["product"] = product.data
                    result.append(item)

                return Response({"cart": result}, status=status.HTTP_200_OK)

        except:
            return "error"


class RemoveItemView(APIView):

    def delete(self, request, format=None):
        user = self.request.user
        data = self.request.data
        try:
            product_id = int(data["prodcut_id"])
        except:
            return "error"

        try:
            if not Product.objects.filter(id=product_id).exists():
                return "error producto no existe"

            product = Product.objects.get(id=product_id)
            cart = Cart.objects.get(user=user)
            if CartItem.objects.filter(cart=cart, product=product).exists():
                return "El prodcto no esta en elcarrito"

            CartItem.objects.filter(cart=cart, product=product).delete()
            if not CartItem.objects.filter(cart=cart, product=product).exists():
                total_items = int(cart.total_items) - 1
                Cart.objects.filter(user=user).update(total_items=total_items)
            cart_items = CartItem.objects.order_by(
                "product").filter(cart=cart)
            result = []
            if CartItem.objects.filter(cart=cart).exists():
                for cart_item in cart_items:
                    item = {}
                    item["id"] = cart_item.id
                    item["count"] = cart_item.count
                    product = Product.objects.get(id=cart_item.product.id)
                    product = ProductSerializer(product)
                    item["product"] = product.data
                    result.append(item)

            return Response({"cart": result}, status=status.HTTP_200_OK)
        except:
            return "error"
