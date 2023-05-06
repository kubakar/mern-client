import React from "react";
import styled from "styled-components";

type Props = {
  clear?: boolean;
};

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */

  min-width: 100%;
  min-height: 100%;

  /* background-color: rgba(0, 0, 0, 0.5); */

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// https://stackoverflow.com/questions/1776915/how-can-i-center-an-absolutely-positioned-element-in-a-div?page=1&tab=scoredesc#tab-top

const AlertGlobal: React.FC<Props> = ({ clear }) => {
  return (
    <Wrapper
      style={{ ...(!clear && { backgroundColor: "rgba(0, 0, 0, 0.5)" }) }}
    >
      <div className="loading"></div>
    </Wrapper>
  );
};
export default AlertGlobal;
