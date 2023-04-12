// import { useEffect } from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import SmallSideBar from "../../components/SmallSideBar";
import BigSideBar from "../../components/BigSideBar";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
  }
`;

type Props = {};

const SharedLayout: React.FC<Props> = () => {
  return (
    <Wrapper>
      {/* 2 column layout - sidebars are toggled when screen changes */}
      {/* 1 column - sidebar, 2 column - navbar & main page */}
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className="dashboard-page">
            {/* Outlet should be used in parent route elements to render their child route elements */}
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
