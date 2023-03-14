import React, { useState } from "react";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterPage";

// import styles from "./Landing.module.css";

type Props = {};

type formType = {
  name: string;
  email: string;
  password: string;
  isMember: boolean;
};

const initialState: formType = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register: React.FC<Props> = (props) => {
  const [formValues, setFormValues] = useState<formType>(initialState);
  // global state and useNavigate

  const handleChange = (e: React.FormEvent) => {
    console.log(e.target);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} action="" className="form">
        <Logo />
        <h3>Login</h3>
      </form>
    </Wrapper>
  );
};

export default Register;
