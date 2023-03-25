import React, { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import { State, ActionKind } from "./reducer";

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  displayAlert: () => {},
};

const AppContext = createContext<State | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppProviderProps> = (props) => {
  // const [data, setData] = useState<AppContextType>(initialState);

  // reducer
  const [state, disptach] = useReducer(reducer, initialState);

  // dispatch methods
  const displayAlert: VoidFunction = () => {
    disptach({ type: ActionKind.ShowAlert });

    clearAlert(); // clear automatically after delay
  };

  const clearAlert: VoidFunction = () => {
    setTimeout(() => {
      disptach({ type: ActionKind.ClearAlert });
    }, 2000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
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
