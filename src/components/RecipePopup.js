import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const RecipePopup = ({
  newRecipe,
  setNewRecipe,
  addRecipe,
  popupActive,
  setPopupActive,
}) => {
  const [ingredients, setIngredients] = useState(newRecipe.ingredients || [""]);

  useEffect(() => {
    if (!popupActive) {
      setIngredients([""]);
    }
  }, [popupActive]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("ingredient")) {
      const index = parseInt(name.slice(10));
      const newIngredients = [...ingredients];
      newIngredients[index] = value;
      setIngredients(newIngredients);
      setNewRecipe((prevState) => ({
        ...prevState,
        ingredients: newIngredients,
      }));
    } else {
      setNewRecipe((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleAddRecipe = () => {
    if (!newRecipe.name || !newRecipe.description || !newRecipe.ingredients) {
      alert("Please fill out required fields before adding a new recipe.");
      return;
    }
    addRecipe();
  };

  return (
    <div
      className={`Popup ${popupActive ? "active slideInUp" : "slideOutDown"}`}
    >
      <div className="closePopup" onClick={() => setPopupActive(false)}>
        <FontAwesomeIcon icon={faTimes} className="delete-card" />
      </div>
      <div className="Popup-Content">
        <h3>New Recipe</h3>
        <input
          type="text"
          className="add-recipe"
          name="name"
          onChange={handleInputChange}
          value={newRecipe.name || ""}
          placeholder="recipe name"
        />
        <input
          type="text"
          className="add-recipe"
          name="description"
          onChange={handleInputChange}
          value={newRecipe.description || ""}
          placeholder="description"
        />
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            className="add-recipe"
            name={`ingredient${index}`}
            onChange={(event) => handleInputChange(event, index)}
            value={ingredient}
            placeholder={`ingredient ${index + 1}`}
          />
        ))}
        <input
          type="text"
          className="add-recipe"
          name="image"
          onChange={handleInputChange}
          value={newRecipe.image || ""}
          placeholder="image url (optional)"
        />
      </div>
      <div className="buttonContainer">
        <div className="button" onClick={handleAddIngredient}>
          Add Ingredient
        </div>
        <div className="button" onClick={handleAddRecipe}>
          Add Recipe
        </div>
      </div>
    </div>
  );
};

export default RecipePopup;
