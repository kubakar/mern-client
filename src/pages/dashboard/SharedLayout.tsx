import { useCallback, useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
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

  .icon {
    margin-right: 1rem;
    display: flex;
    transition: var(--transition);
  }

  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
  }
`;

type Props = {};

const SharedLayout: React.FC<Props> = () => {
  const [sideBarVisible, showSideBar] = useState<boolean>(false);
  const toggleSideBar = useCallback(() => showSideBar((prev) => !prev), []);

  return (
    <Wrapper>
      {/* 2 column layout - sidebars are toggled when screen changes */}
      {/* 1 column - sidebar, 2 column - navbar & main page */}
      <main className="dashboard">
        <SmallSideBar visible={sideBarVisible} onChange={toggleSideBar} />
        <BigSideBar visible={sideBarVisible} />
        <div>
          <NavBar onChange={toggleSideBar} />
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
