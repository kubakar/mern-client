import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

type Props = {};

const Error: React.FC<Props> = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>This page does not exist</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
