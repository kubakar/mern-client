// import React from "react";

import { User } from "../utils/types";

export type filterSortType = {
  search: string | null;
  status: string;
  type: string;
  sort: string;
  page: number | null;
  limit: number | null;
};

export type State = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
  user: User | null;
  token: string | null;
  userLocation: string;
  jobLocation: string; // ?
  jobFilterOptions: filterSortType;
};

// const initialCounterState: State = {
//   value: 0,
// };

export enum ActionKind {
  ShowAlert,
  ClearAlert,
  ShowLoading,
  LoginUser,
  LogoutUser,
  UpdateJobFilter,
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

    case ActionKind.LogoutUser:
      return {
        isLoading: false,
        showAlert: false,
        alertText: "",
        alertType: "",
        user: null,
        token: null,
        userLocation: "",
        jobLocation: "",
        jobFilterOptions: {
          search: null,
          type: "",
          sort: "",
          status: "",
          limit: null,
          page: null,
        },
      };

    case ActionKind.UpdateJobFilter:
      const { search, type, status, sort, page, limit } = payload;

      console.log("UpdateJobFilter...");

      return {
        ...state,
        jobFilterOptions: { search, type, status, sort, page, limit },
      };

    default:
      throw new Error(`no such dispatch action : ${action.type}`);
  }
};

export default reducer;
