import { Dispatch } from "redux";
import { ActionType } from "../../interfaces";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert =
  (mensaje: string, type: string, timeout = 5000) =>
  (dispatch: Dispatch<ActionType>) => {
    dispatch({
      type: SET_ALERT,
      payload: { mensaje, type },
    });
    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
        }),
      timeout
    );
  };
