import React from "react";
import main from "../assets/images/main.svg";
import Logo from "../components/Logo";
import { joinStyles } from "../utils/styleUtils";
import styles from "./Landing.module.css";

type Props = {};

const Landing: React.FC<Props> = (props) => {
  return (
    <main>
      <nav>
        <Logo />
      </nav>
      <div
        className={joinStyles(
          {
            source: styles,
            styles: ["page"],
          },
          "container"
        )}
      >
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
          <button className="btn btn-hero">Login/Register</button>
        </div>
        <img
          src={main}
          alt="main"
          className={joinStyles(
            {
              source: styles,
              styles: ["main-img"],
            },
            "img"
          )}
        />
      </div>
    </main>
  );
};

export default Landing;
