import React from "react";
import {Container} from "reactstrap";

const Header = () => {
  return (
    <div
      className="page-header section-dark"
      style={{
        backgroundImage:
          "url(" + require("assets/img/antoine-barres.jpg").default + ")",
      }}
    >
      <div className="filter"/>
      <div className="content-center">
        <Container>
          <div className="title-brand">
            <h1 className="presentation-title">Paper Kit React</h1>
            <div className="fog-low">
              <img
                alt="..."
                src={require("assets/img/fog-low.png").default}
              />
            </div>
            <div className="fog-low right">
              <img
                alt="..."
                src={require("assets/img/fog-low.png").default}
              />
            </div>
          </div>
          <h2 className="presentation-subtitle text-center">
            Make your mark with a Free Bootstrap 4 (Reactstrap) UI Kit!
          </h2>
        </Container>
      </div>
      <div
        className="moving-clouds"
        style={{
          backgroundImage:
            "url(" + require("assets/img/clouds.png").default + ")",
        }}
      />
      <h6 className="category category-absolute">
        Designed and coded by{" "}
        <a
          href="https://www.creative-tim.com?ref=pkr-index-page"
          target="_blank"
          rel="noreferrer"
        >
          <img
            alt="..."
            className="creative-tim-logo"
            src={require("assets/img/creative-tim-white-slim2.png").default}
          />
        </a>
      </h6>
    </div>
  );
}

export default Header;
