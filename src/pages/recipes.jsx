import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeDetailPage from "./recipe";
import Card from "../components/RecipeCard/recipeCard";
import "./pages.style.css";

//look up meals by first letter: www.themealdb.com/api/json/v1/1/search.php?f=a

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  // const [letter, setLetter] = useState("a");
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
    console.log(letters);
  }, []);

  // const nextLetterIndex = () => {
  //   const currentIndex = letters.indexOf(letter);
  //   const nextIndex = currentIndex + 1;
  //   currentIndex < letters.length ? setLetter(letters[nextIndex]) : null;
  // };

  if (isLoading) {
    return (
      // <!-- From Uiverse.io by vinodjangid07 -->
      <div className="loader">
        <div className="panWrapper">
          <div className="pan">
            <div className="food"></div>
            <div className="panBase"></div>
            <div className="panHandle"></div>
          </div>
          <div className="panShadow"></div>
        </div>
      </div>

      // <div className="loading-screen">
      //   <h2>Gathering all the recipes...</h2>
      //   <div className="spinner"></div> {/* You can style this later! */}
      // </div>
    );
  }

  return (
    <div>
      <h1>All Recipes page</h1>
      {/* <button onClick={nextLetterIndex}>Next letter</button> <p>{letter}</p> */}
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <Card recipe={recipe} key={recipe.idMeal} />
        ))}
      </div>
    </div>
  );
}
