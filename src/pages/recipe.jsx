import "./pages.style.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import NotFound from "../components/NotFound/notFound";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [videoError, setVideoError] = useState(false);
  // const [instructions, setInstructions] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const recipeResponse = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const recipeData = await recipeResponse.json();
        setRecipe(recipeData.meals[0]);
      } catch {
        console.error("villa");
      } finally {
        ///setja loading í false
      }
    };
    fetchData();
  }, [id]);

  if (!recipe) {
    return <NotFound />;
    // <div>Ekki tókst að ná í uppskrift</div>;
  }

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

  // const instructions = recipe.strInstructions;
  // const instruction = instructions.split("\r\n");

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
    </div>
  );
}
