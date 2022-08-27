import { FC, Fragment } from "react";
import { connect } from "react-redux";
import { ReducersStateType } from "../redux/reducers";
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import { AlertType } from "../redux/reducers/alertReducer";
type Props = {
  alert?: any;
};

const Alert: FC<Props> = ({ alert }) => {
  const displayAlert = () => {
    if (alert !== null) {
      if (alert.type === "green") {
        return (
          <div
            className={`flex bg-green-100 rounded-lg p-4 m-4 text-sm text-green-700`}
            style={{ transition: "0.2s all" }}
            role="alert"
          >
            <svg
              className="w-5 h-5 inline mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div>
              <span className="font-medium">Success!!</span> {alert?.mensaje}
            </div>
          </div>
        );
      } else {
        <div
          className={`flex bg-red-100 rounded-lg p-4 m-4 text-sm text-red-700`}
          style={{ transition: "0.2s all" }}
          role="alert"
        >
          <svg
            className="w-5 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">Danger!!</span> {alert?.mensaje}
          </div>
        </div>;
      }
    } else {
      return <Fragment></Fragment>;
    }
  };

  return <Fragment>{displayAlert()}</Fragment>;
};

const mapStateToProps = (state: ReducersStateType) => ({
  alert: state.Alert.alert,
});

export default connect(mapStateToProps, null)(Alert);
