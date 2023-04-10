import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Lunch() {
  const [lunch, setLunch] = useState([]);

  useEffect(() => {
    getLunch();
  }, []);

  const getLunch = async () => {
    const check = localStorage.getItem("lunch");
    if (check !== null) {
      const data = JSON.parse(check);
      setLunch(data);
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY_LUNCH}&number=9&tags=appetizer`
      );
      const data = await api.json();

      localStorage.setItem("lunch", JSON.stringify(data.recipes));

      setLunch(data.recipes);
    }
  };

  return (
    <div>
      <Wrapper>
        <h3 className="popular-recipes">Lunch Picks</h3>

        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {lunch.map((recipe) => {
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

export default Lunch;
