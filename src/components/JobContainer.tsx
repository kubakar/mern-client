import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { useApi } from "../utils/hooks";
import LoadingLocal from "./LoadingLocal";
import { jobType } from "../utils/types";
import Job from "../components/Job";

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

const renderJobs = (data: jobsType) => {
  const { count, jobs } = data;

  if (!jobs) return "No";

  return jobs.length ? (
    <div className="jobs">
      <h5>{`${count} job${count && "s"} found`}</h5>
      <hr />
      {jobs.map((job) => (
        <Job job={job} key={job._id} />
      ))}
    </div>
  ) : (
    <h2>No Jobs...</h2>
  );
};

const JobContainer: React.FC<Props> = () => {
  const { displayAlert, axiosWithToken } = useAppContext();

  const getJobs = async () => axiosWithToken.get(`/api/job`); // custom axios instance

  const [apiData, apiError, apiLoading, apiCall] = useApi<jobsType>(getJobs);

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiData) {
      console.log(apiData);
    }
    if (apiError) displayAlert(apiError.data.msg);
  }, [apiData, apiError, displayAlert]);

  return (
    <Wrapper>
      {apiLoading && <LoadingLocal clear />}
      {apiData && renderJobs(apiData)}
    </Wrapper>
  );
};
export default JobContainer;
