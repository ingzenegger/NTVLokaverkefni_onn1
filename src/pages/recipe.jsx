import "./pages.style.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import NotFound from "../components/NotFound/notFound";
import Card from "../components/RecipeCard/recipeCard";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const URL = "https://www.themealdb.com/api/json/v1/1/";

  //Fetch the recipe specifed by URL (meal ID)
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const recipeResponse = await fetch(`${URL}lookup.php?i=${id}`);

        const recipeData = await recipeResponse.json();
        setRecipe(recipeData.meals[0]);
      } catch {
        console.error("villa");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  //fetch "similar recipes" to suggest: fetching category and picking random recipes excluding current recipe.
  useEffect(() => {
    if (!recipe) return;
    const fetchCategoryRecipes = async () => {
      try {
        const response = await fetch(
          `${URL}filter.php?c=${recipe.strCategory}`
        );
        const data = await response.json();
        setCategoryRecipes(data.meals);
      } catch {
        console.error("villa");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryRecipes();
  }, [recipe]);

  useEffect(() => {
    if (!categoryRecipes) return;
    const getRandomRecipes = () => {
      let rand = [];
      const filteredList = categoryRecipes.filter(
        (item) => item.idMeal !== recipe.idMeal
      );
      while (rand.length < 4 && rand.length < filteredList.length) {
        const randomIndex = Math.floor(Math.random() * filteredList.length);
        const item = filteredList[randomIndex];
        if (!rand.includes(item)) {
          rand.push(item);
        }
      }
      setSuggestions(rand);
    };
    getRandomRecipes();
  }, [categoryRecipes]);

  if (!recipe) {
    return <NotFound />;
  }

  //deconstructing and cleaning data from API to display recipe properly
  const ingredients = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith("strIngredient") && value)
    .map(([key, value]) => value);

  const measurements = Object.entries(recipe)
    .filter(([key, value]) => key.startsWith("strMeasure") && value)
    .map(([key, value]) => value);

  const instructionSteps = recipe.strInstructions
    ? recipe.strInstructions
        .split(/\r?\n/)
        .map((step) =>
          step
            .replace(/^Step \d+:?/i, "")
            .replace(/▢/g, "")
            .trim()
        )
        .filter((step) => step.trim().length > 0)
    : [];

  console.log("suggestions:", suggestions);

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <h1 className="recipe-title">{recipe.strMeal}</h1>
        <div className="recipe-tags">
          <Link to={`/recipes/category/${recipe.strCategory}`} className="tag">
            <span className="tag">Category: {recipe.strCategory}</span>
          </Link>
          <Link to={`/recipes/area/${recipe.strArea}`} className="tag">
            <span className="tag">Area: {recipe.strArea}</span>
          </Link>
        </div>
      </div>

      <div className="recipe-img-ingr-div recipe-detail-background">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-detail-image"
        />
        <div className="ingredients-div">
          <h2>Ingredients</h2> <hr className="solid" />
          <ul>
            {ingredients.map((ingredient, index) => {
              const measurement = measurements[index];

              if (!measurement) return null;

              return (
                <li key={index}>
                  {" "}
                  {measurement} {ingredient}{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="instructions-div recipe-detail-background">
        <div className="method-text">
          <h2>Method</h2> <hr className="solid" />
          <ol className="method-list">
            {instructionSteps.map((step, index) => (
              <li key={index} className="method-step">
                {step}
              </li>
            ))}
          </ol>
        </div>
        {recipe.strYoutube && !videoError && (
          <ReactPlayer
            src={recipe.strYoutube}
            className="recipe-video"
            width="100%"
            onError={() => setVideoError(true)}
          />
        )}
      </div>

      <div className="suggestions-container recipe-detail-background">
        <div className="suggestions-header">
          <h2>You might like these {recipe.strCategory} recipes as well...</h2>
          <img src="/debug.png" alt="debug logo" className="logo-small" />
        </div>
        <div className="similar-recipes-suggestions">
          {/* show 4 cards with random recipes from category */}
          {suggestions.map((recipe) => (
            <Card recipe={recipe} key={recipe.idMeal} />
          ))}
        </div>
      </div>
    </div>
  );
}
