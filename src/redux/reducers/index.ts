import { combineReducers } from "redux";
import { StateTypesAuth } from "../../interfaces/Auth";
import Alert, { StateTypeAlert } from "./alertReducer";
import Auth from "./authReducer";

export interface ReducersStateType {
  Auth: StateTypesAuth;
  Alert: StateTypeAlert;
}

export default combineReducers<ReducersStateType>({
  Auth,
  Alert,
});
