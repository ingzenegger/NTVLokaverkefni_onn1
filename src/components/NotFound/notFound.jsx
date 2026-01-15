import "./notFound.style.css";
import Card from "../RecipeCard/recipeCard";
import { useState, useEffect } from "react";
import Loading from "../Loading/loading";

export default function NotFound() {
  const [allCookies, setAllCookies] = useState([]);
  const cookiesId = [53339, 52958, 53024];
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCookies = async () => {
      let cookies = [];
      try {
        for (let i = 0; i < cookiesId.length; i++) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${cookiesId[i]}`
          );
          const data = await response.json();
          cookies.push(...data.meals);
        }
      } catch {
        setError("villa kom upp!");
      } finally {
        setIsLoading(false);
      }
      setAllCookies(cookies);
    };
    fetchCookies();
  }, []);

  console.log(allCookies);
  //Loading:

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="notfound-heading">
        Sorry, I could not debug this dinner...
      </h2>
      <img src="/sad-debug.png" alt="sad bug" className="sad-bug-logo" />
      <div className="cookies-container">
        <p>Could I interest you in our cookies instead?</p>
        <div className="cookies">
          {allCookies.map((recipe) => (
            <Card recipe={recipe} key={recipe.idMeal} />
          ))}
        </div>
      </div>
    </div>
  );
}
