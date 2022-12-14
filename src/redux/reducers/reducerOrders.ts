import { ActionType } from "../../interfaces";
import {
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  GET_ORDER_DETAIL_FAIL,
} from "../actions/types";

export interface StateTypesOrders {
  orders: any[] | null;
  order: any | null;
}

const initialState: StateTypesOrders = {
  orders: null,
  order: null,
};

export default function Orders(
  state: StateTypesOrders = initialState,
  action: ActionType
) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload.orders,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        orders: [],
      };
    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        order: payload.order,
      };
    case GET_ORDER_DETAIL_FAIL:
      return {
        ...state,
        order: {},
      };
    default:
      return state;
  }
}
