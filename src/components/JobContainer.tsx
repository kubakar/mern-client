import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useApi } from "../utils/hooks";
import LoadingLocal from "./LoadingLocal";
import { jobType } from "../utils/types";
import Job from "../components/Job";
import EditJob from "./EditJob";
import JobAddEditForm from "./JobAddEditForm";

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
};

type Props = {};

type deleteFunction = (
  id: string,
  setter: Dispatch<SetStateAction<boolean>>
) => Promise<any>;

const renderJobs = (
  data: jobsType,
  editCallback: Function,
  deleteCallback: deleteFunction
) => {
  const { count, jobs } = data;

  if (!jobs) return "No";

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

  const [modalVisible, showModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<jobType>();

  const toggleSideBar = useCallback(() => showModal((prev) => !prev), []);

  const openModal = useCallback((job: jobType) => {
    showModal(true);
    setSelectedJob(job);
  }, []);

  const getJobs = async () => axiosWithToken.get(`/api/job`); // custom axios instance

  const [apiData, apiError, apiLoading, apiCall, apiDataSetter] =
    useApi<jobsType>(getJobs);

  // usage without custom hook
  const deleteJob: deleteFunction = async (id, setter) => {
    setter(true);
    console.log(id);
    axiosWithToken
      .delete(`/api/job/${id}`)
      .then(() => {
        // update the UI state
        apiDataSetter((prev) => {
          if (!prev) return prev; // if undefined
          const newJobs = [...prev.jobs].filter((j) => j._id !== id); // delete JOB
          return { ...prev, jobs: newJobs };
        });
      })
      .catch((e) => {
        console.log(e);
        displayAlert(e.response.data.msg);
      })
      .finally(() => setter(false));
  };

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiError) displayAlert(apiError.data.msg);
  }, [apiError, displayAlert]);

  const jobsCallback = useCallback(() => {
    showModal(false);
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <EditJob visible={modalVisible} onChange={toggleSideBar}>
        <JobAddEditForm
          initValues={selectedJob}
          isEditing
          callback={jobsCallback}
        />
      </EditJob>

      {apiLoading && <LoadingLocal clear />}
      {apiData && renderJobs(apiData, openModal, deleteJob)}
    </Wrapper>
  );
};
export default JobContainer;
