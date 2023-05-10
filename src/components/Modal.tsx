import styled from "styled-components";
import { X } from "react-feather";
import Logo from "./Logo";

const Wrapper = styled.aside`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);

    overflow: auto;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
  }
  .content {
    background: var(--white);
    border-radius: var(--borderRadius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
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
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ visible, onChange, children }) => {
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
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
