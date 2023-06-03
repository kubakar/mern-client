// import React from "react";

import { User } from "../utils/types";

export type State = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  userLocation: string;
  jobLocation: string; // ?
};

// const initialCounterState: State = {
//   value: 0,
// };

export enum ActionKind {
  ShowAlert,
  ClearAlert,
  LoginUser,
  LogoutUser,
}

type Action = {
  type: ActionKind;
  // payload?: { [name: string]: string }; // generic object
  payload: Record<string, any>; // any ??
};

const reducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case ActionKind.ShowAlert:
      return {
        ...state,
        showAlert: true,
        alertText: payload.text,
        alertType: payload.type,
      };

    case ActionKind.ClearAlert:
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };

    case ActionKind.LoginUser:
      const { user, token, location } = payload;
      return {
        ...state,
        user,
        token,
        userLocation: location,
        jobLocation: location,
      };

    case ActionKind.LogoutUser:
      return {
        isLoading: false,
        showAlert: false,
        alertText: "",
        alertType: "",
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
      };

    default:
      throw new Error(`no such dispatch action : ${action.type}`);
  }
};

export default reducer;
