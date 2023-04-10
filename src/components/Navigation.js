import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="navigation">
      <Link to={"/"}>
        <div className="headerNav">
          <img
            className="logoImage"
            src={process.env.PUBLIC_URL + "/Logo.png"}
            alt=""
          ></img>
        </div>
      </Link>
      <Link to={"/"} className="navLink">
        <div className="link">Home</div>
      </Link>
      <Link to={"/cuisine/italian"} className="navLink">
        <div className="link">Cuisine</div>
      </Link>
      <Link to={"/mealplan"} className="navLink">
        <div className="link">Meal Plan</div>
      </Link>
      <Link to={"/recipes"} className="navLink">
        <div className="link">My Recipes</div>
      </Link>
    </div>
  );
}

export default Navigation;
