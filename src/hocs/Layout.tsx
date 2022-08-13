import React, { FC, useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import { connect } from "react-redux";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth";
type Props = {
  children: JSX.Element;
  check_authenticated?: Function;
  load_user?: Function;
  refresh?: Function;
};
const Layout: FC<Props> = ({
  children,
  check_authenticated,
  load_user,
  refresh,
}) => {
  useEffect(() => {
    if (check_authenticated && load_user && refresh) {
      check_authenticated();
      load_user();
      refresh();
    }
  }, []);
  return (
    <div>
      <Navbar />

      {children}
      <Footer />
    </div>
  );
};
export default connect(null, {
  check_authenticated,
  load_user,
  refresh,
})(Layout);
