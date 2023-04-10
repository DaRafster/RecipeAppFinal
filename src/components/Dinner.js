import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Dinner() {
  const [dinner, setDinner] = useState([]);

  useEffect(() => {
    getDinner();
  }, []);

  const getDinner = async () => {
    const check = localStorage.getItem("dinner");
    if (check !== null) {
      const data = JSON.parse(check);
      setDinner(data);
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY_DINNER}&number=9&tags=main course`
      );
      const data = await api.json();

      localStorage.setItem("dinner", JSON.stringify(data.recipes));

      setDinner(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3 className="popular-recipes">Dinner Picks</h3>

        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {dinner.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
                <h4 className="recipe-title">{recipe.title}</h4>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
  margin: 1rem;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 5px solid black;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Dinner;
