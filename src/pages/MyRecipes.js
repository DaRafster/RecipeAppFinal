import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import RecipeCard from "../components/RecipeCard";
import RecipePopup from "../components/RecipePopup";
import APISearch from "../components/APISearch";

const API_BASE = "https://custom-recipe-app.onrender.com";

function AddRecipeButton(props) {
  return (
    <div className="Card-Add" onClick={props.onClick}>
      <FontAwesomeIcon icon={faPlus} className="add-icon" />
    </div>
  );
}

function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newRecipe, setNewRecipe] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = () => {
    fetch(`${API_BASE}/recipes`)
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.log(err));
  };

  const toggleFavorite = async (id) => {
    const data = await fetch(`${API_BASE}/recipes/update/${id}`).then(
      (response) => response.json()
    );
    setRecipes((recipes) =>
      recipes.map((recipe) => {
        if (recipe._id === data._id) {
          recipe.favorite = data.favorite;
        }
        return recipe;
      })
    );
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const deleteRecipe = async (id) => {
    const data = await fetch(`${API_BASE}/recipes/delete/${id}`, {
      method: "DELETE",
    }).then((response) => response.json());

    setRecipes((recipes) =>
      recipes.filter((recipe) => recipe._id !== data._id)
    );
  };

  const addRecipe = async () => {
    if (!newRecipe.name || !newRecipe.description || !newRecipe.ingredients) {
      alert("Please fill out required fields before adding a new recipe.");
      return;
    }

    const data = await fetch(`${API_BASE}/recipes/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newRecipe.name,
        favorite: false,
        description: newRecipe.description,
        ingredients: newRecipe.ingredients,
        image: newRecipe.image,
      }),
    }).then((response) => response.json());

    setRecipes([...recipes, data]);
    setNewRecipe({});
    setPopupActive(false);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      fetch(`${API_BASE}/recipes/search/${value}`)
        .then((res) => res.json())
        .then((data) => {
          const searchResults = data.map((recipe) => ({
            id: recipe._id,
            name: recipe.name,
            favorite: recipe.favorite,
            description: recipe.description,
            ingredients: recipe.ingredients,
            image: recipe.image,
          }));
          const filteredResults = showFavorites
            ? searchResults.filter((recipe) => recipe.favorite)
            : searchResults;
          setSearchResults(filteredResults);
        });
    } else {
      const filteredRecipes = showFavorites
        ? recipes.filter((recipe) => recipe.favorite)
        : recipes;
      setSearchResults([]);
    }
  };

  function ShowFavoritesButton({ showFavorites, handleShowFavorites }) {
    return (
      <button onClick={handleShowFavorites} className="favToggle">
        <FontAwesomeIcon
          icon={faStar}
          color={showFavorites ? "#fd7014" : "white"}
          className="favoriteSearch"
        />
      </button>
    );
  }

  return (
    <>
      <div className="myRecipesSort">
        <APISearch
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <ShowFavoritesButton
          showFavorites={showFavorites}
          handleShowFavorites={handleShowFavorites}
        />
      </div>
      <div className="Card-Container">
        {searchResults.length > 0
          ? searchResults.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                toggleFavorite={toggleFavorite}
                deleteRecipe={deleteRecipe}
                image={recipe.image}
              />
            ))
          : recipes
              .filter((recipe) => !showFavorites || recipe.favorite)
              .map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  toggleFavorite={toggleFavorite}
                  deleteRecipe={deleteRecipe}
                  image={recipe.image}
                />
              ))}
        <AddRecipeButton onClick={() => setPopupActive(true)} />
        <RecipePopup
          popupActive={popupActive}
          setPopupActive={setPopupActive}
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          addRecipe={addRecipe}
        />
      </div>
    </>
  );
}

export default MyRecipes;
