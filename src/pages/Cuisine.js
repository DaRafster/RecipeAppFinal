import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import Category from "../components/Category";
import { Link, useParams } from "react-router-dom";
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY_CUISINE}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <>
      <SearchWrapper>
        <Search />
      </SearchWrapper>
      <Category />
      <div>
        <h1 className="cuisineTitle">
          {params.type.charAt(0).toUpperCase() +
            params.type.slice(1) +
            " Cuisine"}
        </h1>
      </div>

      <Grid>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}
        >
          {cuisine.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <Card>
                  <Link to={`/recipe/${item.id}`}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Grid>
    </>
  );
}

const SearchWrapper = styled.div`
  margin-top: 5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  border: 4px solid black;
  border-radius: 2rem;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  margin-top: 2rem;
  margin-bottom: 2rem;

  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 30px;
    color: black;
  }

  &:hover {
    transform: scale(1.02);
  }
`;

export default Cuisine;
