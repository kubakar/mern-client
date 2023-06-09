import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart as Chart,
} from "recharts";
import { theme } from "../context/theme";

type Props = {
  applications: { date: string; count: number }[];
};

const BarChart: React.FC<Props> = ({ applications }) => {
  return (
    <ResponsiveContainer height={300}>
      {/* <Chart data={applications}> */}
      <Chart data={applications}>
        <CartesianGrid strokeDasharray="3"></CartesianGrid>
        <XAxis dataKey={"date"}></XAxis>
        <YAxis dataKey={"count"}></YAxis>
        <Tooltip />
        <Bar dataKey={"count"} fill={theme.primary.color500}></Bar>
      </Chart>
    </ResponsiveContainer>
  );
};

export default BarChart;
