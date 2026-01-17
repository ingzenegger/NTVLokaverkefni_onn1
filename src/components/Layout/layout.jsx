import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./layout.style.css";
import FilterDropdown from "../FilterDropdown/filterDropdown";

export default function Layout({ children }) {
  //same as in home.jsx - look into helper functions?
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const URL = "https://www.themealdb.com/api/json/v1/1/";

  //fetch categories - almost same as home.jsx fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}categories.php`);
        const data = await response.json();
        setCategories(data.categories.map((item) => item.strCategory)); //map is different from home.jsx
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
        setAreas(data.meals.map((item) => item.strArea)); //map is different from home.jsx
      } catch {
        console.error("villa");
      } finally {
        //setja loading í false
      }
    };
    fetchData();
  }, []);

  // helper? end?

  return (
    <div className="layout">
      <header>
        <nav>
          <img src="/debug.png" alt="debug logo" className="logo-small" />
          <Link to="/" reloadDocument>
            Homepage
          </Link>
          <Link to="/recipes" reloadDocument>
            All recipes
          </Link>

          <div className="nav-filters">
            <FilterDropdown
              label="Category"
              type="category"
              options={categories}
            />
            <FilterDropdown label="Cuisine" type="area" options={areas} />
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        {/* <p>Debug My Dinner - footer</p> */}
        <Link to="/">
          <img
            src="/logo-debugdinner.png"
            alt="Debug My Dinner logo"
            className="logo"
          />
        </Link>
      </footer>
    </div>
  );
}
