import { connect } from "react-redux";
import { list_orders } from "../../redux/actions/order";
import { get_items, get_total, get_item_total } from "../../redux/actions/cart";
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { countries } from "../../helpers/fixCountries";
import {
  get_user_profile,
  update_user_profile,
} from "../../redux/actions/profile";
import { ProfileType } from "../../redux/reducers/profileReducer";
import { ReducersStateType } from "../../redux/reducers";
import LayoutDashboard from "../../hocs/LayoutDashboard";

interface Props {
  isAuthenticated?: any;
  update_user_profile?: Function;

  profile?: ProfileType;
}

const DashboardProfile: FC<any> = ({
  isAuthenticated,
  update_user_profile,
  profile,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state_province_region: "",
    zipcode: "",
    phone: "",
    country_region: "Canada",
  });

  const {
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    zipcode,
    phone,
    country_region,
  } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await update_user_profile(
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      zipcode,
      phone,
      country_region
    );
    setLoading(false);
    window.scrollTo(0, 0);
  };

  return (
    <LayoutDashboard>
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <form onSubmit={(e) => onSubmit(e)} className="max-w-3xl mx-auto">
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile
                </h3>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Address Line 1:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="address_line_1"
                      placeholder={`${profile?.address_line_1}`}
                      onChange={(e) => onChange(e)}
                      value={address_line_1}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Address Line 2:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="address_line_2"
                      placeholder={`${profile?.address_line_2}`}
                      onChange={(e) => onChange(e)}
                      value={address_line_2}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  City
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="city"
                      placeholder={`${profile?.city}`}
                      onChange={(e) => onChange(e)}
                      value={city}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  State/Province:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="state_province_region"
                      placeholder={`${profile?.state_province_region}`}
                      onChange={(e) => onChange(e)}
                      value={state_province_region}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Postal Code/Zipcode:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="zipcode"
                      placeholder={`${profile?.zipcode}`}
                      onChange={(e) => onChange(e)}
                      value={zipcode}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Phone:
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="phone"
                      placeholder={`${profile?.phone}`}
                      onChange={(e) => onChange(e)}
                      value={phone}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Country
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <select
                    id="country_region"
                    name="country_region"
                    onChange={(e) => onChange(e)}
                  >
                    <option value={country_region}>
                      {profile?.country_region}
                    </option>
                    {countries &&
                      countries.map((country, index) => (
                        <option key={index} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <button className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <div className="circle5"></div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </LayoutDashboard>
  );
};

const mapStateToProps = (state: ReducersStateType) => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
  profile: state.Profile.profile,
});

export default connect(mapStateToProps, {
  update_user_profile,
})(DashboardProfile);
