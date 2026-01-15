// Clickable card to filter recipes by ingredient
// https://www.themealdb.com/images/ingredients/${ingredient}.png

import { Link } from "react-router-dom";
import RecipesPage from "../../pages/recipes";
import "./ingredientCard.style.css";

//usable with category?

export default function IngrdntCard({ ingredient, category, area }) {
  return (
    <>
      {ingredient ? (
        <div className="ingredient-card">
          <img
            src={`https://www.themealdb.com/images/ingredients/${ingredient}-small.png`}
            alt={`${ingredient}`}
          />
        </div>
      ) : category ? (
        <div className="category-card">
          <Link to={`/recipes/category/${category.strCategory}`}>
            <img
              src={category.strCategoryThumb}
              alt={`${category.strCategory}`}
            />
            <p>{category.strCategory}</p>
          </Link>
        </div>
      ) : area ? (
        <div className="area-card">
          <Link to={`/recipes/area/${area.strArea}`}>
            <p>{area.strArea}</p>
          </Link>
        </div>
      ) : (
        <p>blank</p>
      )}
    </>
  );
}
