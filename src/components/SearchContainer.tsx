import { useEffect, useState } from "react";

import styled from "styled-components";
import FormRow from "./FormRow";
import FormSelectRow from "./FormSelectRow";

import { filterSortType, initialState } from "../pages/dashboard/AllJobs";

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

type Props = {
  setFormValues: Function;
  formValues: filterSortType;
};

const statusOptions = ["all", "interview", "declined", "pending"];
const typeOptions = ["all", "full-time", "part-time", "remote", "internship"];
const sortOptions = ["latest", "oldest", "a - z", "z - a"];

const SearchContainer: React.FC<Props> = ({ setFormValues, formValues }) => {
  // other methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev: any) => ({ ...prev, page: null, [name]: value })); // TEST
  };

  const handleClear = () => {
    setFormValues(initialState);
  };

  return (
    <Wrapper>
      <form onSubmit={() => {}} action="" className="form">
        <FormRow
          key={`key-search`}
          name="search"
          type="text"
          value={formValues.search ?? ""}
          handleChange={handleChange}
          // handleChange={(e) => updateDebounce(e)} // not in this case
        />

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
        <FormSelectRow
          options={sortOptions}
          name="sort"
          value={formValues.sort}
          handleChange={handleChange}
        />

        <button
          type="button"
          className="btn btn-block clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
