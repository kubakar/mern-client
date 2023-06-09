import JobContainer from "../../components/JobContainer";
import { useAppContext } from "../../context/appContext";
import { useApi } from "../../utils/hooks";
import { jobType } from "../../utils/types";
import { useEffect } from "react";
import LoadingLocal from "../../components/LoadingLocal";
import SearchAndPaginationWrapper from "./SearchAndPaginationWrapper";

export type filterSortType = {
  search: string | null;
  status: string;
  type: string;
  sort: string;
  page: number | null;
  // limit: number | null;
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

type Props = {};

const AllJobs: React.FC<Props> = () => {
  const { axiosWithToken, displayAlert } = useAppContext();

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

  return (
    <section style={{ position: "relative" }}>
      {apiLoading && <LoadingLocal />}
      {/* {<LoadingLocal />} */}
      <SearchAndPaginationWrapper apiCall={apiCall} apiData={apiData}>
        {apiData && (
          <JobContainer apiDataSetter={apiDataSetter} apiData={apiData} />
        )}
      </SearchAndPaginationWrapper>
    </section>
  );
};

export default AllJobs;
