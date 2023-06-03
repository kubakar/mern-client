import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { filterSortType } from "../context/jobReducer";
import { useApi } from "../utils/hooks";
import LoadingLocal from "./LoadingLocal";
import { jobType } from "../utils/types";
import Job, { deleteFunction } from "../components/Job";
import JobAddEditForm from "./JobAddEditForm";
import Modal from "./Modal";
import { debounce } from "../utils/misc";
import PageBtnContainer from "./PageBtnContainer";
import { useJobContext } from "../context/jobContext";

const Wrapper = styled.section`
  /* spinner relation */
  position: relative;
  min-height: 300px; // spinner glitch

  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 992px) {
    .jobs {
      /* display: grid; */
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
`;

type jobsType = {
  jobs: jobType[];
  count: number;
  pages: number;
};

type Props = {};

const renderJobs = (
  data: jobsType,
  editCallback: Function,
  deleteCallback: deleteFunction
) => {
  const { count, jobs } = data;

  return jobs.length ? (
    <div className="jobs">
      <h5>{`${count} job${count && "s"} found`}</h5>
      <hr />
      {jobs.map((job) => (
        <Job
          job={job}
          key={job._id}
          onEdit={editCallback}
          onDelete={deleteCallback}
        />
      ))}
    </div>
  ) : (
    <h2>No Jobs...</h2>
  );
};

const JobContainer: React.FC<Props> = () => {
  const { displayAlert, axiosWithToken } = useAppContext();

  const { jobFilterOptions, updatejobFilterOptions } = useJobContext();

  const [modalVisible, showModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<jobType>();

  // const toggleModal = useCallback(() => showModal((prev) => !prev), []);
  const toggleModal = () => showModal((prev) => !prev);

  const openModal = useCallback((job: jobType) => {
    showModal(true);
    setSelectedJob(job);
  }, []);

  type ApiCallType = (
    search: filterSortType["search"],
    type: filterSortType["type"],
    status: filterSortType["status"],
    sort: filterSortType["sort"],
    page: filterSortType["page"],
    limit: filterSortType["limit"]
  ) => Promise<any>;

  const getJobs: ApiCallType = async (
    search,
    type,
    status,
    sort,
    page,
    limit
  ) =>
    axiosWithToken.get(`/api/job`, {
      params: {
        ...(search && { search }),
        ...(type && type !== "all" && { type }),
        ...(status && status !== "all" && { status }),
        ...(sort && { sort: sort.replace(/-| /g, "") }), // delete space and dash ("a - z" => "az")
        // https://stackoverflow.com/questions/16576983/replace-multiple-characters-in-one-replace-call
        ...(page && { page }),
        ...(limit && { limit }),
      },
    }); // custom axios instance

  const [apiData, apiError, apiLoading, apiCall, apiDataSetter] = useApi<
    jobsType,
    ApiCallType
  >(getJobs);

  // usage without custom hook
  const deleteJob: deleteFunction = (id, setter) => {
    setter(true);
    console.log(id);
    axiosWithToken
      .delete(`/api/job/${id}`)
      .then(() => {
        // update the UI state
        apiDataSetter((prev) => {
          if (!prev) return prev; // if undefined
          const newJobs = [...prev.jobs].filter((j) => j._id !== id); // delete JOB
          return { ...prev, jobs: newJobs, count: prev.count - 1 }; // ??
        });
      })
      .catch((e) => {
        console.log(e);
        displayAlert(e.response.data.msg);
      })
      .finally(() => setter(false));
  };

  const { search, type, status, sort, page, limit } = jobFilterOptions;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceApiCall = useCallback(debounce(apiCall), []); // useCallback is crucial !!

  // 1. get jobs (init & dropdown changes)
  useEffect(() => {
    apiCall(search, type, status, sort, page, limit);
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

  useEffect(() => {
    if (apiError) displayAlert("Jobs cannot be fetched.");
  }, [apiError, displayAlert]);

  const jobsCallback = useCallback(() => {
    showModal(false);
    apiCall(search, type, status, sort, page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, type, status, sort, page]);

  console.log("Jobs");

  return (
    <Wrapper>
      {modalVisible && ( // this will not be re-rendered now
        <Modal visible={true} onChange={toggleModal}>
          <JobAddEditForm
            initValues={selectedJob}
            isEditing
            callback={jobsCallback}
          />
        </Modal>
      )}
      {apiLoading && <LoadingLocal clear />}
      {apiData && renderJobs(apiData, openModal, deleteJob)}
      {apiData && apiData.pages > 1 && (
        <PageBtnContainer
          pages={apiData.pages}
          onPageChange={
            (newPage: number) =>
              updatejobFilterOptions({ ...jobFilterOptions, page: newPage })
            // this will update ctx data and listeners will react upon (api call triggered in 'JobContainer' and button updated in 'PageBtnContainer')
          }
        />
      )}
    </Wrapper>
  );
};
export default JobContainer;
