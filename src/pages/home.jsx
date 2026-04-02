import { useEffect, useState, useMemo } from "react";
import IngrdntCard from "../components/IngredientCard/ingredientCard";
import Card from "../components/RecipeCard/recipeCard";
import { Link } from "react-router-dom";
import { useMeals } from "../hooks/useMeals";
import { useFilters } from "../context/FilterContext";
import BrowseCategories from "../components/BrowseCategories/browseCategories";
import BrowseAreas from "../components/BrowseAreas/browseAreas";

export default function HomePage() {
  const URL = "https://www.themealdb.com/api/json/v1/1/";
  const [isLoading, setIsLoading] = useState(true);

  const featured = useMemo(() => {
    return [53331, 53014, 52772];
  }, []); //handpicked recipes - memoized for custom useMeals hook
  const {
    meals: featuredMeals,
    loading: featuredLoading,
    error: featuredError,
  } = useMeals(`${URL}lookup.php?i=`, featured);

  //TODO: move featured div to standalone component called browseFeatured and update the "hangry" to "fetch random recipe".

  //TODO: move search div to standalone component and improve function, perhaps with a useSearch custom hook

  const [isHangry, setIsHangry] = useState(false);
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const cantReachApi =
    "Oops, can't reach the kitchen, please try refreshing the page.";

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

  return (
    <div>
      <h1>Debug My Dinner</h1>

      {/* <h2>What are you debugging for?</h2> Subheading not necessary...revisit later? */}

      {featuredMeals.length > 0 ? (
        <div className="featured-container">
          <div className="featured1 featured">
            <h2>Featured</h2>
            <p>Sunday breakfast with the family?</p>
            <Card recipe={featuredMeals[0]} />
          </div>
          <div className="featured2 featured">
            <h2>Featured</h2>
            <p>Italian classic for friday night?</p>
            <Card recipe={featuredMeals[1]} />
          </div>
          <div className="featured3 featured">
            <h2>Featured</h2>
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

      <BrowseCategories />
      <BrowseAreas />
    </div>
  );
}
