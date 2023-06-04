import styled from "styled-components";
import SearchContainer from "../../components/SearchContainer";
import JobContainer from "../../components/JobContainer";
import { useAppContext } from "../../context/appContext";
import { useApi } from "../../utils/hooks";
import { jobType } from "../../utils/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../../utils/misc";
import LoadingLocal from "../../components/LoadingLocal";
import PageBtnContainer from "../../components/PageBtnContainer";

const statusOptions = ["all", "interview", "declined", "pending"];
const typeOptions = ["all", "full-time", "part-time", "remote", "internship"];
const sortOptions = ["latest", "oldest", "a - z", "z - a"];

export type filterSortType = {
  search: string | null;
  status: string;
  type: string;
  sort: string;
  page: number | null;
  // limit: number | null;
};

export const initialState: filterSortType = {
  search: null, // set to null because of excluding initial render execution (debounce check)
  sort: sortOptions[0],
  status: statusOptions[0],
  type: typeOptions[0],
  page: null,
};

export type jobsType = {
  jobs: jobType[];
  count: number;
  pages: number;
};

type ApiCallType = (
  search: filterSortType["search"],
  type: filterSortType["type"],
  status: filterSortType["status"],
  sort: filterSortType["sort"],
  page: filterSortType["page"]
) => Promise<any>;

const Wrapper = styled.section``;

type Props = {};

const AllJobs: React.FC<Props> = () => {
  const { axiosWithToken, displayAlert } = useAppContext();
  const [formValues, setFormValues] = useState<filterSortType>(initialState);

  const getJobs: ApiCallType = async (search, type, status, sort, page) =>
    axiosWithToken.get(`/api/job`, {
      params: {
        ...(search && { search }),
        ...(type && type !== "all" && { type }),
        ...(status && status !== "all" && { status }),
        ...(sort && { sort: sort.replace(/-| /g, "") }), // delete space and dash ("a - z" => "az")
        // https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call
        ...(page && { page }),
        // ...(limit && { limit }),
      },
    }); // custom axios instance

  const [apiData, apiError, apiLoading, apiCall, apiDataSetter] = useApi<
    jobsType,
    ApiCallType
  >(getJobs);

  useEffect(() => {
    if (apiError) displayAlert("Jobs cannot be fetched.");
  }, [apiError, displayAlert]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceApiCall = useCallback(debounce(apiCall), []); // useCallback is crucial !!

  const { search, type, status, sort, page } = formValues;

  // 1. get jobs (init & dropdown changes)
  useEffect(() => {
    apiCall(search, type, status, sort, page);

    // ??
    // Maybe formValues can be send to SEARCHBOX alongside with apiCall (executed automatically when field changed)
    // ??

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

  // console.log("ALL JOBS");

  const jobsCallback = useCallback(
    (anotherCallback: Function) => {
      anotherCallback(); // showModal(false); is passed
      apiCall(search, type, status, sort, page);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, type, status, sort, page]
  );

  return (
    <Wrapper>
      {apiLoading && <LoadingLocal clear />}
      <h1>All Jobs</h1>
      <SearchContainer formValues={formValues} setFormValues={setFormValues} />
      {apiData && (
        <JobContainer
          apiCall={jobsCallback}
          apiDataSetter={apiDataSetter}
          apiData={apiData}
        />
      )}

      {/* PROBLEM : when dropdown is changed - jobContainer rerenders also (before http hook) */}

      {apiData && apiData.pages > 1 && (
        <PageBtnContainer
          apiPage={page}
          pages={apiData.pages}
          onPageChange={
            (newPage: number) =>
              setFormValues((prev) => ({ ...prev, page: newPage }))
            // this will update ctx data and listeners will react upon (api call triggered in 'JobContainer' and button updated in 'PageBtnContainer')
          }
        />
      )}
    </Wrapper>
  );
};

export default AllJobs;
