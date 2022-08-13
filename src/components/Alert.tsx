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
        <div className={`rounded-md bg-${alert?.type}-50 p-4`}>
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className={`h-5 w-5 text-${alert?.type}-400`}
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${alert?.type}-800`}>
                {alert?.mensaje}
              </p>
            </div>
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
