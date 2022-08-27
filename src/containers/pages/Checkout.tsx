import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Layout from "../../hocs/Layout";
import { ReducersStateType } from "../../redux/reducers";
import { get_shipping_options } from "../../redux/actions/shipping";
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { ItemCart } from "../../redux/reducers/cartReducer";
import { ShippingType } from "../../redux/reducers/reducerShipping";

interface Props {
  isAuthenticated?: boolean;
  items?: any;
  total_items?: number;
  get_shipping_options?: Function;
  shipping_inputs?: any[] | null;
}

const Checkout: FC<Props> = ({
  isAuthenticated,
  items,
  total_items,
  get_shipping_options,
  shipping_inputs,
}) => {
  const [formData, setFormData] = useState({
    shipping_id: 0,
  });
  const { shipping_id } = formData;
  useEffect(() => {
    get_shipping_options?.();
  }, []);
  if (!isAuthenticated && isAuthenticated !== null) {
    return <Navigate to="/" />;
  }
  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Checkout
          </h1>
          <form
            className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
            onSubmit={onSubmit}
          >
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
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
                  <button className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
                    Editar en el carrito
                  </button>
                </Link>
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">
                    {shipping_inputs &&
                      shipping_inputs.map(
                        (shipping_option: ShippingType, index: number) => {
                          return (
                            <div key={index}>
                              <input
                                className="cursor-pointer"
                                onChange={(e) => onChange(e)}
                                value={shipping_option.id}
                                name="shipping_id"
                                type="radio"
                                required
                              />
                              <label className="ml-4">
                                {shipping_option.name} - $
                                {shipping_option.price} (
                                {shipping_option.time_to_delivery})
                              </label>
                            </div>
                          );
                        }
                      )}
                  </dt>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Sub Total</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                </div>
                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    $112.32
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Checkout
                </button>
              </div>
            </section>
          </form>
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
});
export default connect(mapStateToProps, {
  get_shipping_options,
})(Checkout);
