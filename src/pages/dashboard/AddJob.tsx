import { useEffect, useState } from "react";

import styled from "styled-components";
import { useAppContext } from "../../context/appContext";
import FormRow from "../../components/FormRow";
import FormSelectRow from "../../components/FormSelectRow";
import LoadingLocal from "../../components/LoadingLocal";
import { useApi } from "../../utils/hooks";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%; // overrides !
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: end;
    column-gap: 1rem;

    border-top: 5px solid var(--primary-500);
    /* spinner relation */
    position: relative;
  }
  .btn[type="submit"] {
    margin-top: 1rem;
    grid-column: -1/1;
  }

  .clear-btn {
    background: var(--grey-500);
    margin-bottom: 1rem;
  }
  .clear-btn:hover {
    background: var(--black);
  }
`;

type Props = {};

type formType = {
  position: string;
  company: string;
  location: string;
  status: string;
  type: string;
};

const statusOptions = ["interview", "declined", "pending"];
const typeOptions = ["full-time", "part-time", "remote", "internship"];

const initialState: formType = {
  position: "",
  company: "",
  location: "",
  // selects
  status: statusOptions[0],
  type: typeOptions[0],
};

const AddJob: React.FC<Props> = () => {
  const [formValues, setFormValues] = useState<formType>(initialState);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { displayAlert, axiosWithToken } = useAppContext();

  // other methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormValues(initialState);
  };

  const validateInput = (data: formType): boolean => {
    const { position, company, location } = data;
    if (!(position && location && company)) return false;
    return true;
  };

  const createJob = async (job: formType) =>
    axiosWithToken.post(`/api/job`, job); // custom axios instance

  const [apiData, apiError, apiLoading, apiCall] = useApi(createJob);

  useEffect(() => {
    if (apiData) {
      console.log(apiData);
      displayAlert("Job added!", "success");
    }
    if (apiError) displayAlert(apiError.data.msg);
  }, [apiData, apiError, displayAlert]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      console.log("Editing API TBD...");
    } else {
      if (!validateInput(formValues))
        return displayAlert("Please provide all values");

      apiCall(formValues);
    }
  };

  const getFormInputs = (dataObject: Partial<formType>) => {
    return Object.entries(dataObject)
      .filter(([, v]) => !v) // get empty strings only for standard inputs
      .map(([k]) => ({ name: k, type: "text" }));
  };

  return (
    <Wrapper>
      <h4>{isEditing ? "Edit Job" : "Add Job"}</h4>

      <form onSubmit={onSubmit} action="" className="form">
        {apiLoading && <LoadingLocal />}
        {getFormInputs(initialState).map(({ name, type }) => {
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

        <FormSelectRow
          options={typeOptions}
          name="type"
          value={formValues.type}
          handleChange={handleChange}
        />
        <FormSelectRow
          options={statusOptions}
          name="status"
          value={formValues.status}
          handleChange={handleChange}
        />

        <button
          disabled={apiLoading}
          type="button"
          className="btn btn-block clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>
        <button disabled={apiLoading} type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </Wrapper>
  );
};

export default AddJob;
