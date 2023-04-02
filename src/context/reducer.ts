// import React from "react";

export type State = {
  isLoading: false;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: string | null;
  token: string | null;
  userLocation: string;
};

// const initialCounterState: State = {
//   value: 0,
// };

export enum ActionKind {
  ShowAlert,
  ClearAlert,
  // ShowAlert = "SHOW_ALERT",
  RegisterUserBegin,
  RegisterUserSuccess,
  RegisterUserError,
}

type Action = {
  type: ActionKind;
  payload?: { [name: string]: number | string }; // generic object
};

const reducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case ActionKind.ShowAlert:
      return {
        ...state,
        showAlert: true,
        alertText: "Please provide all values",
        alertType: "danger",
      };

    case ActionKind.ClearAlert:
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };

    case ActionKind.RegisterUserBegin:
      return state;

    default:
      throw new Error(`no such action : ${action.type}`);
  }
};

export default reducer;
