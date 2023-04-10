import React from "react";
import Veggie from "../components/Veggie";
import Category from "../components/Category";
import Popular from "../components/Popular";
import Breakfast from "../components/Breakfast";
import Lunch from "../components/Lunch";
import Dinner from "../components/Dinner";
import Dessert from "../components/Dessert";
import Header from "../components/Header";

function Home() {
  return (
    <>
      <Header />
      <Category />
      <Popular />
      <Veggie />
      <Breakfast />
      <Lunch />
      <Dinner />
      <Dessert />
    </>
  );
}

export default Home;
