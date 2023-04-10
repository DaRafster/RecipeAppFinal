import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

const RecipeCard = ({ recipe, toggleFavorite, deleteRecipe }) => {
  return (
    <div className={"Card" + (recipe.favorite ? "-Favorite" : "")}>
      <div className="Card-Header">
        <FontAwesomeIcon
          icon={faStar}
          className="favorite"
          onClick={() => toggleFavorite(recipe._id)}
        />
        <div className="name">{recipe.name}</div>
      </div>

      {recipe.image ? (
        <div className="image">
          <img src={recipe.image} alt={recipe.name} className="cardImage" />
        </div>
      ) : null}
      <div className="description">
        <span>Description: </span>
        {recipe.description}
      </div>
      <div className="ingredients">
        <span>Ingredients:</span>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <FontAwesomeIcon
        icon={faTimes}
        className="delete-card"
        onClick={() => deleteRecipe(recipe._id)}
      />
    </div>
  );
};

export default RecipeCard;
