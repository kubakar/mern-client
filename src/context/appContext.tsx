import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
} from "react";
import reducer from "./reducer";
import { State, ActionKind, User } from "./reducer";

// get values from local storage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

export interface UserResponse {
  token?: string;
  user: User;
}

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location ?? "",
  jobLocation: location ?? "",
};

type StateMethods = {
  displayAlert: (text: string, type?: string) => void;
  showLoading: (visible: boolean) => void;
  loginUser: (user: UserResponse) => void;
  logoutUser: () => void;
  // test: () => void;
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  // registerUser: (user: Record<string, string>) => void;
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
      disptach({ type: ActionKind.ClearAlert, payload: {} });
    }, 2000);
  };

  const ctxRemoveUserToLocalStorage = (items: string[]) => {
    items.forEach((item) => localStorage.removeItem(item));
  };

  const stateMethods: StateMethods = {
    displayAlert: useCallback((text, type) => {
      disptach({
        type: ActionKind.ShowAlert,
        payload: { text, type: type ?? "danger" },
      });
      ctxClearAlert();
    }, []),

    showLoading: useCallback((onOff) => {
      disptach({
        type: ActionKind.ShowLoading,
        payload: { visible: onOff.toString() },
      });
      ctxClearAlert();
    }, []),

    loginUser: useCallback((currentUser) => {
      const { user, token } = currentUser;

      disptach({
        type: ActionKind.LoginUser,
        payload: { user, token, location: user.location },
      });

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("location", user.location);
      localStorage.setItem("token", token!);
    }, []),

    logoutUser() {
      disptach({ type: ActionKind.LoginUser, payload: {} });
      ctxRemoveUserToLocalStorage(["user", "location", "token"]);
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
