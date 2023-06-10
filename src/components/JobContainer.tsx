import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { jobType } from "../utils/types";
import Job, { deleteFunction, editFunction } from "../components/Job";
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
  apiDataSetter: Dispatch<SetStateAction<jobsType | undefined>>;
  apiData: jobsType;
};

const renderJobs = (
  data: jobsType,
  editCallback: editFunction,
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

const JobContainer: React.FC<Props> = ({ apiDataSetter, apiData }) => {
  const { displayAlert, apiAxios } = useAppContext();

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
    apiAxios
      .delete(`/job/${id}`)
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

  const editJob: editFunction = (updatedJob) => {
    showModal(false);

    // update the UI state
    apiDataSetter((prev) => {
      if (!prev) return prev; // if undefined
      const newJobs = [...prev.jobs].map((j) =>
        j._id !== updatedJob._id ? j : updatedJob
      ); // delete JOB
      return { ...prev, jobs: newJobs }; // ??
    });
  };

  console.log("Jobs");

  return (
    <Wrapper>
      {modalVisible && ( // this will not be re-rendered now
        <Modal visible={true} onChange={toggleModal}>
          <JobAddEditForm
            initValues={selectedJob}
            isEditing
            callback={(newJob: jobType) => {
              editJob(newJob);

              // THIS WILL STAY EVEN IF FILTER IS CHANGED !!
            }}
          />
        </Modal>
      )}

      {renderJobs(apiData, openModal, deleteJob)}
    </Wrapper>
  );
};
export default JobContainer;
// export default React.memo(JobContainer);
