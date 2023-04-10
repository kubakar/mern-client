import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */

  min-width: 100vw;
  min-height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

type Props = {};

// https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div?page=1&tab=scoredesc#tab-top

const AlertGlobal: React.FC<Props> = () => {
  return (
    <Wrapper>
      <div className="loading"></div>
    </Wrapper>
  );
};
export default AlertGlobal;
