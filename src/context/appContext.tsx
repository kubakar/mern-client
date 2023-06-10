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

const getApiAxios = (logoutUserMethod: VoidFunction) => {
  // axios instance setup
  const apiAxios = axios.create({
    baseURL: "api/",
    // headers: { Authorization: `Bearer ${token}` }, // token is now in the cookie
  });

  // handle these call with interceptors
  apiAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        console.log("!! AUTH ERROR !!");
        logoutUserMethod();
      }
      return Promise.reject(error);
    }
  );

  return apiAxios;
};

// get values from local storage
// token is no longer necessary (is stored in the cookie)
const user = localStorage.getItem("user");
const location = localStorage.getItem("location");

const initialState: State = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  userLocation: location ?? "",
  jobLocation: location ?? "",
};

type StateMethods = {
  displayAlert: (text: string, type?: string) => void;
  loginUpdateUser: (user: UserResponse) => void; // also used to update user

  logoutUser: () => void;
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  // registerUser: (user: Record<string, string>) => void;
};

type StateUtils = {
  apiAxios: AxiosInstance;
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

    // also used to update user
    loginUpdateUser: useCallback((currentUser) => {
      const { user } = currentUser;

      console.log(document.cookie); // not visible since cookie is 'httpOnly'

      disptach({
        type: ActionKind.LoginUser,
        payload: { user, location: user.location },
      });

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("location", user.location);
      // token no longer set
    }, []),

    logoutUser() {
      // call server to return/set expired cookie
      apiAxios
        .get("auth/logout")
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          disptach({ type: ActionKind.LogoutUser, payload: {} });
          ctxRemoveUserToLocalStorage(["user", "location"]);
        });
    },
  };

  // axios instance with token
  const apiAxios = getApiAxios(stateMethods.logoutUser);
  const stateUtils: StateUtils = {
    apiAxios,
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
