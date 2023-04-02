import React from "react";
import styled from "styled-components";

import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-500);
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
  }
  .main-img {
    display: none;
  }

  .btn-hero {
    font-size: 1.25rem;
    padding: 0.5rem 1.25rem;
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

type Props = {};

const Landing: React.FC<Props> = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* 'page' is a class inside styled component */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
            exercitationem. Nostrum libero corrupti necessitatibus quos
            consequuntur, optio officiis possimus ratione repellendus provident!
            Magni ex cum, praesentium nemo minus aut voluptate.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="main landing" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
