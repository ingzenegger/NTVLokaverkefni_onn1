//lookup meal detail by ID: www.themealdb.com/api/json/v1/1/lookup.php?i=52772

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [instructions, setInstructions] = useState(null);

  useEffect(() => {
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
  console.log(recipe);
  if (!recipe) {
    return <div>Ekki tókst að ná í uppskrift</div>;
  }

  return (
    <div>
      <h1>Recipe Detail page</h1>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt="" />
      <p>{recipe.strInstructions}</p>
    </div>
  );
}
