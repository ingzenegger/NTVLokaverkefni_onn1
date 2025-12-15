import { Link } from "react-router-dom";
import "./recipeCard.style.css";

export default function Card({ recipe }) {
  return (
    <div>
      <Link
        to={`/recipes/${recipe.idMeal}`}
        // className="recipe-card-link"
        aria-label={`Open recipe ${recipe.strMeal}`}
        className="recipe-card"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${recipe.strMealThumb})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h2 className="recipe-card-title">{recipe.strMeal}</h2>
      </Link>
    </div>
  );
}
