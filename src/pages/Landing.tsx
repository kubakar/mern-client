import React from "react";
import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LandingPage";

type Props = {};

const Landing: React.FC<Props> = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="page container">
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
