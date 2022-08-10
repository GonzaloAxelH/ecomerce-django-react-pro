import axios from "axios";
import {
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
} from "./types";
import { AUTH_USERS_URL, ACTIVATE_USER_URL } from "./urlsApi";
import { setAlert } from "./alert";
const URL_BASE = process.env.REACT_APP_API_URL;

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

export const activate =
  (uid: string, token: string) => async (dispatch: any) => {
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
