import styled from "styled-components";
import SearchContainer from "../../components/SearchContainer";
import JobContainer from "../../components/JobContainer";

const Wrapper = styled.section``;

type Props = {};

const AllJobs: React.FC<Props> = () => {
  return (
    <Wrapper>
      <h1>All Jobs</h1>
      <SearchContainer />
      <JobContainer />
    </Wrapper>
  );
};

export default AllJobs;
