import React, {
  useContext,
  createContext,
  useReducer,
  useCallback,
} from "react";
import reducer from "./jobReducer";
import { State, ActionKind } from "./jobReducer";

const initialState: State = {
  jobFilterOptions: {
    search: null,
    type: "all",
    sort: "latest",
    status: "all", // having init values identical as init values from searchbox (that will write query) will render page only once (not twice)
    limit: null,
    page: null,
  },
};

type StateMethods = {
  updatejobFilterOptions: (jobFilterOptions: Object) => void;
  // https://www.typescriptlang.org/docs/handbook/utility-types.html
  // registerUser: (user: Record<string, string>) => void;
};

const JobContext = createContext<(State & StateMethods) | undefined>(undefined);

type AppProviderProps = {
  children: React.ReactNode;
};

export const JobContextProvider: React.FC<AppProviderProps> = (props) => {
  // reducer
  const [state, disptach] = useReducer(reducer, initialState);

  const stateMethods: StateMethods = {
    // new method
    updatejobFilterOptions: useCallback((filters) => {
      disptach({ type: ActionKind.UpdateJobFilter, payload: filters });
    }, []),
  };

  return (
    <JobContext.Provider value={{ ...state, ...stateMethods }}>
      {props.children}
    </JobContext.Provider>
  );
};

// custom hook
export const useJobContext = () => {
  const ctx = useContext(JobContext);

  // Necessary 'IF' if no def. value is provided above
  if (!ctx) {
    throw new Error("Component beyond JobContext"); // this solves syntax problems !!
  }

  return ctx;
};
