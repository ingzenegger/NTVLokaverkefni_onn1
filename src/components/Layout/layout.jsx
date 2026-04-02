import { Link } from "react-router-dom";
import "./layout.style.css";
import FilterDropdown from "../FilterDropdown/filterDropdown";
import { useFilters } from "../../context/FilterContext";
import Loading from "../Loading/loading";


export default function Layout({ children }) {
  const { categories, areas, isLoading } = useFilters();

  if (isLoading) return <Loading />;

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
        <Link to="/" reloadDocument>
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
