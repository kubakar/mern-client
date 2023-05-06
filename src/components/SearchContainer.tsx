import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Wrapper = styled.div`
  padding: 0.5rem;
`;

type Props = {};

const SearchContainer: React.FC<Props> = () => {
  // const {} = useAppContext();

  return <Wrapper>SearchContainer</Wrapper>;
};
export default SearchContainer;
