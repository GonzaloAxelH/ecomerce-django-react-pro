import { combineReducers } from "redux";

import Alert, { StateTypeAlert } from "./alertReducer";
import Auth, { StateTypesAuth } from "./authReducer";
import Categories, { StateTypesCategories } from "./categoriesReducer";
import Products, { StateTypesProducts } from "./productsReducer";
import Cart, { StateTypesCartItems } from "./cartReducer";
import Shipping, { StateTypesShipping } from "./reducerShipping";
export interface ReducersStateType {
  Auth: StateTypesAuth;
  Alert: StateTypeAlert;
  Categories: StateTypesCategories;
  Products: StateTypesProducts;
  Cart: StateTypesCartItems;
  Shipping: StateTypesShipping;
}

export default combineReducers<ReducersStateType>({
  Auth,
  Categories,
  Alert,
  Products,
  Cart,
  Shipping,
});
