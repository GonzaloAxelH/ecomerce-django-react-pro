import React, { ElementType, FC, useState } from "react";
import Layout from "../../hocs/Layout";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { activate } from "../../redux/actions/auth";
import { Navigate } from "react-router";
import Loader from "react-loader-spinner";
interface Props {
  activate?: Function;
  loading?: boolean;
}
const Activate: FC<Props> = ({ activate, loading }) => {
  const { uid, token } = useParams();
  const [activated, setActivated] = useState<boolean>(false);
  const activateAccount = () => {
    activate && activate(uid, token);
    setActivated(true);
  };

  if (activated && !loading) return <Navigate to="/" />;
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <button
              onClick={activateAccount}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Loading...
            </button>
          ) : (
            <button
              onClick={activateAccount}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Activate Account
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = ({ Auth }: any) => ({
  loading: Auth.loading,
});

export default connect(mapStateToProps, {
  activate,
})(Activate);
