import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { ItemCart } from "../reducers/cartReducer";
import { ProductType } from "../reducers/productsReducer";
import {
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAIL,
  GET_TOTAL_SUCCESS,
  GET_TOTAL_FAIL,
  GET_ITEM_TOTAL_SUCCESS,
  GET_ITEM_TOTAL_FAIL,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  UPDATE_ITEM_SUCCESS,
  UPDATE_ITEM_FAIL,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL,
  EMPTY_CART_SUCCESS,
  EMPTY_CART_FAIL,
  SYNCH_CART_SUCCESS,
  SYNCH_CART_FAIL,
  ADD_ITEM,
  GET_TOTAL,
  GET_ITEM_TOTAL,
  GET_ITEMS,
  UPDATE_ITEM,
  REMOVE_ITEM,
  EMPTY_CART,
} from "./types";
const api = process.env.REACT_APP_API_URL;
const isAccessToken: boolean = !!localStorage.getItem("access");
const accessToken = localStorage.getItem("access");
const existsCartLocal =
  localStorage.getItem("cart") && localStorage.getItem("cart") !== null;
const cartLocal = localStorage.getItem("cart") || "[]";

export const add_item =
  (product: ProductType) => async (dispatch: Dispatch<ActionType>) => {
    if (isAccessToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `JWT ${accessToken}`,
        },
      };
      const product_id = product.id;
      const body = JSON.stringify({
        product_id,
      });

      try {
        const res = await axios.post(`${api}/api/cart/add-item`, body, config);
        if (res.status === 201) {
          dispatch({
            type: ADD_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: ADD_ITEM_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: ADD_ITEM_FAIL,
        });
      }
    } else {
      let cart: any[] = [];
      if (existsCartLocal) {
        cart = JSON.parse(localStorage.getItem("cart") || "[]");
      }

      let sholudAddItem: boolean = true;

      cart.map((item: any) => {
        if (product.id.toString() === item.product.id.toString()) {
          sholudAddItem = false;
        }
      });
      const order_item: any = {
        product,
        count: 1,
      };
      if (sholudAddItem) {
        cart.push(order_item);
      }
      dispatch({
        type: ADD_ITEM,
        payload: cart,
      });
    }
  };

export const get_items = () => async (dispatch: Dispatch<ActionType>) => {
  if (isAccessToken) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    };
    try {
      const res = await axios.get(`${api}/api/cart/cart-items`, config);
      if (res.status === 200) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ITEMS_FAIL,
      });
    }
  } else {
    dispatch({
      type: GET_ITEMS,
    });
  }
};

export const get_total = () => async (dispatch: Dispatch<ActionType>) => {
  if (isAccessToken) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    };
    try {
      const res = await axios.get(`${api}/api/cart/get-total`, config);
      if (res.status === 200) {
        dispatch({
          type: GET_TOTAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_TOTAL_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_TOTAL_FAIL,
      });
    }
  } else {
    let total = 0.0;
    let compare_total = 0.0;
    let cart: any = [];

    if (existsCartLocal) {
      cart = JSON.parse(cartLocal);
      cart.map((item: any) => {
        total += parseFloat(item.product.price) * parseFloat(item.count);
        compare_total +=
          parseFloat(item.product.compare_price) * parseFloat(item.count);
      });
    }

    dispatch({
      type: GET_TOTAL,
      payload: [
        parseFloat(total.toFixed(2)),
        parseFloat(compare_total.toFixed(2)),
      ],
    });
  }
};

export const get_item_total = () => async (dispatch: Dispatch<ActionType>) => {
  if (isAccessToken) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    };
    try {
      const res = await axios.get(`${api}/api/cart/get-item-total`, config);
      if (res.status === 200) {
        dispatch({
          type: GET_ITEM_TOTAL_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ITEM_TOTAL_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ITEM_TOTAL_FAIL,
      });
    }
  } else {
    let total = 0;
    if (existsCartLocal) {
      total = await JSON.parse(cartLocal).length;
    }

    dispatch({
      type: GET_ITEM_TOTAL,
      payload: total,
    });
  }
};

export const update_item =
  (item: any, count: any) => async (dispatch: Dispatch<ActionType>) => {
    if (isAccessToken) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${accessToken}`,
        },
      };

      const body = JSON.stringify({
        product_id: item.product.id,
        count,
      });
      try {
        const res = await axios.put(
          `${api}/api/cart/update-item`,
          body,
          config
        );

        if (res.status === 200 && !res.data.error) {
          dispatch({
            type: UPDATE_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: UPDATE_ITEM_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: UPDATE_ITEM_FAIL,
        });
      }
    } else {
      let cart: any[] = [];

      if (existsCartLocal) {
        cart = JSON.parse(cartLocal);
        cart.map((cart_item: any, index: number) => {
          if (cart_item.product.id.toString() === item.product.id.toString()) {
            cart[index].count = parseInt(count);
          }
        });
      }

      dispatch({
        type: UPDATE_ITEM,
        payload: cart,
      });
    }
  };

export const remove_item =
  (item: any) => async (dispatch: Dispatch<ActionType>) => {
    if (isAccessToken) {
      const body = JSON.stringify({
        product_id: item.product.id,
      });
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `JWT ${accessToken}`,
        },
        data: body,
      };

      try {
        const res = await axios.delete(`${api}/api/cart/remove-cart`, config);

        if (res.status === 200) {
          dispatch({
            type: REMOVE_ITEM_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: REMOVE_ITEM_FAIL,
          });
        }
      } catch (error) {
        dispatch({
          type: REMOVE_ITEM_FAIL,
        });
      }
    } else {
      let cart: any = [];
      let newCart: any = [];
      if (existsCartLocal) {
        cart = JSON.parse(cartLocal);
        newCart = cart.filter((el: any) => el.product.id !== item.product.id);
      }

      dispatch({
        type: REMOVE_ITEM,
        payload: newCart,
      });
    }
  };

export const empty_cart = () => async (dispatch: Dispatch<ActionType>) => {
  if (isAccessToken) {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `JWT ${accessToken}`,
      },
    };

    try {
      const res = await axios.delete(`${api}/api/cart/empty-cart`, config);

      if (res.status === 200) {
        dispatch({
          type: EMPTY_CART_SUCCESS,
        });
      } else {
        dispatch({
          type: EMPTY_CART_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: EMPTY_CART_FAIL,
      });
    }
  } else {
    dispatch({
      type: EMPTY_CART,
    });
  }
};

export const synch_cart = () => async (dispatch: Dispatch<ActionType>) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `JWT ${accessToken}`,
    },
  };

  let cart_items: any[] = [];

  if (localStorage.getItem("cart")) {
    let cart = JSON.parse(cartLocal);

    cart.map((cart_item: any) => {
      let item: any = {};
      item.product_id = cart_item.product.id;
      item.count = cart_item.count;
      cart_items.push(item);
    });
  }

  const body = JSON.stringify({ cart_items });

  try {
    const res = await axios.put(`${api}/api/cart/synch`, body, config);

    if (res.status === 201) {
      dispatch({
        type: SYNCH_CART_SUCCESS,
      });
    } else {
      dispatch({
        type: SYNCH_CART_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: SYNCH_CART_FAIL,
    });
  }
};
