import styled from "styled-components";
import { X } from "react-feather";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    /* display: none; */
    transition: var(--transition);
  }
  .show-sidebar {
    /* display: flex; */
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    background: transparent;
    border-color: transparent;
    display: flex;
    color: var(--red-dark);
    cursor: pointer;
  }

  .nav-link {
    padding-bottom: 2rem;
  }
  .nav-link:hover {
    color: var(--grey-900);
  }
`;

type Props = {
  visible: boolean;
  onChange: VoidFunction;
};

const SmallSideBar: React.FC<Props> = ({ visible, onChange }) => {
  return (
    <Wrapper>
      <div className={`sidebar-container ${visible && "show-sidebar"}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={onChange}>
            <X size={48} />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks onClick={onChange} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
