import React from "react";
import styled from "styled-components";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart as Chart,
} from "recharts";
import { theme } from "../context/theme";

const Wrapper = styled.div``;

type Props = {
  applications: { date: string; count: number }[];
};

const AreaChart: React.FC<Props> = ({ applications }) => {
  return (
    <ResponsiveContainer height={300}>
      {/* <Chart data={applications}> */}
      <Chart data={applications}>
        <CartesianGrid strokeDasharray="3"></CartesianGrid>
        <XAxis dataKey={"date"}></XAxis>
        <YAxis dataKey={"count"}></YAxis>
        <Tooltip />
        <Area
          type="monotone"
          dataKey={"count"}
          fill={theme.primary.color500}
        ></Area>
      </Chart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
