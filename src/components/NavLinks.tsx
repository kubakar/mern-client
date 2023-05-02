import styled from "styled-components";

import { NavLink } from "react-router-dom";
import links from "../utils/links";

type Props = {
  onClick?: VoidFunction;
};

const Wrapper = styled.div`
  padding-top: 2rem;
  /* display: flex;
    flex-direction: column; */

  .nav-link-common {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    text-transform: capitalize;
  }

  .nav-link:hover .icon {
    color: var(--primary-500);
  }
`;

const NavLinks: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrapper>
      {/* <div> */}
      {links.map((l) => {
        const { text, icon, id, path } = l;

        // https://reactrouter.com/en/main/components/nav-link
        // 'active' class is added by default
        // onClick={onChange}

        // https://stackoverflow.com/questions/70644361/react-router-dom-v6-shows-active-for-index-as-well-as-other-subroutes
        // 'end' property
        return (
          <NavLink
            className="nav-link nav-link-common"
            to={path}
            key={id}
            onClick={onClick}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

export default NavLinks;
