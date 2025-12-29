// Todo next: fix size of very long recipe titles to make font slightly smaller.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeDetailPage from "./recipe";
import Card from "../components/RecipeCard/recipeCard";
import "./pages.style.css";
import Loading from "../components/Loading/loading";

//look up meals by first letter: www.themealdb.com/api/json/v1/1/search.php?f=a

//fetch all meals by letter and combine to one array

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      let allRecipes = [];
      try {
        for (let i = 0; i < letters.length; i++) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${letters[i]}`
          );
          const data = await response.json();
          if (data.meals === null) {
            continue;
          }
          allRecipes.push(...data.meals);
        }
      } catch {
        setError("villa kom upp!");
      } finally {
        setIsLoading(false);
      }
      setRecipes(allRecipes);
    };

    fetchRecipes();
  }, []);

  // pagination:
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;
  const lastIndex = currentPage * recipesPerPage;
  const firstIndex = lastIndex - recipesPerPage;
  const currentRecipes = recipes.slice(firstIndex, lastIndex);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  //Loading:

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="recipes-container">
      <h1 className="recipes-title-header">...Browse all Recipes...</h1>
      {/* <button onClick={nextLetterIndex}>Next letter</button> <p>{letter}</p> */}
      <div className="recipes-list">
        {currentRecipes.map((recipe) => (
          <Card recipe={recipe} key={recipe.idMeal} />
        ))}
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={lastIndex >= recipes.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
