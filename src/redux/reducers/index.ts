import { combineReducers } from "redux";
import Alert from "./alertReducer";
import Auth from "./authReducer";

export interface ReducersStateType {
  Auth: any;
  Alert: any;
}

export default combineReducers<ReducersStateType>({
  Auth,
  Alert,
});
