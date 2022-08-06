import {
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  REMOVE_AUTH_LOADING,
  SET_AUTH_LOADING,
} from "../actions/types";

export type ActionType = {
  payload?: any;
  type: string;
};

export interface StateTypesAuth {
  access: any;
  refresh: any;
  isAuthenticated: Boolean | any;
  user: any;
  loading: boolean;
}

const initialState: StateTypesAuth = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  loading: false,
};

export default function Auth(
  state = initialState,
  action: ActionType
): StateTypesAuth {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case ACTIVATION_SUCCESS:

    case ACTIVATION_FAIL:
      return { ...state };
    case SIGNUP_SUCCESS:
      return { ...state };
    case SIGNUP_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
