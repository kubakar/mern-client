import React from "react";
import styled from "styled-components";
import { StatsType } from "../pages/dashboard/Stats";

const Wrapper = styled.div``;

type Props = {
  applications: StatsType["monthlyApplications"];
};

const BarChart: React.FC<Props> = ({ applications }) => {
  return <Wrapper>BarChart</Wrapper>;
};

export default BarChart;
