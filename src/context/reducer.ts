// import React from "react";

// AppContextType
export type State = {
  isLoading: false;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  displayAlert: () => void;
};

// const initialCounterState: State = {
//   value: 0,
// };

export enum ActionKind {
  ShowAlert,
  ClearAlert,
  // ShowAlert = "SHOW_ALERT",
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

    default:
      throw new Error(`no such action : ${action.type}`);
  }
};

export default reducer;
