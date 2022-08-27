import { Fragment, FC, useState, useEffect } from "react";
import { Popover } from "@headlessui/react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { get_categories } from "../../redux/actions/caegories";
import { get_search_products } from "../../redux/actions/product";
import { MenuIcon } from "@heroicons/react/outline";

import { ReducersStateType } from "../../redux/reducers";
import { Link, Navigate } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import AuthLinks from "./AuthLinks";

import { get_items, get_item_total, get_total } from "../../redux/actions/cart";

interface Props {
  isAuthenticated?: boolean | null;
  user?: any;
  get_categories?: Function;
  logout?: Function;
  categories?: any;
  total_items_cart?: number;
  total_items_total?: Function;
  get_item_total?: Function;
  get_search_products?: Function;
  get_items?: Function;
  get_total?: Function;
}

const Navbar: FC<Props> = ({
  isAuthenticated,
  user,
  logout,
  categories,
  get_categories,
  get_search_products,
  total_items_cart,
  get_item_total,
  get_items,
  get_total,
}) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToSearch, setRedirectToSearch] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: "",
  });
  const { category_id, search } = formData;
  useEffect(() => {
    get_items?.();
    get_categories?.();
    get_item_total?.();
    get_total?.();
  }, []);

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (window.location.pathname === "/search") {
      setRedirectToSearch(false);
    } else {
      setRedirectToSearch(true);
    }
    get_search_products?.(search, category_id);
  };

  if (redirectToLogin) {
    setRedirectToLogin(true);
    return <Navigate to="/" />;
  }
  if (redirectToSearch) {
    return <Navigate to="/search" />;
  }

  return (
    <Popover className="relative bg-white">
      <div
        className="absolute inset-0  z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link to="/" className="flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="-mr-2 -my-2 md:hidden flex items-center">
            <Link
              to="/cart"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open menu</span>

              <div className="cursor-pointer relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#6b7280"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span
                  style={{
                    backgroundColor: "#6b7280",
                    fontSize: "12px",
                  }}
                  className="absolute right-0 top-0 rounded-full w-4 h-4 top right p-0 m-0 text-white  leading-tight text-center"
                >
                  {total_items_cart}
                </span>
              </div>
            </Link>

            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex-2 md:flex md:items-center md:justify-between">
            <form onSubmit={(e: any) => onSubmit(e)} className="h-50">
              <div className="flex rounded-full border-grey-light border">
                <button type="submit">
                  <span className="w-auto flex justify-end items-center text-grey p-2">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </span>
                </button>
                <input
                  className="w-full rounded mr-4 outline-0"
                  type="text"
                  required
                  value={search}
                  onChange={(e: any) => onChange(e)}
                  name="search"
                  placeholder="Que buscas hoy ..."
                />
                <div className="mt-1 mx-1 px-2 py-1">
                  <select
                    name="category_id"
                    className="rounded-full font-medium text-gray-400 outline-0 cursor-pointer"
                    onChange={(e: any) => onChange(e)}
                  >
                    <option
                      value="0"
                      className="font-medium text-gray-400 outline-0"
                    >
                      All
                    </option>
                    {categories &&
                      categories !== null &&
                      categories !== undefined &&
                      categories.map((category: any, index: any) => (
                        <option
                          key={index}
                          value={category.id}
                          className="font-medium text-gray-400 p-1 outline-0 cursor-pointer"
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <Popover.Group as="nav" className="flex space-x-8">
              <Link
                to="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Store
              </Link>
            </Popover.Group>

            <div className="flex items-center space-x-3">
              <div className="-mr-2 -my-2 md:hidden flex items-center">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <Link
                to="/cart"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open menu</span>

                <div className="cursor-pointer relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#6b7280"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span
                    style={{
                      backgroundColor: "#6b7280",
                      fontSize: "12px",
                    }}
                    className="absolute right-0 top-0 rounded-full w-4 h-4 top right p-0 m-0 text-white  leading-tight text-center"
                  >
                    {total_items_cart}
                  </span>
                </div>
              </Link>

              {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items_cart: state.Cart.total_items,
});

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products,
  get_item_total,
  get_items,
  get_total,
})(Navbar);
