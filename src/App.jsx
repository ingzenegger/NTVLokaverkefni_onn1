import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/layout";
import RecipesPage from "./pages/recipes";
import NotFound from "./components/NotFound/notFound";
import RecipeDetailPage from "./pages/recipe";
import HomePage from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route
              path="/recipes/category/:category"
              element={<RecipesPage />}
            />
            <Route path="/recipes/area/:area" element={<RecipesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
