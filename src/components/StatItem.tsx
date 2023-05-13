import React, { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--white);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }

  .icon {
    color: ${(props) => props.color};
  }
`;

type Props = {
  title: string;
  count: number;
  icon: ReactElement;
  // status: "pending" | "interview" | "declined";
  status: string;
};

const StatItem: React.FC<Props> = ({ title, count, icon, status }) => {
  return (
    <Wrapper color={status}>
      <header>
        <div className="count">{count}</div>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
};
export default StatItem;
