import React from "react";

import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

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
