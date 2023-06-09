import SearchContainer from "../../components/SearchContainer";
import { useCallback, useEffect, useRef, useState, Fragment } from "react";
import { debounce } from "../../utils/misc";
import PageBtnContainer from "../../components/PageBtnContainer";
import { filterSortType, jobsType } from "./AllJobs";

export const statusOptions = ["all", "interview", "declined", "pending"];
export const typeOptions = [
  "all",
  "full-time",
  "part-time",
  "remote",
  "internship",
];
export const sortOptions = ["latest", "oldest", "a - z", "z - a"];

export const initialState: filterSortType = {
  search: null, // set to null because of excluding initial render execution (debounce check)
  sort: sortOptions[0],
  status: statusOptions[0],
  type: typeOptions[0],
  page: null,
};

type Props = {
  children: React.ReactNode;
  apiCall: Function;
  apiData: jobsType | undefined;
};

const SearchAndPaginationWrapper: React.FC<Props> = ({
  children,
  apiData,
  apiCall,
}) => {
  const [formValues, setFormValues] = useState<filterSortType>(initialState);

  const { search, type, status, sort, page } = formValues;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceApiCall = useCallback(debounce(apiCall), []); // useCallback is crucial !!

  // 1. get jobs (init & dropdown changes)
  useEffect(() => {
    apiCall(search, type, status, sort, page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, status, sort, page]); // TEST

  // 2. get jobs (searchbox changes without initial render => null on init)
  const firstRender = useRef(false);
  useEffect(() => {
    if (search != null && firstRender.current)
      debounceApiCall(search, type, status, sort);

    firstRender.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Fragment>
      <h1>All Jobs</h1>
      <SearchContainer formValues={formValues} setFormValues={setFormValues} />

      {children}
      {/* JOBS CONTAINER */}

      {apiData && apiData.pages > 1 && (
        <PageBtnContainer
          apiPage={formValues.page}
          pages={apiData.pages}
          onPageChange={(newPage: number) =>
            setFormValues((prev) => ({ ...prev, page: newPage }))
          }
        />
      )}
    </Fragment>
  );
};

export default SearchAndPaginationWrapper;
