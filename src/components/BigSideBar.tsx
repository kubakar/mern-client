import styled from "styled-components";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
  }

  .sidebar-container {
    background: var(--white);
    min-height: 100vh;
    /* height: 100%; */
    width: 250px;
    margin-left: -250px;
    transition: var(--transition);

    position: sticky;
    top: 0;
  }
  .content {
    /* ?? */
    position: sticky;
    top: 0;
  }
  .show-sidebar {
    margin-left: 0;
  }
  header {
    height: 6rem;
    display: flex;
    align-items: center;
    padding-left: 2.5rem;
  }

  .nav-link {
    padding: 1rem 0 1rem 2.5rem;
    transition: var(--transition);
  }
  .nav-link:hover {
    background: var(--grey-50);
    padding-left: 3rem;
    color: var(--grey-900);
  }
`;

type Props = {
  visible: boolean;
};

const BigSideBar: React.FC<Props> = ({ visible }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${visible && "show-sidebar"}`}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
