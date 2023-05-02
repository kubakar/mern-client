import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
} from "react";
import reducer from "./reducer";
import { State, ActionKind, User } from "./reducer";
import axios, { AxiosInstance } from "axios";

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
  loginUser: (user: UserResponse) => void; // also used to update user

  logoutUser: () => void;
  // updateUser: (user: UserResponse) => void; // TBD

  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  // registerUser: (user: Record<string, string>) => void;
};

type StateUtils = {
  axiosWithToken: AxiosInstance;
};

const AppContext = createContext<
  (State & StateMethods & StateUtils) | undefined
>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppContextProvider: React.FC<AppProviderProps> = (props) => {
  // reducer
  const [state, disptach] = useReducer(reducer, initialState);

  // axios setup
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${state.token}` },
  });

  // handle these call with interceptors
  axiosWithToken.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log("!! AUTH ERROR !!");
        stateMethods.logoutUser();
      }
      return Promise.reject(error);
    }
  );
  // =================

  const ctxClearAlert = () => {
    setTimeout(() => {
      disptach({ type: ActionKind.ClearAlert, payload: {} });
    }, 2000);
  };

  const ctxRemoveUserToLocalStorage = (items: string[]) => {
    items.forEach((item) => localStorage.removeItem(item));
  };

  const stateUtils: StateUtils = {
    axiosWithToken,
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

    // also used to update user
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

    // updateUser: useCallback((currentUser) => {}, []),

    logoutUser() {
      disptach({ type: ActionKind.LogoutUser, payload: {} });
      ctxRemoveUserToLocalStorage(["user", "location", "token"]);
    },
  };

  return (
    <AppContext.Provider value={{ ...state, ...stateMethods, ...stateUtils }}>
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
