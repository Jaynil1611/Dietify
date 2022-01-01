import React from "react";
import { PrimaryButton } from "../index";
import { Link } from "react-router-dom";
import "./Home.css";
import { useDocumentTitle } from "../../utils";

function Home() {
  useDocumentTitle("Home");
  return (
    <div className="hero">
      <div className="hero__img img--responsive"></div>
      <div className="hero__container">
        <div className="hero__heading h6 text--bold">
          Purchase nutirients rich products personalised for you!
        </div>
        <div className="hero__content text--gray text--center">
          Find your favourite food from a extensive collection of healthy food
          items.
        </div>
        <div>
          <Link to="/products">
            <PrimaryButton className="text--white button--large">
              Shop Now
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
