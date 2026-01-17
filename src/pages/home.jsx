//next todo: fix search option

import { useEffect, useState } from "react";
import IngrdntCard from "../components/IngredientCard/ingredientCard";
import Card from "../components/RecipeCard/recipeCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const featured = [53331, 53014, 52772]; //handpicked recipes
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [isHangry, setIsHangry] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const cantReachApi =
    "Oops, can't reach the kitchen, please try refreshing the page.";
  const URL = "https://www.themealdb.com/api/json/v1/1/";

  //FEATURED FETCH
  useEffect(() => {
    const fetchFeatured = async () => {
      let allFeatured = [];
      try {
        for (let i = 0; i < featured.length; i++) {
          const response = await fetch(`${URL}lookup.php?i=${featured[i]}`);
          const data = await response.json();
          allFeatured.push(...data.meals);
        }
      } catch {
        console.error("error: could not reach API");
        setErrorMessage(cantReachApi);
      } finally {
        setIsLoading(false);
      }
      setFeaturedMeals(allFeatured);
    };
    fetchFeatured();
  }, []);

  //RANDOM RECIPE FETCH, user clicks a button, changing state of isHangry to true, triggering random recipe useEffect.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}random.php`);
        const data = await response.json();
        setRandomRecipe(data.meals[0]);
      } catch {
        console.error("error: could not reach API");
        setErrorMessage(cantReachApi);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    console.log(randomRecipe);
  }, [isHangry]);

  //SEARCH FORM FETCH AND FUNCTIONS
  function handleChange(e) {
    setSearchString(e.target.value);
    setIsSearching(false);
  }

  useEffect(() => {
    if (!isSearching) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${URL}search.php?s=${searchString}`);
        const data = await response.json();
        setSearchResults(data.meals || []);
      } catch {
        console.error("error: could not reach API");
        setErrorMessage(cantReachApi);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [isSearching]);

  //CATEGORIES FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}categories.php`);
        const data = await response.json();
        setCategories(data.categories);
      } catch {
        console.error("error: could not reach API");
        setErrorMessage(cantReachApi);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  //AREAS FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}list.php?a=list`);
        const data = await response.json();
        setAreas(data.meals);
      } catch {
        console.error("error: could not reach API");
        setErrorMessage(cantReachApi);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Debug My Dinner</h1>

      {/* <h2>What are you debugging for?</h2> */}

      {featuredMeals.length > 0 ? (
        <div className="featured-container">
          <div className="featured1 featured">
            <h2>Featured 1</h2>
            <p>Sunday breakfast with the family?</p>
            <Card recipe={featuredMeals[0]} />
          </div>
          <div className="featured2 featured">
            <h2>Featured 2</h2>
            <p>Italian classic for friday night?</p>
            <Card recipe={featuredMeals[1]} />
          </div>
          <div className="featured3 featured">
            <h2>Featured 3</h2>
            <p>Craving some chicken?</p>
            <Card recipe={featuredMeals[2]} />
          </div>

          <div className="home-random-recipe featured">
            <h2>Hangry?</h2>
            {isHangry ? (
              <>
                <p>Try this one!</p>
                <Card recipe={randomRecipe} />
              </>
            ) : (
              <>
                <button onClick={() => setIsHangry(!isHangry)}>
                  "YES give me anything"
                </button>
                <p>Hit that button and we'll pick something at random!</p>
              </>
            )}
          </div>
        </div>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <p>...loading</p>
      )}

      <div className="home-search-container">
        <h3>Search recipe title</h3>
        <div className="home-search-form">
          <label>
            Find meal by name:
            <input type="text" onChange={handleChange} />
          </label>
          <button onClick={() => setIsSearching(!isSearching)}>
            Search {searchString}
          </button>
        </div>

        {isLoading ? (
          <p>Searching...</p>
        ) : (
          <>
            {searchResults.length > 0 ? (
              <div className="home-results-list">
                {searchResults.map((recipe) => (
                  <Card recipe={recipe} key={recipe.idMeal} />
                ))}
              </div>
            ) : searchString && isSearching ? (
              <p>
                {" "}
                {`Sorry! I could not find any recipes for ${searchString}`}
              </p>
            ) : (
              <p></p>
            )}
          </>
        )}
      </div>

      {/* <div className="home-popular-ingredients-container">
        <h3>Would you like to check out our most popular ingredients?</h3>
        <div className="home-popular-ingredients">
          <IngrdntCard ingredient={"chicken"} />
          <IngrdntCard ingredient={"salmon"} />
          <IngrdntCard ingredient={"beef"} />
          <IngrdntCard ingredient={"pork"} />
        </div>
      </div> */}

      <div className="home-categories-container">
        <h3>Browse categories</h3>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div className="home-categories-list">
            {categories.map((category) => (
              <IngrdntCard category={category} key={category.idCategory}>
                {category.strCategory}
                <img src={category.strCategoryThumb} alt="" />
              </IngrdntCard>
            ))}
          </div>
        )}
      </div>

      <div className="home-areas-container">
        <h3>Browse by area</h3>
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div className="home-areas-list">
            {areas.map((area) => (
              <IngrdntCard area={area} key={area.strArea}>
                {area.strArea}
              </IngrdntCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
