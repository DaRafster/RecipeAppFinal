import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState(
    JSON.parse(localStorage.getItem(`imageUrl-${meal.id}`)) || ""
  );

  useEffect(() => {
    if (!imageUrl) {
      fetch(
        `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${process.env.REACT_APP_API_KEY_MEAL}`
      )
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.image);
          localStorage.setItem(
            `imageUrl-${meal.id}`,
            JSON.stringify(data.image)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [imageUrl, meal.id]);

  return (
    <div className="article">
      <div className="articleContent">
        <Card>
          <img src={imageUrl} alt={meal.title} />
        </Card>
        <h1>{meal.title}</h1>
        <ul>
          <li>Preparation Time: {meal.readyInMinutes} minutes</li>
          <li>Number of Servings: {meal.servings}</li>
        </ul>
        <div className="recipeLinkDiv">
          <Link to={`/recipe/${meal.id}`} className="recipeLink">
            Go to Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    width: 500px;
    height: 350px;
    object-fit: cover;
  }
`;

export default Meal;
