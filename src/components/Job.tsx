import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { jobType } from "../utils/types";
import moment from "moment";
import JobInfo from "./JobInfo";
import { Navigation, Briefcase, Calendar, Info } from "react-feather";
import LoadingLocal from "./LoadingLocal";

const Wrapper = styled.div`
  /* spinner relation */
  position: relative;

  background: var(--white);
  border-radius: var(--borderRadius);
  /* display: grid; */
  /* grid-template-rows: 1fr auto; */
  box-shadow: var(--shadow-2);

  .header {
    padding: 1rem;

    border-bottom: 1px solid var(--grey-100);

    display: flex;
    gap: 1rem;
    text-transform: capitalize;
  }

  .header-letter {
    background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;

    color: var(--white);
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
  }

  h5 {
    margin-bottom: 0.25rem;
    /* font-weight: 700; */
  }
  p {
    margin: 0;
    text-transform: capitalize;
    color: var(--grey-400);
    letter-spacing: var(--letterSpacing);
  }

  .pane {
    padding: 1rem;
  }

  .pane-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 1rem;
    margin-bottom: 1rem;
  }

  .pane-buttons {
  }

  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);
  }
`;

type deleteFunction = (
  id: string,
  setter: Dispatch<SetStateAction<boolean>>
) => Promise<any>;

type Props = {
  job: jobType;
  onEdit: Function;
  onDelete: deleteFunction;
};

const Job: React.FC<Props> = ({ job, onEdit, onDelete }) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false); // optional

  const handleEdit = (id: string) => {
    console.log("EDIT " + id);

    onEdit(job); // pass selected job data
    // onEdit((prev: any) => ({ ...prev, jobs: [] })); ??
  };

  const handleDelete = (id: string) => {
    // handle api here and then refresh state
    onDelete(id, setDeleteLoading);
  };

  const date = moment(job.createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      {deleteLoading && <LoadingLocal />}

      <div className="header">
        <div className="header-letter">{job.company.slice(0, 1)}</div>
        <div>
          <h5>{job.company}</h5>
          <p>{job.position}</p>
        </div>
      </div>
      <div className="pane">
        <div className="pane-info">
          <JobInfo icon={<Navigation />} text={job.location} />
          <JobInfo icon={<Briefcase />} text={job.status} />
          <JobInfo icon={<Calendar />} text={date} />
          <JobInfo icon={<Info />} text={job.type} />
        </div>
        <div className="pane-buttons">
          <button className="btn edit-btn" onClick={() => handleEdit(job._id!)}>
            Edit
          </button>
          <button
            className="btn delete-btn"
            onClick={() => handleDelete(job._id!)}
          >
            Delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
export default Job;
