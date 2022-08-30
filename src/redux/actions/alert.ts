import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (mensaje: string, color: string, timeout = 3000) =>
  (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        message: mensaje,
        color: color,
      },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
        }),
      timeout
    );
  };
