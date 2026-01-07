//next todo: fetch and display available categories

import { useEffect, useState } from "react";
import IngrdntCard from "../components/IngredientCard/ingredientCard";
import Card from "../components/RecipeCard/recipeCard";

export default function HomePage() {
  const [isHangry, setIsHangry] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const URL = "https://www.themealdb.com/api/json/v1/1/";

  //search form functions
  function handleChange(e) {
    setSearchString(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}search.php?s=${searchString}`);
        const data = await response.json();
        setSearchResults(data.meals);
      } catch {
        console.error("villa");
      } finally {
        //setja loading í false
      }
    };
    fetchData();
  }, [isSearching]);

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

  //fetch categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}categories.php`);
        const data = await response.json();
        setCategories(data.categories);
      } catch {
        console.error("villa");
      } finally {
        //setja loading í false
      }
    };
    fetchData();
  }, []);

  //fetch awailble meal areas
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}list.php?a=list`);
        const data = await response.json();
        setAreas(data.meals);
      } catch {
        console.error("villa");
      } finally {
        //setja loading í false
      }
    };
    fetchData();
  }, []);

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
        <h3>Search by recipe title</h3>
        <div className="home-search-form">
          <label>
            Find meal by name:
            <input type="text" onChange={handleChange} />
          </label>
          <button onClick={() => setIsSearching(!isSearching)}>
            Search {searchString}
          </button>

          {isSearching ? (
            <div className="home-results-list">
              {searchResults.map((recipe) => (
                <Card recipe={recipe} key={recipe.idMeal} />
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
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
          {categories.map((category) => (
            <IngrdntCard category={category} key={category.idCategory}>
              {category.strCategory}
              <img src={category.strCategoryThumb} alt="" />
            </IngrdntCard>
          ))}
        </div>
      </div>

      <div className="home-areas-container">
        <h3>...or even browse by area?</h3>
        <div className="home-areas-list">
          {areas.map((area) => (
            <p key={area.strArea}>{area.strArea}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
