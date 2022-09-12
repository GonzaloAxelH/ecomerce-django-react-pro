import { FC, Fragment } from "react";
import { connect } from "react-redux";
import { ReducersStateType } from "../redux/reducers";

type Props = {
  showAlert?: any;
  color?: any;
  message?: any;
};

const Alert: FC<Props> = ({ showAlert, color, message }) => {
  if (!showAlert) {
    return <></>;
  }

  if (color === "green") {
    return <Success message={message} />;
  }
  if (color === "red") {
    return <Fail message={message} />;
  }
  if (color === "blue") {
    return <Updated message={message} />;
  }
  return <></>;
};

function Fail(props: any) {
  return (
    <div
      className="bg-red-500 border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md my-2"
      role="alert"
    >
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="ml-4">
          <p className="font-bold text-md">Fail xd !!</p>
          <p className="text-md">{props.message}</p>
        </div>
      </div>
    </div>
  );
}

function Updated(props: any) {
  return (
    <div
      className="fixed-alert  flex justify-center p-8"
      style={{ animationDelay: " .1s" }}
    >
      <div className=" w-64 items-center rounded-lg shadow-lg mb-4 flex bg-blue-500 p-4 text-white">
        <div className="w-64">
          <h4 className="mb-2 font-bold">Updated</h4>
          <p>{props.message} </p>{" "}
        </div>
        <div className="w-12">
          <div className="text-2xl p-2 bg-blue-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Success(props: any) {
  return (
    <div
      className="bg-green-500 border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md my-2"
      role="alert"
    >
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="ml-4">
          <p className="font-bold text-md">Success !!</p>
          <p className="text-md">{props.message}</p>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: ReducersStateType) => ({
  showAlert: state.Alert.showAlert,
  message: state.Alert.message,
  color: state.Alert.color,
});

export default connect(mapStateToProps, null)(Alert);
