import React, { useState } from "react";
import styled from "styled-components";
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";
import { StatsType } from "../pages/dashboard/Stats";
import moment from "moment";

// const Wrapper = styled.div`
//   /* spinner relation */
//   position: relative;
// `;

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  button {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

type Props = {
  applications: StatsType["monthlyApplications"];
};

const ChartsContainer: React.FC<Props> = ({ applications }) => {
  const [chartVisible, setChartVisible] = useState(false);

  // const [month, year] = applications[0].date;
  // const date = moment({ year, month: month - 1 }).format("MMM YYYY");
  // console.log(month, year, date);

  const formattedapplications = applications
    .map((a) => {
      const [month, year] = a.date;
      return {
        ...a,
        date: moment({ year, month: month - 1 }).format("MMM YYYY"),
      };
    })
    .slice(0, 6);

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => setChartVisible((prev) => !prev)}
        className="btn-link button"
      >
        {chartVisible ? "Area" : "Bar"}
      </button>
      {chartVisible ? (
        <AreaChart applications={formattedapplications} />
      ) : (
        <BarChart applications={formattedapplications} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
