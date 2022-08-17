import { Fragment, FC, useState, useEffect } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { get_categories } from "../../redux/actions/caegories";
import { get_search_products } from "../../redux/actions/product";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ReducersStateType } from "../../redux/reducers";
import { Link, Navigate } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import AuthLinks from "./AuthLinks";
import {
  solutions,
  company,
  callsToAction,
  resources,
  blogPosts,
} from "./LinksNavbar";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface Props {
  isAuthenticated?: boolean | null;
  user?: any;
  get_categories?: Function;
  logout?: Function;
  categories?: any;
  get_search_products?: Function;
}

const Navbar: FC<Props> = ({
  isAuthenticated,
  user,
  logout,
  categories,
  get_categories,
  get_search_products,
}) => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToSearch, setRedirectToSearch] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: "",
  });
  const { category_id, search } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (window.location.pathname === "/search") {
      setRedirectToSearch(false);
    } else {
      setRedirectToSearch(true);
    }
    get_search_products && get_search_products(search, category_id);
  };

  useEffect(() => {
    get_categories && get_categories();
  }, []);

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
        className="absolute inset-0 shadow z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
          <div>
            <Link to="#" className="flex">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://static.vecteezy.com/system/resources/previews/002/567/996/non_2x/3d-figure-designer-flat-style-icon-free-vector.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between w-full">
            <form onSubmit={(e: any) => onSubmit(e)} className="w-full h-50">
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
            <Popover.Group as="nav" className="flex space-x-10">
              <Popover>
                {({ open }: any) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>Solutions</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg bg-white">
                        <div className="max-w-7xl mx-auto grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                          {solutions.map((item) => (
                            <Link
                              key={item.name}
                              to={item.to}
                              className="-m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50"
                            >
                              <div className="flex md:h-full lg:flex-col">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                                    <item.icon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </div>
                                <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                  <div>
                                    <p className="text-base font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.description}
                                    </p>
                                  </div>
                                  <p className="mt-2 text-sm font-medium text-indigo-600 lg:mt-4">
                                    Learn more{" "}
                                    <span aria-hidden="true">&rarr;</span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="bg-gray-50">
                          <div className="max-w-7xl mx-auto space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                            {callsToAction.map((item) => (
                              <div key={item.name} className="flow-root">
                                <Link
                                  to={item.to}
                                  className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                >
                                  <item.icon
                                    className="flex-shrink-0 h-6 w-6 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3">{item.name}</span>
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <Link
                to="/shop"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Store
              </Link>

              <Popover>
                {({ open }: any) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? "text-gray-900" : "text-gray-500",
                        "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      )}
                    >
                      <span>More</span>
                      <ChevronDownIcon
                        className={classNames(
                          open ? "text-gray-600" : "text-gray-400",
                          "ml-2 h-5 w-5 group-hover:text-gray-500"
                        )}
                        aria-hidden="true"
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 -translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-1"
                    >
                      <Popover.Panel className="hidden md:block absolute z-10 top-full inset-x-0 transform shadow-lg">
                        <div className="absolute inset-0 flex">
                          <div className="bg-white w-1/2" />
                          <div className="bg-gray-50 w-1/2" />
                        </div>
                        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
                          <nav className="grid gap-y-10 px-4 py-8 bg-white sm:grid-cols-2 sm:gap-x-8 sm:py-12 sm:px-6 lg:px-8 xl:pr-12">
                            <div>
                              <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                Company
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {company.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <Link
                                      to={item.to}
                                      className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                Resources
                              </h3>
                              <ul role="list" className="mt-5 space-y-6">
                                {resources.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <Link
                                      to={item.to}
                                      className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                                    >
                                      <item.icon
                                        className="flex-shrink-0 h-6 w-6 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-4">{item.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </nav>
                          <div className="bg-gray-50 px-4 py-8 sm:py-12 sm:px-6 lg:px-8 xl:pl-12">
                            <div>
                              <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                                From the blog
                              </h3>
                              <ul role="list" className="mt-6 space-y-6">
                                {blogPosts.map((post) => (
                                  <li key={post.id} className="flow-root">
                                    <Link
                                      to={post.to}
                                      className="-m-3 p-3 flex rounded-lg hover:bg-gray-100"
                                    >
                                      <div className="hidden sm:block flex-shrink-0">
                                        <img
                                          className="w-32 h-20 object-cover rounded-md"
                                          src={post.imageUrl}
                                          alt=""
                                        />
                                      </div>
                                      <div className="w-0 flex-1 sm:ml-8">
                                        <h4 className="text-base font-medium text-gray-900 truncate">
                                          {post.name}
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {post.preview}
                                        </p>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-6 text-sm font-medium">
                              <Link
                                to="#"
                                className="text-indigo-600 hover:text-indigo-500"
                              >
                                {" "}
                                View all posts{" "}
                                <span aria-hidden="true">&rarr;</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </Popover.Group>
            <div className="flex items-center md:ml-12">
              {isAuthenticated ? <AuthLinks logout={logout} /> : <GuestLinks />}
            </div>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <nav>
                  <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4 text-base font-medium text-gray-900">
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 text-base">
                    <Link
                      to="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}
                      View all products <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="grid grid-cols-2 gap-4">
                <Link
                  to="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Pricing
                </Link>

                <Link
                  to="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Docs
                </Link>

                <Link
                  to="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Company
                </Link>

                <Link
                  to="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Resources
                </Link>

                <Link
                  to="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Blog
                </Link>

                <Link
                  to="#"
                  className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  Contact Sales
                </Link>
              </div>
              {/* */}

              <div className="mt-6"></div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};
const mapStateToProps = (state: ReducersStateType) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
});

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products,
})(Navbar);
