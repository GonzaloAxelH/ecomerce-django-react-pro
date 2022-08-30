import { combineReducers } from "redux";

import Alert, { StateTypeAlert } from "./alertReducer";
import Auth, { StateTypesAuth } from "./authReducer";
import Categories, { StateTypesCategories } from "./categoriesReducer";
import Products, { StateTypesProducts } from "./productsReducer";
import Cart, { StateTypesCartItems } from "./cartReducer";
import Shipping, { StateTypesShipping } from "./reducerShipping";
import Payment, { StateTypesPayment } from "./reducerPayment";
import Orders, { StateTypesOrders } from "./reducerOrders";
export interface ReducersStateType {
  Auth: StateTypesAuth;
  Alert: StateTypeAlert;
  Categories: StateTypesCategories;
  Products: StateTypesProducts;
  Cart: StateTypesCartItems;
  Shipping: StateTypesShipping;
  Payment: StateTypesPayment;
  Orders: StateTypesOrders;
}

export default combineReducers<ReducersStateType>({
  Auth,
  Payment,
  Categories,
  Alert,
  Products,
  Cart,
  Shipping,
  Orders,
});
