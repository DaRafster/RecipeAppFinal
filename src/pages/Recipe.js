import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("summary");

  const fetchDetails = async () => {
    const cachedDetails = localStorage.getItem(`recipe-${params.id}`);
    if (cachedDetails) {
      setDetails(JSON.parse(cachedDetails));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY_RECIPE}`
      );
      const detailData = await data.json();
      setDetails(detailData);
      localStorage.setItem(`recipe-${params.id}`, JSON.stringify(detailData));
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.id]);

  return (
    <DetailWrapper>
      <div className="recipeBrowse">
        <h2>{details.title}</h2>
        <div className="recipeBrowseHeader">
          <img src={details.image} alt={details.title} />
        </div>
      </div>
      <Info>
        <div className="buttonCont">
          <Button
            className={activeTab === "summary" ? "active" : ""}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </Button>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </div>

        {activeTab === "summary" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
          </div>
        )}

        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 7rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  li {
    font-size: 1.2rem;
    font-weight: 700;
  }

  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    margin-left: 4.5rem;
  }

  h3 {
    margin-top: 2rem;
    line-height: 2rem;
  }

  a {
    color: black;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 3px solid #313131;
  margin-right: 2rem;
  font-weight: 700;
  font-size: 1.5rem;
  border-radius: 32px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
    cursor: pointer;
  }
`;

const Info = styled.div`
  border: 5px solid #313131;
  margin-right: 7rem;
  margin-left: 7rem;
  padding: 4rem;
  width: 60%;
  padding-right: 4rem;
  border-radius: 32px;
`;

export default Recipe;
