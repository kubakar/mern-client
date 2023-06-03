export type filterSortType = {
  search: string | null;
  status: string;
  type: string;
  sort: string;
  page: number | null;
  limit: number | null;
};

export type State = {
  jobFilterOptions: filterSortType;
};

export enum ActionKind {
  UpdateJobFilter,
}

type Action = {
  type: ActionKind;
  payload: Record<string, any>; // any ??
};

const reducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
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
