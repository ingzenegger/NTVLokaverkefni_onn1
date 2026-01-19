import { Link } from "react-router-dom";
import "./recipeCard.style.css";

export default function Card({ recipe }) {
  return (
    <div>
      <Link
        to={`/recipe/${recipe.idMeal}`}
        aria-label={`Open recipe ${recipe.strMeal}`}
        className="recipe-card"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), url(${recipe.strMealThumb})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <h2
          className={
            recipe.strMeal.length > 35
              ? "recipe-card-title-small"
              : "recipe-card-title-normal"
          }
        >
          {recipe.strMeal}
        </h2>
      </Link>
    </div>
  );
}
