import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";

import DropIn from "braintree-web-drop-in-react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { ReducersStateType } from "../../redux/reducers";
import { get_shipping_options } from "../../redux/actions/shipping";
import { refresh } from "../../redux/actions/auth";
import {
  get_payment_total,
  get_client_token,
  process_payment,
} from "../../redux/actions/payment";
import { CheckIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { ItemCart } from "../../redux/reducers/cartReducer";
import { ShippingType } from "../../redux/reducers/reducerShipping";
import { countries } from "../../helpers/fixCountries";
import ShippingForm from "../../components/checkout/ShippingForm";

interface Props {
  isAuthenticated?: boolean;
  items?: any;
  total_items?: number;
  get_shipping_options?: Function;
  shipping_inputs?: any[] | null;
  refresh?: Function;
  get_client_token?: Function;
  get_payment_total?: Function;
  process_payment?: Function;
  user?: any;
  client_token?: string | null;
  made_payment?: any;
  loading?: boolean;
  original_price?: number;
  total_amount?: number;
  total_compare_amount?: number;
  estimated_tax?: number;
  shipping_cost?: number;
}

const Checkout: FC<Props> = ({
  isAuthenticated,
  items,
  get_shipping_options,
  shipping_inputs,
  total_items,
  refresh,
  get_client_token,
  get_payment_total,
  process_payment,
  user,
  client_token,
  made_payment,
  loading,
  original_price,
  total_amount,
  total_compare_amount,
  estimated_tax,
  shipping_cost,
}) => {
  const [data, setData] = useState<any>({
    instance: {},
  });

  const [formData, setFormData] = useState({
    shipping_id: 0,
    full_name: "gonzalo",
    address_line_1: "Alto Chiribaya ",
    address_line_2: "Alto Ilo",
    city: "Ilo",
    state_province_region: "MKoquegua/Ilo",
    postal_zip_code: "1806",
    country_region: "Peru",
    telephone_number: "98765431",
    coupon_name: "FAFFFFAA",
  });

  const {
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    postal_zip_code,
    country_region,
    telephone_number,
    shipping_id,
  } = formData;
  useEffect(() => {
    get_shipping_options?.();
    get_payment_total?.();
  }, []);

  useEffect(() => {
    get_client_token?.();
  }, [user]);

  useEffect(() => {
    get_payment_total?.(shipping_id);
  }, [shipping_id]);
  if (!isAuthenticated && isAuthenticated !== null) {
    return <Navigate to="/" />;
  }
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const buy = async (e: any) => {
    e.preventDefault();

    const nonce = await data.instance.requestPaymentMethod();

    process_payment?.(
      nonce,
      shipping_id,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      postal_zip_code,
      country_region,
      telephone_number
    );
    console.log({
      nonce,
      shipping_id,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      postal_zip_code,
      country_region,
      telephone_number,
    });
  };

  const renderPaymentInfo = () => {
    if (!client_token && client_token === null) {
      if (!isAuthenticated && isAuthenticated === null) {
        return (
          <Link
            to="/login"
            className="w-full bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
          >
            Login
          </Link>
        );
      } else {
        return (
          <button className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
            <div id="circle5"></div>
          </button>
        );
      }
    } else {
      return (
        <>
          <DropIn
            options={{
              authorization: client_token,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />

          <div className="mt-6">
            {loading ? (
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                <div id="circle5"></div>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500"
              >
                Place Order
              </button>
            )}
          </div>
        </>
      );
    }
  };

  if (made_payment) {
    window.location.href = "/thankyou";
  }
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart {total_items}
              </h2>

              <ul
                role="list"
                className="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                {items &&
                  items.map((cart_item: ItemCart, index: number) => (
                    <li key={index} className="flex py-6 sm:py-10">
                      <Link to={`/product/${cart_item.product.id}`}>
                        <div className="flex-shrink-0">
                          <img
                            src={`${process.env.REACT_APP_API_URL}${cart_item.product.photo}`}
                            alt=""
                            className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                          />
                        </div>
                      </Link>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  to={`/product/${cart_item.product.id}`}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {cart_item.product.name}
                                </Link>
                              </h3>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              <b>$ {cart_item.product.price}</b>
                            </p>
                          </div>
                        </div>

                        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                          <CheckIcon
                            className="flex-shrink-0 h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />
                          <span>{cart_item.count}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                <Link to="/cart">
                  <button className="w-full border bg-gray-100 border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-dark  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 ">
                    Editar en el carrito
                  </button>
                </Link>
              </ul>
            </section>

            {/* Order summary */}
            <ShippingForm
              full_name={full_name}
              address_line_1={address_line_1}
              address_line_2={address_line_2}
              city={city}
              state_province_region={state_province_region}
              postal_zip_code={postal_zip_code}
              telephone_number={telephone_number}
              countries={countries}
              onChange={onChange}
              buy={buy}
              user={user}
              total_amount={total_amount}
              total_compare_amount={total_compare_amount}
              estimated_tax={estimated_tax}
              shipping_cost={shipping_cost}
              shipping_id={shipping_id}
              shipping_inputs={shipping_inputs}
              renderPaymentInfo={renderPaymentInfo}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  items: state.Cart.items,
  total_items: state.Cart.total_items,
  shipping_inputs: state.Shipping.shipping,
  user: state.Auth.user,
  client_token: state.Payment.clientToken,
  made_payment: state.Payment.made_payment,
  loading: state.Payment.loading,
  original_price: state.Payment.original_price,
  total_amount: state.Payment.total_amount,
  total_compare_amount: state.Payment.total_compare_amount,
  estimated_tax: state.Payment.estimated_tax,
  shipping_cost: state.Payment.shipping_cost,
});
export default connect(mapStateToProps, {
  get_shipping_options,
  refresh,
  get_client_token,
  get_payment_total,
  process_payment,
})(Checkout);