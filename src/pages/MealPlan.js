import { useState, useEffect } from "react";
import MealList from "../components/MealList";

function MealPlan() {
  const [mealData, setMealData] = useState(
    JSON.parse(localStorage.getItem("mealData")) || []
  );
  const [calories, setCalories] = useState(
    JSON.parse(localStorage.getItem("calories")) || 2000
  );

  useEffect(() => {
    localStorage.setItem("calories", JSON.stringify(calories));
  }, [calories]);

  function handleChange(e) {
    setCalories(e.target.value);
  }

  function getMealData() {
    localStorage.removeItem("mealData"); // Remove the stored meal data
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY_MEALPLAN}&timeFrame=day&targetCalories=${calories}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMealData(data);
        localStorage.setItem("mealData", JSON.stringify(data)); // Store the new meal data
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="controls">
        <input
          type="number"
          placeholder="Calories (e.g. 2000)"
          onChange={handleChange}
          value={calories}
        />
        <button onClick={getMealData}>Get Daily Meal Plan</button>
      </div>

      <div className="mealData">
        {mealData.meals && <MealList mealData={mealData} />}
      </div>
    </>
  );
}

export default MealPlan;
