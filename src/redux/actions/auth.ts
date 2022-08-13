import axios from "axios";
import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_FAIl,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_FAIl,
  AUTHENTICATED_SUCCESS,
  REFRESH_FAIl,
  REFRESH_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIl,
  LOGOUT,
} from "./types";

import {
  AUTH_USERS_URL,
  ACTIVATE_USER_URL,
  USER_LOGIN_URL,
  GET_USER_URL,
  AUTH_VERIFY_URL,
  REFRESH_TOKEN_URL,
  RESET_PASWWORD_URL,
} from "./urlsApi";
import { setAlert } from "./alert";
import { Dispatch } from "redux";

import { ActionType } from "../../interfaces";
import { stringify } from "querystring";
const URL_BASE = process.env.REACT_APP_API_URL;

export const check_authenticated =
  () => async (dispatch: Dispatch<ActionType | any>) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        token: localStorage.getItem("access"),
      });
      try {
        const res = await axios.post(
          `${URL_BASE}/${AUTH_VERIFY_URL}`,
          body,
          config
        );
        if (res.status === 200) {
          dispatch({
            type: AUTHENTICATED_SUCCESS,
          });
        } else {
          dispatch({
            type: AUTHENTICATED_FAIl,
          });
        }
      } catch (error) {
        dispatch({
          type: AUTHENTICATED_FAIl,
        });
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIl,
      });
    }
  };

export const load_user = () => async (dispatch: Dispatch<ActionType | any>) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(`${URL_BASE}/${GET_USER_URL}`, config);
      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({ type: USER_LOADED_FAIl });
      }
    } catch (error) {
      dispatch({ type: USER_LOADED_FAIl });
    }
  }
};

export const signup =
  (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    re_password: string
  ) =>
  async (dispatch: any) => {
    dispatch({ type: SET_AUTH_LOADING });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      re_password,
    });

    try {
      const res = await axios.post(
        `${URL_BASE}/${AUTH_USERS_URL}`,
        body,
        config
      );
      if (res.status === 201) {
        dispatch({ type: SIGNUP_SUCCESS });
        dispatch(
          setAlert(
            "Te enviamos un correo, por favor activa tu cuenta. Revisa",
            "green"
          )
        );
        console.log("Cuenta registrada correctmente");
      } else {
        dispatch({ type: SIGNUP_FAIL });
        dispatch(setAlert("Error al activar la cuenta", "red"));
      }

      dispatch({ type: REMOVE_AUTH_LOADING });
    } catch (err: any) {
      dispatch({ type: SIGNUP_FAIL });
      dispatch({ type: REMOVE_AUTH_LOADING });

      dispatch(setAlert("Error al conectar con el servidor", "red"));
    }
  };

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<ActionType | any>) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      const res = await axios.post(
        `${URL_BASE}/${USER_LOGIN_URL}`,
        body,
        config
      );
      if (res.status === 200) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data });
        dispatch(load_user());
        dispatch(setAlert("Inicio de sesion con exito", "green"));
      } else {
        dispatch({ type: LOGIN_FAIL });
        dispatch(setAlert("Error al iniciar sesion datos incorrectos", "red"));
      }

      dispatch({ type: REMOVE_AUTH_LOADING });
    } catch (err: any) {
      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: REMOVE_AUTH_LOADING });

      dispatch(
        setAlert("Error al conectar con el servidor.Intenta mas tarde", "red")
      );
    }
  };

export const activate =
  (uid: string, token: string) =>
  async (dispatch: Dispatch<ActionType | any>) => {
    dispatch({ type: SET_AUTH_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid,
      token,
    });

    try {
      const res = await axios.post(
        `${URL_BASE}/${ACTIVATE_USER_URL}`,
        body,
        config
      );
      if (res.status === 204) {
        dispatch({ type: ACTIVATION_SUCCESS });

        dispatch(setAlert("Cuenta activada correctamente", "green"));
      } else {
        dispatch({ type: ACTIVATION_FAIL });

        dispatch(setAlert("Error al activar la cuenta", "red"));
      }

      dispatch({ type: REMOVE_AUTH_LOADING });
    } catch (err: any) {
      dispatch({ type: ACTIVATION_FAIL });
      dispatch({ type: REMOVE_AUTH_LOADING });
      dispatch(setAlert("Error conectando con el servidor", "red"));
    }
  };

export const refresh = () => async (dispatch: Dispatch<ActionType | any>) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });
    try {
      const res = await axios.post(
        `${URL_BASE}/${REFRESH_TOKEN_URL}`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: REFRESH_FAIl,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIl,
    });
  }
};

export const reset_password_confirm =
  (uid: string, token: string, new_password: string, re_new_password: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });
    try {
      const res = await axios.post(
        `${URL_BASE}/${REFRESH_TOKEN_URL}`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: REFRESH_FAIl,
      });
    }
  };

export const logout = () => async (dispatch: Dispatch<ActionType | any>) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("Session terminada con exito", "green"));
};
