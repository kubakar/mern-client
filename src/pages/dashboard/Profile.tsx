import React, { useState, useEffect } from "react";

import styled from "styled-components";
import FormRow from "../../components/FormRow";
import { UserResponse, useAppContext } from "../../context/appContext";
import { useApi } from "../../utils/hooks";
import LoadingLocal from "../../components/LoadingLocal";
// import Wrapper from "../../assets/wrappers/DashboardFormPage.js";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%; // overrides !
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    column-gap: 1rem;

    border-top: 5px solid var(--primary-500);
    /* spinner relation */
    position: relative;
  }
  .btn {
    margin-top: 1rem;
    grid-column: -1/1;
  }
`;

type Props = {};

type formType = {
  name: string;
  email: string;
  lastName: string;
  location: string;
};

const initialState: formType = {
  name: "",
  email: "",
  lastName: "",
  location: "",
};

const Register: React.FC<Props> = () => {
  const [formValues, setFormValues] = useState<formType>(initialState);

  const { user, displayAlert, loginUpdateUser, axiosWithToken } =
    useAppContext();

  useEffect(() => {
    if (user) {
      setFormValues({
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
      });
    }
  }, [user]); // populate form with user ctx at initial render

  // other methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = (data: formType): boolean => {
    const { name, email, lastName, location } = data;
    if (!(email && name && location && lastName)) return false;
    return true;
  };

  const updateUser = async (currentUser: formType) =>
    axiosWithToken.patch(`/api/auth/updateUser`, currentUser); // custom axios instance

  const [apiData, apiError, apiLoading, apiCall] = useApi<UserResponse>(
    updateUser,
    true
  );

  useEffect(() => {
    if (apiData?.token) {
      console.log(apiData);
      displayAlert("User Updated!", "success");
      loginUpdateUser(apiData); // proceed with global state changed (token received)
      // update ctx (works same as login)
    }
    if (apiError) displayAlert(apiError.data.msg);
  }, [apiData, apiError, displayAlert, loginUpdateUser]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput(formValues))
      return displayAlert("Please provide all values");

    // console.log(formValues);
    apiCall(formValues);
    // setFormValues(initialState);
  };

  return (
    <Wrapper>
      <h4>Profile</h4>

      <form onSubmit={onSubmit} action="" className="form">
        {apiLoading && <LoadingLocal />}
        {[
          // render first input conditionally
          { name: "name", type: "text" },
          { name: "email", type: "email" },
          { name: "lastName", type: "text" },
          { name: "location", type: "text" },
        ].map(({ name, type }) => {
          return (
            <FormRow
              key={`key-${name}`}
              name={name}
              type={type}
              value={formValues[name as keyof formType]}
              handleChange={handleChange}
            />
          );
        })}
        <button type="submit" className="btn btn-block" disabled={apiLoading}>
          Update User
        </button>
      </form>
    </Wrapper>
  );
};

export default Register;

// LINKS
// https://www.webtips.dev/solutions/get-form-values-on-submit-in-react
