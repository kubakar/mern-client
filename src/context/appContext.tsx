import React, { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import { State, ActionKind } from "./reducer";

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: null,
  userLocation: "",
};

type StateMethods = {
  displayAlert: () => void;
  clearAlert: () => void;
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  registerUser: (user: Record<string, string>) => void;
};

const AppContext = createContext<(State & StateMethods) | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppProviderProps> = (props) => {
  // reducer
  const [state, disptach] = useReducer(reducer, initialState);

  const ctxClearAlert = () => {
    setTimeout(() => {
      disptach({ type: ActionKind.ClearAlert });
    }, 2000);
  };

  const stateMethods: StateMethods = {
    clearAlert() {
      setTimeout(() => {
        disptach({ type: ActionKind.ClearAlert });
      }, 2000);
    },

    displayAlert() {
      disptach({ type: ActionKind.ShowAlert });
      ctxClearAlert();
    },

    async registerUser(user) {
      console.log(user);
    },
  };

  return (
    <AppContext.Provider value={{ ...state, ...stateMethods }}>
      {props.children}
    </AppContext.Provider>
  );
};

// custom hook
export const useAppContext = () => {
  const ctx = useContext(AppContext);

  // Necessary 'IF' if no def. value is provided above
  if (!ctx) {
    throw new Error("Component beyond AppContext"); // this solves syntax problems !!
  }

  return ctx;
};
