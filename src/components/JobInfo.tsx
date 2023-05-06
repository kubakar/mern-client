import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .tag {
    border-radius: var(--borderRadius);
    padding: 0.2rem 0.5rem;
  }

  .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
`;

type Props = {
  icon: React.ReactNode;
  text: string;
};

const JobInfo: React.FC<Props> = ({ icon, text }) => {
  // const {} = useAppContext();

  const statusOptions = ["interview", "declined", "pending"];
  const appliedStyle = statusOptions.includes(text) ? text : null;

  return (
    <Wrapper>
      {icon}
      <div className={`tag ${appliedStyle}`}>{text}</div>
    </Wrapper>
  );
};
export default JobInfo;
