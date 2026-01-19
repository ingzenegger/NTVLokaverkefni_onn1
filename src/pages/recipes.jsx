import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeDetailPage from "./recipe";
import Card from "../components/RecipeCard/recipeCard";
import "./pages.style.css";
import Loading from "../components/Loading/loading";
import NotFound from "../components/NotFound/notFound";

export default function RecipesPage() {
  const { category, area } = useParams();
  const [recipes, setRecipes] = useState([]);
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = "https://www.themealdb.com/api/json/v1/1/";

  //fetch all meals by letter and combine to one array
  useEffect(() => {
    if (category || area) return;
    const fetchRecipes = async () => {
      setIsLoading(true);
      let allRecipes = [];
      try {
        for (let i = 0; i < letters.length; i++) {
          const response = await fetch(`${URL}search.php?f=${letters[i]}`);
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
  }, [category, area]);

  //fetch only one category with useparams
  useEffect(() => {
    if (category) {
      const fetchCategoryRecipes = async () => {
        setIsLoading(true);
        setCurrentPage(1);
        try {
          const response = await fetch(`${URL}filter.php?c=${category}`);
          const data = await response.json();
          setRecipes(data.meals);
        } catch {
          console.error("villa");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCategoryRecipes();
      console.log("category", category);
    }
  }, [category]);

  //fetch recipes by area with useparams
  useEffect(() => {
    if (area) {
      const fetchAreaRecipes = async () => {
        setIsLoading(true);
        setCurrentPage(1);
        try {
          const response = await fetch(`${URL}filter.php?a=${area}`);
          const data = await response.json();
          setRecipes(data.meals);
        } catch {
          console.error("villa");
        } finally {
          setIsLoading(false);
        }
      };
      fetchAreaRecipes();
    }
  }, [area]);

  // pagination:
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 24;
  const pagesTotal = Math.ceil(recipes.length / recipesPerPage);
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
    <>
      {recipes.length === 0 ? (
        <NotFound />
      ) : (
        <div className="recipes-container">
          <h1 className="recipes-title-header">
            {category
              ? `...Browsing ${category} Recipes...`
              : area
              ? `...Browsing ${area} Cuisine...`
              : "...Browse all Recipes..."}
          </h1>

          <div className="recipes-list">
            {currentRecipes.map((recipe) => (
              <Card recipe={recipe} key={recipe.idMeal} />
            ))}
          </div>

          {recipes.length <= recipesPerPage ? (
            <p></p>
          ) : (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {pagesTotal}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={lastIndex >= recipes.length}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
