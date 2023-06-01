import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
} from "react";
import reducer from "./reducer";
import { State, ActionKind } from "./reducer";
import axios, { AxiosInstance } from "axios";
import { UserResponse } from "../utils/types";

const getAxiosWithToken = (token: string, logoutUserMethod: VoidFunction) => {
  // axios setup
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  // handle these call with interceptors
  axiosWithToken.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log("!! AUTH ERROR !!");
        logoutUserMethod();
      }
      return Promise.reject(error);
    }
  );

  return axiosWithToken;
};

// get values from local storage
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: location ?? "",
  jobLocation: location ?? "",
  // new field
  jobFilterOptions: {
    search: null,
    type: "",
    sort: "",
    status: "",
    limit: null,
    page: null,
  },
};

type StateMethods = {
  displayAlert: (text: string, type?: string) => void;
  showLoading: (visible: boolean) => void;
  loginUpdateUser: (user: UserResponse) => void; // also used to update user

  logoutUser: () => void;
  updatejobFilterOptions: (jobFilterOptions: Object) => void;
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

    // also used to update user
    loginUpdateUser: useCallback((currentUser) => {
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
    // new method
    updatejobFilterOptions: useCallback((filters) => {
      disptach({ type: ActionKind.UpdateJobFilter, payload: filters });
    }, []),
  };

  // axios instance with token
  const axiosWithToken = getAxiosWithToken(
    state.token || "",
    stateMethods.logoutUser
  );
  const stateUtils: StateUtils = {
    axiosWithToken,
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
