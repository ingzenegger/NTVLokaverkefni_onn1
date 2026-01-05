import { useEffect, useState } from "react";
import IngrdntCard from "../components/IngredientCard/ingredientCard";
import Card from "../components/RecipeCard/recipeCard";

export default function HomePage() {
  const [isHangry, setIsHangry] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const URL = "https://www.themealdb.com/api/json/v1/1/";

  //For the random recipe, user clicks a button, changing state of isHangry to true, triggering random recipe useEffect.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}random.php`);
        const data = await response.json();
        setRandomRecipe(data.meals[0]);
      } catch {
        console.error("villa");
      } finally {
        //setja loading í false
      }
    };
    fetchData();
    console.log(randomRecipe);
  }, [isHangry]);

  return (
    <div>
      <h1>Debug My Dinner - Home</h1>

      <h2>What are you debugging for?</h2>

      <div className="home-random-recipe-container">
        <h3>Hangry?</h3>
        {isHangry ? (
          <Card recipe={randomRecipe} />
        ) : (
          <button onClick={() => setIsHangry(!isHangry)}>
            "YES give me anything"
          </button>
        )}
      </div>

      <div className="home-search-container">
        <h3>Search by keyword</h3>
        <div className="home-search">search bar</div>
      </div>
      <div className="home-popular-ingredients-container">
        <h3>Would you like to check out our most popular ingredients?</h3>
        <div className="home-popular-ingredients">
          <IngrdntCard ingredient={"chicken"} />
          <IngrdntCard ingredient={"salmon"} />
          <IngrdntCard ingredient={"beef"} />
          <IngrdntCard ingredient={"pork"} />
        </div>
      </div>
      <div className="home-categories-container">
        <h3>...browse our categories?</h3>
        <div className="home-categories-list">
          Available categories - slider?
        </div>
      </div>
      <div className="home-areas-container">
        <h3>...or even browse by area?</h3>
        <div className="home-areas-list">Available Areas - slider?</div>
      </div>
    </div>
  );
}
