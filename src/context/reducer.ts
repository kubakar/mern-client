// import React from "react";

export type State = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: object;
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
  ShowLoading,
  // ShowAlert = "SHOW_ALERT",
  LoginUser,
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

    // TO BE DELETED ??
    case ActionKind.ShowLoading:
      return {
        ...state,
        isLoading: payload.visible === "true" ? true : false,
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

    default:
      throw new Error(`no such dispatch action : ${action.type}`);
  }
};

export default reducer;
