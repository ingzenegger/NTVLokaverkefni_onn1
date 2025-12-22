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
        if (data.meals === null) {
          console.log(`No recipes for ${letter}, skipping...`);
          if (letter !== "z") {
            nextLetterIndex();
          } else {
            setLetter("a");
          }
        } else {
          setRecipes(data.meals);
        }
      } catch {
        setError("villa kom upp!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
    console.log(letters);
  }, [letter]);

  const nextLetterIndex = () => {
    const currentIndex = letters.indexOf(letter);
    const nextIndex = currentIndex + 1;
    currentIndex < letters.length ? setLetter(letters[nextIndex]) : null;
  };

  return (
    <div>
      <h1>All Recipes page</h1>
      <button onClick={nextLetterIndex}>Next letter</button> <p>{letter}</p>
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <Card recipe={recipe} key={recipe.idMeal} />
        ))}
      </div>
    </div>
  );
}
