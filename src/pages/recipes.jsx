import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeDetailPage from "./recipe";
import Card from "../components/RecipeCard/recipeCard";
import "./pages.style.css";

//look up meals by first letter: www.themealdb.com/api/json/v1/1/search.php?f=a

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [letter, setLetter] = useState("a");
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        const data = await response.json();
        setRecipes(data.meals);
      } catch {
        setError("villa kom upp!");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
    console.log(letters);
  }, [letter]);

  return (
    <div>
      <h1>All Recipes page</h1>
      {/* <p>hopefully see data in console.log</p> */}
      <button>Next letter</button>
      {/* {console.log(recipes[0])} */}

      <div className="recipes-list">
        {recipes.map((recipe) => (
          <Card recipe={recipe} key={recipe.idMeal} />
        ))}
      </div>
    </div>
  );
}

// <div>
//   <p key={recipe.idMeal}>{recipe.strMeal}</p>
//   <Link to={`/recipes/${recipe.idMeal}`}>
//     <img key={recipe.idMeal} src={recipe.strMealThumb} />
//   </Link>
// </div>