from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem

from apps.orders.models import Order, OrderItem
from apps.product.models import Product
from apps.shipping.models import Shipping
from django.core.mail import send_mail
import braintree

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        environment=settings.BT_ENVIRONMENT,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY
    )
)


class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            token = gateway.client_token.generate()
            return Response(
                {'braintree_token': token},
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {'error': 'Something went wrong when retrieving braintree token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        impuesto = 0.18
        shipping_id = request.query_params.get("shipping_id")
        shipping_id = str(shipping_id)

        try:
            cart = Cart.objects.get(user=user)
            if not CartItem.objects.filter(cart=cart).exists():
                return Response({"error", "Need to have items in cart"}, status=status.HTTP_400_BAD_REQUEST)
            cart_items = CartItem.objects.filter(cart=cart)
            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response({"error": "A product with ID provider does no exist"}, status=status.HTTP_400_BAD_REQUEST)
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response({
                        "error": "Not enough items in stock"
                    }, status=status.HTTP_200_OK)
            total_amount = 0.0
            total_compare_amount = 0.0
            for cart_item in cart_items:
                total_amount += total_amount(float(cart_items.product.price)
                                             * float(cart_item.count))
                total_compare_amount += (float(cart_items.product.compare_price)
                                         * float(cart_item.count))
            original_price = round(total_amount, 2)
            total_compare_amount = round(total_compare_amount, 2)
            # Cupones
            # =============

            # calcular inpuesto
            estimated_imuesto = round(total_amount * impuesto, 2)
            total_amount += (total_amount * impuesto)

            # calcular el costo de envio
            shipping_cost = 0.0
            if Shipping.objects.filter(id__iexact=shipping_id).exists():
                shipping = Shipping.objects.get(id=shipping_id)
                shipping_cost = shipping.price
                total_amount += float(shipping_cost)
            total_amount = round(total_amount, 2)

            return Response({
                "original_price": f'{original_price:.2f}',
                "total_amount": f'{total_amount:.2f}',
                "total_compare_amount": f'{estimated_imuesto:.2f}',
                "shipping_cost": f'{shipping_cost:.2f}'
            }, status=status.HTTP_200_OK)

        except:
            return Response(
                {'error': 'Something went wrong when retrieving payment total information'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data

        impuesto = 0.18
        nonce = data["nonce"]

        # CUPON
        # =======

        nonce = data['nonce']
        shipping_id = str(data['shipping_id'])

        full_name = data['full_name']
        address_line_1 = data['address_line_1']
        address_line_2 = data['address_line_2']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_zip_code = data['postal_zip_code']
        country_region = data['country_region']
        telephone_number = data['telephone_number']

        if not Shipping.objects.filter(id__iexact=shipping_id).exists():
            return Response({"error": "Invalid shipping option"}, status=status.HTTP_404_NOT_FOUND)
        cart = Cart.objects.get(user=user)

        if not CartItem.objects.filter(cart=cart).exists():
            return Response({"error", "Need to have items in cart"}, status=status.HTTP_400_BAD_REQUEST)
        cart_items = CartItem.objects.filter(cart=cart)

        for cart_item in cart_items:
            if not Product.objects.filter(id=cart_item.product.id).exists():
                return Response({"error": "A product with ID provider does no exist"}, status=status.HTTP_400_BAD_REQUEST)
            if int(cart_item.count) > int(cart_item.product.quantity):
                return Response({
                    "error": "Not enough items in stock"
                }, status=status.HTTP_200_OK)

        total_amount = 0.0

        for cart_item in cart_items:
            total_amount += total_amount(float(cart_items.product.price)
                                         * float(cart_item.count))
        # Cupones
        # ==========

        # impuesto

        total_amount += (total_amount * impuesto)

        # calcular el pag de envio
        shipping = Shipping.objects.get(id=int(shipping_id))
        shipping_name = shipping.name
        shipping_time = shipping.time_to_delivery
        shipping_price = shipping.price

        total_amount += float(shipping_price)
        total_amount = round(total_amount, 2)

        # Crear transaccion
        try:

            newTransaction = gateway.transaction({
                "amount": str(total_amount),
                "payment_method_nonce": str(nonce["nonce"]),
                "options": {
                    "submit_for_settlement": True
                }
            })

        except:
            return Response({
                "error": "Error processing the transaction"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if newTransaction.is_success or newTransaction.transaction:
            for cart_item in cart_items:
                update_product = Product.objects.get(id=cart_item.product.id)
                new_quantity = int(update_product.quantity) - \
                    int(cart_item.count)
                new_sold = int(update_product.sold) + int(cart_item.count)
                Product.objects.filter(id=cart_item.product.id).update(
                    quantity=new_quantity, sold=new_sold)
            # crear Order
            try:
                order = Order.objects.create(
                    user=user,
                    transaction_id=newTransaction.transaction.id,
                    amount=total_amount,
                    full_name=full_name,
                    address_line_1=address_line_1,
                    address_line_2=address_line_2,
                    city=city,
                    state_province_region=state_province_region,
                    postal_zip_code=postal_zip_code,
                    country_region=country_region,
                    telephone_number=telephone_number,
                    shipping_name=shipping_name,
                    shipping_time=shipping_time,
                    shipping_price=float(shipping_price)
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded but failed to create the order'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            for cart_item in cart_items:
                try:
                    # agarrar el producto
                    product = Product.objects.get(id=cart_item.product.id)

                    OrderItem.objects.create(
                        product=product,
                        order=order,
                        name=product.name,
                        price=cart_item.product.price,
                        count=cart_item.count
                    )
                except:
                    return Response(
                        {'error': 'Transaction succeeded and order created, but failed to create an order item'},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

            try:
                send_mail(
                    'Your Order Details',
                    'Hey ' + full_name + ','
                    + '\n\nWe recieved your order!'
                    + '\n\nGive us some time to process your order and ship it out to you.'
                    + '\n\nYou can go on your user dashboard to check the status of your order.'
                    + '\n\nSincerely,'
                    + '\nShop Time',
                    'mail@ninerogues.com',
                    [user.email],
                    fail_silently=False
                )
            except:
                return Response(
                    {'error': 'Transaction succeeded and order created, but failed to send email'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            try:
                # Vaciar carrito de compras
                CartItem.objects.filter(cart=cart).delete()

                # Actualizar carrito
                Cart.objects.filter(user=user).update(total_items=0)
            except:
                return Response(
                    {'error': 'Transaction succeeded and order successful, but failed to clear cart'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            return Response(
                {'success': 'Transaction successful and order was created'},
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                {'error': 'Transaction failed'},
                status=status.HTTP_400_BAD_REQUEST
            )
