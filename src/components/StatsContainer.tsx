import React from "react";
import styled from "styled-components";
import StatItem from "./StatItem";
import { StatsType } from "../pages/dashboard/Stats";
import { LogOut, CheckSquare, Clock } from "react-feather";
import { themeJobs } from "../context/theme";

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

type Props = {
  stats: StatsType["stats"];
};

const StatsContainer: React.FC<Props> = ({ stats }) => {
  const defStats = [
    {
      title: "pending applications",
      count: stats.pending,
      status: themeJobs.pending.color,
      icon: <Clock size={48} />,
    },
    {
      title: "interviews scheduled",
      count: stats.interview,
      status: themeJobs.interview.color,
      icon: <CheckSquare size={48} />,
    },
    {
      title: "jobs declined",
      count: stats.declined,
      status: themeJobs.declined.color,
      icon: <LogOut size={48} />,
    },
  ];

  return (
    <Wrapper>
      {defStats.map((s) => (
        <StatItem
          count={s.count}
          title={s.title}
          key={s.title}
          icon={s.icon}
          status={s.status}
        />
      ))}
    </Wrapper>
  );
};
export default StatsContainer;
