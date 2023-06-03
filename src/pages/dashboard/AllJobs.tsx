import styled from "styled-components";
import SearchContainer from "../../components/SearchContainer";
import JobContainer from "../../components/JobContainer";
import { JobContextProvider } from "../../context/jobContext";

const Wrapper = styled.section``;

type Props = {};

const AllJobs: React.FC<Props> = () => {
  return (
    <Wrapper>
      <h1>All Jobs</h1>
      <JobContextProvider>
        <SearchContainer />
        <JobContainer />
      </JobContextProvider>
    </Wrapper>
  );
};

export default AllJobs;
