import { Link } from "react-router-dom";
import "./layout.style.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <nav>
          <img src="/debug.png" alt="debug logo" className="logo-small" />
          <Link to="/">Homepage</Link>
          <Link to="/recipes">All recipes</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Debug My Dinner - footer</p>
      </footer>
    </div>
  );
}
