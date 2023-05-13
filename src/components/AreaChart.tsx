import React from "react";
import styled from "styled-components";
import { StatsType } from "../pages/dashboard/Stats";
import moment from "moment";

const Wrapper = styled.div``;

type Props = {
  applications: StatsType["monthlyApplications"];
};

const AreaChart: React.FC<Props> = ({ applications }) => {
  const [month, year] = applications[0].date;

  const date = moment({ year, month: month - 1 }).format("MMM YYYY");
  console.log(month, year, date);

  return <Wrapper>AreaChart</Wrapper>;
};

export default AreaChart;
