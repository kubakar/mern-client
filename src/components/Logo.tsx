import React from "react";
import logo from "../assets/images/logo.svg";

type Props = {};

const Logo: React.FC<Props> = (props) => {
  return <img src={logo} alt="logo" className="logo" />;
};

export default Logo;
