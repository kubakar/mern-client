// import { useEffect } from "react";

import { useAppContext } from "../../context/appContext";
import styled from "styled-components";
import SearchContainer from "../../components/SearchContainer";
import JobContainer from "../../components/JobContainer";

const Wrapper = styled.section``;

type Props = {};

const AllJobs: React.FC<Props> = () => {
  const { displayAlert } = useAppContext();

  return (
    <Wrapper>
      <h1>All Jobs</h1>
      <SearchContainer />
      <JobContainer />
    </Wrapper>
  );
};

export default AllJobs;
