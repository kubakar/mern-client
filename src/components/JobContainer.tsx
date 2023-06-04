import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { jobType } from "../utils/types";
import Job, { deleteFunction } from "../components/Job";
import JobAddEditForm from "./JobAddEditForm";
import Modal from "./Modal";
import { jobsType } from "../pages/dashboard/AllJobs";

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

type Props = {
  apiCall: (anotherCallback: Function) => void;
  apiDataSetter: Function;
  apiData: jobsType;
};

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

const JobContainer: React.FC<Props> = ({ apiCall, apiDataSetter, apiData }) => {
  const { displayAlert, axiosWithToken } = useAppContext();

  const [modalVisible, showModal] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<jobType>();

  // const toggleModal = useCallback(() => showModal((prev) => !prev), []);
  const toggleModal = () => showModal((prev) => !prev);

  const openModal = useCallback((job: jobType) => {
    showModal(true);
    setSelectedJob(job);
  }, []);

  // usage without custom hook
  const deleteJob: deleteFunction = (id, setter) => {
    setter(true);
    console.log(id);
    axiosWithToken
      .delete(`/api/job/${id}`)
      .then(() => {
        // update the UI state
        apiDataSetter((prev: any) => {
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

  console.log("Jobs");

  return (
    <Wrapper>
      {modalVisible && ( // this will not be re-rendered now
        <Modal visible={true} onChange={toggleModal}>
          <JobAddEditForm
            initValues={selectedJob}
            isEditing
            callback={() => apiCall(() => showModal(false))}
          />
        </Modal>
      )}

      {/* {apiData && renderJobs(apiData, openModal, deleteJob)} */}
      {renderJobs(apiData, openModal, deleteJob)}
    </Wrapper>
  );
};
export default JobContainer;
