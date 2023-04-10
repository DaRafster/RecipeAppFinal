import React from "react";
import MyRecipes from "./MyRecipes";
import Home from "./Home";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Cuisine from "./Cuisine";
import MealPlan from "./MealPlan";
import { Route, Routes } from "react-router-dom";

function Pages() {
  return (
    <>
      <Routes>
        <Route path="/recipes" element={<MyRecipes />} />
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/mealplan" element={<MealPlan />} />
      </Routes>
    </>
  );
}

export default Pages;
