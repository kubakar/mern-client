import React, { useState } from "react";
import styled from "styled-components";
import Alert from "../components/Alert";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  /* justify-content: center;
  override => margin: 3rem auto; @ .form */
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
  h3 {
    text-align: center;
  }
  p {
    text-align: center;
  }
`;

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
  isMember: true,
};

const Register: React.FC<Props> = (props) => {
  const [formValues, setFormValues] = useState<formType>(initialState);
  // global state and useNavigate

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    console.log(e.target.value);

    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const toggleMember = () => {
    setFormValues((prev) => ({
      ...prev,
      isMember: !prev.isMember,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues);

    setFormValues(initialState);

    console.log(`${formValues.isMember ? "is Member" : "Not a member"}`);
  };

  const getActionName = (isMember: boolean) =>
    isMember ? "Login" : "Register";

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} action="" className="form">
        <Logo />
        <h3>{getActionName(formValues.isMember)}</h3>
        {formValues.isMember && <Alert />}
        {[
          // render first input conditionally
          ...(!formValues.isMember ? [{ name: "name", type: "text" }] : []),
          { name: "email", type: "email" },
          { name: "password", type: "password" },
        ].map(({ name, type }) => {
          return (
            <FormRow
              name={name}
              type={type}
              // omit prop from obj type
              // https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
              value={formValues[name as keyof Omit<formType, "isMember">]}
              handleChange={handleChange}
            />
          );
        })}
        <button type="submit" className="btn btn-block">
          Submit
        </button>
        <p>
          {formValues.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="btn-link">
            {getActionName(!formValues.isMember)}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

// LINKS
// https://www.webtips.dev/solutions/get-form-values-on-submit-in-react
