import React from "react";
import Navigation from "./Navigation";
import Search from "./Search";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <img
        src={process.env.PUBLIC_URL + "/headerImage.jpg"}
        alt=""
        className="headerImage"
      ></img>
      <div className="headerText">
        <Navigation />
      </div>
      <div className="floatingBox">
        <h3 className="floatingTitle">Try Our Recipes!</h3>
        <h4 className="floatingContent">
          Explore mouth-watering recipes that will excite your taste buds!
        </h4>
        <Link to={"/cuisine/italian"} className="floatingLink">
          <div className="floatingButton">Explore</div>
        </Link>
      </div>
      <Search />
    </>
  );
}

export default Header;
