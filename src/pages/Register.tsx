import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";
import { useApi } from "../utils/hooks";
import LoadingLocal from "../components/LoadingLocal";
import { UserResponse } from "../utils/types";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  /* override => margin: 3rem auto; @ .form */
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .form {
    border-top: 5px solid var(--primary-500);
    /* spinner relation */
    position: relative;
  }
  .btn {
    margin-top: 1rem;
  }
  h3,
  p {
    text-align: center;
  }
`;

type Props = {};

type formType = {
  name: string;
  email: string;
  password: string;
};

const initialState: formType = {
  name: "",
  email: "",
  password: "",
};

const Register: React.FC<Props> = () => {
  const [formValues, setFormValues] = useState<formType>(initialState);
  const [isMember, setIsMember] = useState<boolean>(true);

  // global state and useNavigate
  const navigate = useNavigate();
  const { user, displayAlert, loginUpdateUser } = useAppContext();

  type ApiCallType = (currentUser: formType, login: boolean) => Promise<any>;

  const setupUser: ApiCallType = async (currentUser, login) => {
    const path = login ? "login" : "register";
    return axios.post(`/api/auth/${path}`, currentUser);
  };

  const [apiData, apiError, apiLoading, apiCall] = useApi<
    UserResponse,
    ApiCallType
  >(
    setupUser, // setup call with GENERIC also?
    true
  );

  useEffect(() => {
    if (apiData) {
      if (apiData.token) {
        console.log("TOKEN !!");
        displayAlert("User Logged In! Redirecting...", "success");
        loginUpdateUser(apiData); // proceed with global state changed (token received)
      } else {
        console.log("NO ... TOKEN !!");
        displayAlert("User Created!", "success");
        setIsMember(true); // go to 'Login' form
      }
    }
    if (apiError) displayAlert(apiError.data.msg);
  }, [apiData, apiError, displayAlert, loginUpdateUser]);

  // redirect to other page if user is seeded to context ()
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  // other methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMember = () => setIsMember((prev) => !prev);

  const validateInput = (data: formType, login: boolean): boolean => {
    const { name, email, password } = data;

    if (!(email && password && (name || login))) {
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInput(formValues, isMember))
      return displayAlert("Please provide all values");

    setFormValues(initialState);
    apiCall(formValues, isMember); // login / register is handled above
  };

  const getActionNames = (login: boolean) =>
    login ? ["Login", "Not a member yet?"] : ["Register", "Already a member?"];

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} action="" className="form">
        {/* absolute spinner relative to form box */}
        {apiLoading && <LoadingLocal />}

        <Logo />
        <h3>{getActionNames(isMember)[0]}</h3>
        {[
          // render first input conditionally
          ...(!isMember ? [{ name: "name", type: "text" }] : []),
          { name: "email", type: "email" },
          { name: "password", type: "password" },
        ].map(({ name, type }) => {
          return (
            <FormRow
              key={`key-${name}`}
              name={name}
              type={type}
              // omit prop from obj type
              // https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
              // value={formValues[name as keyof Omit<formType, "isMember">]} (previous solution)
              value={formValues[name as keyof formType]}
              handleChange={handleChange}
            />
          );
        })}
        <button type="submit" className="btn btn-block" disabled={apiLoading}>
          Submit
        </button>
        <p>
          {getActionNames(isMember)[1]}
          <button type="button" onClick={toggleMember} className="btn-link">
            {getActionNames(!isMember)[0]}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

// LINKS
// https://www.webtips.dev/solutions/get-form-values-on-submit-in-react
