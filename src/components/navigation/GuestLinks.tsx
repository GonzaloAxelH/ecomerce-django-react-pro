import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const GuestLinks = () => {
  return (
    <Fragment>
      <Link
        to="/login"
        className="text-base font-medium text-gray-500 hover:text-gray-900"
      >
        Sign in
      </Link>
      <Link
        to="/signup"
        className="ml-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </Link>
    </Fragment>
  );
};

export default GuestLinks;
