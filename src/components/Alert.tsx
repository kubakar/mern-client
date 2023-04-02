import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Wrapper = styled.div`
  padding: 0.375rem 0.75rem;
  margin-bottom: 1rem;
  border-color: transparent;
  border-radius: var(--borderRadius);
  text-align: center;
  letter-spacing: var(--letterSpacing);
`;

type Props = {};

const Alert: React.FC<Props> = () => {
  const { alertText, alertType } = useAppContext();

  return <Wrapper className={`alert alert-${alertType}`}>{alertText}</Wrapper>;
};
export default Alert;
