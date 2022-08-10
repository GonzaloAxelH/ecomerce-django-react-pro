import { REMOVE_ALERT, SET_ALERT } from "../actions/types";
import { ActionType } from "../../interfaces/index";

export interface AlertType {
  type: string;
  mensaje: string;
}

export interface StateTypeAlert {
  alert: AlertType | null;
}

const initialState = {
  alert: null,
};

export default function Alert(
  state: StateTypeAlert = initialState,
  action: ActionType
): StateTypeAlert {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
}
