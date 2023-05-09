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

  /* global center alert */
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90vw;
  top: 1rem;
  z-index: 100;
`;

type Props = {};

// https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div?page=1&tab=scoredesc#tab-top

const AlertGlobal: React.FC<Props> = () => {
  const { alertText, alertType } = useAppContext();

  return <Wrapper className={`alert alert-${alertType}`}>{alertText}</Wrapper>;
};
export default AlertGlobal;
