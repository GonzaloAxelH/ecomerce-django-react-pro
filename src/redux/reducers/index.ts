import { combineReducers } from "redux";

import Alert, { StateTypeAlert } from "./alertReducer";
import Auth, { StateTypesAuth } from "./authReducer";
import Categories, { StateTypesCategories } from "./categoriesReducer";
import Products, { StateTypesProducts } from "./productsReducer";
export interface ReducersStateType {
  Auth: StateTypesAuth;
  Alert: StateTypeAlert;
  Categories: StateTypesCategories;
  Products: StateTypesProducts;
}

export default combineReducers<ReducersStateType>({
  Auth,
  Categories,
  Alert,
  Products,
});
