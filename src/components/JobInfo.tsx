import React from "react";
import styled from "styled-components";
import { themeJobs } from "../context/theme";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .tag {
    border-radius: var(--borderRadius);
    padding: 0.2rem 0.5rem;
  }
`;

type Props = {
  icon: React.ReactNode;
  text: string;
};

const JobInfo: React.FC<Props> = ({ icon, text }) => {
  const statusOptions = ["interview", "declined", "pending"];
  const appliedStyle = statusOptions.includes(text) ? text : null;

  return (
    <Wrapper>
      {icon}
      <div
        className={`tag`}
        style={{
          ...(appliedStyle && {
            color: themeJobs[appliedStyle as keyof typeof themeJobs].color,
            background:
              themeJobs[appliedStyle as keyof typeof themeJobs].background,
          }),
        }}
      >
        {text}
      </div>
    </Wrapper>
  );
};
export default JobInfo;
