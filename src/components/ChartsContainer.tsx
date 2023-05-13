import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import { StatsType } from "../pages/dashboard/Stats";

// const Wrapper = styled.div`
//   /* spinner relation */
//   position: relative;
// `;

const Wrapper = styled.section`
  margin-top: 4rem;
  /* text-align: center; */
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

type Props = {
  applications: StatsType["monthlyApplications"];
};

const ChartsContainer: React.FC<Props> = ({ applications }) => {
  const {} = useAppContext();

  return (
    <Wrapper>
      <AreaChart applications={applications} />
      {/* <BarChart applications={applications} /> */}
    </Wrapper>
  );
};
export default ChartsContainer;
