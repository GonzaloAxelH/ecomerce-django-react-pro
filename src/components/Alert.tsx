import { FC, Fragment } from "react";
import { connect } from "react-redux";
import { ReducersStateType } from "../redux/reducers";
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import { AlertType } from "../redux/reducers/alertReducer";
type Props = {
  alert?: AlertType;
};

const Alert: FC<Props> = ({ alert }) => {
  const displayAlert = () => {
    if (alert !== null) {
      return (
        <div className="shadow bg-white rounded-full m-5" role="alert">
          {" "}
          <div className="p-1 flex">
            {" "}
            <div
              className={`w-24 bg-${alert?.type}-500 flex items-center text-white rounded-full justify-center`}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>{" "}
            </div>{" "}
            <div className="pl-2 text-gray-600">
              {" "}
              <p className="font-bold">
                {alert?.type === "red" ? "Error" : "Success"}
              </p>{" "}
              <p>
                {alert?.mensaje}
                <span className="text-gray-500"></span>
              </p>{" "}
            </div>{" "}
          </div>
        </div>
      );
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
