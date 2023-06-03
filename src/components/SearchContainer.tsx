import { useEffect, useState } from "react";

import styled from "styled-components";
import FormRow from "./FormRow";
import FormSelectRow from "./FormSelectRow";

import { filterSortType } from "../context/jobReducer";
import { useJobContext } from "../context/jobContext";

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

const statusOptions = ["all", "interview", "declined", "pending"];
const typeOptions = ["all", "full-time", "part-time", "remote", "internship"];
const sortOptions = ["latest", "oldest", "a - z", "z - a"];

const initialState: filterSortType = {
  search: null, // set to null because of excluding initial render execution (debounce check)
  sort: sortOptions[0],
  status: statusOptions[0],
  type: typeOptions[0],
  page: null,
  limit: null,
};

const SearchContainer: React.FC<Props> = () => {
  const { updatejobFilterOptions } = useJobContext();
  const [formValues, setFormValues] = useState<filterSortType>(initialState);

  // const [formValues, setFormValues] =
  //   useState<filterSortType>(jobFilterOptions); // do not clear filters - read from ctx on init

  // other methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormValues(initialState);
  };

  // send filter data to context so other comp. (JobsContainer) can use it (re-render)
  useEffect(() => {
    updatejobFilterOptions(formValues);

    return () => {
      // !!
      // console.log("CLEAR updatejobFilterOptions");
      // This will clear out the 'page' to null therefore it's working as it should resetting the page to default (null)
      // updatejobFilterOptions(initialState); // clear ctx data so next comp render is clean with initial data
      // updatejobFilterOptions({ ...formValues, page: null }); // clear page only when filter values are persistent
    };
  }, [updatejobFilterOptions, formValues]);

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
