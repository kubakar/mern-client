import React, { useState } from "react";
import styled from "styled-components";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import { useAppContext } from "../context/appContext";

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

const Register: React.FC<Props> = (props) => {
  const [formValues, setFormValues] = useState<formType>(initialState);
  const [isMember, setIsMember] = useState<boolean>(true);

  // global state and useNavigate
  const { isLoading, displayAlert, registerUser } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMember = () => setIsMember((prev) => !prev);

  const validateInput = (data: formType, isMember: boolean): boolean => {
    const { name, email, password } = data;

    if (!(email && password && (name || isMember))) {
      return false;
    }
    return true;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);

    if (!validateInput(formValues, isMember)) return displayAlert();

    setFormValues(initialState);
    console.log(`${isMember ? "is Member" : "Not a member"}`);

    if (isMember) {
      console.log("already a member");
    } else registerUser(formValues);
  };

  const getActionName = (isMember: boolean) =>
    isMember ? "Login" : "Register";

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} action="" className="form">
        <Logo />
        <h3>{getActionName(isMember)}</h3>
        {/* {showAlert && <Alert />} */}
        {/* showAlert is data from global ctx */}
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
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="btn-link">
            {getActionName(!isMember)}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

// LINKS
// https://www.webtips.dev/solutions/get-form-values-on-submit-in-react
