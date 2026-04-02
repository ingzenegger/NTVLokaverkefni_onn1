import { useFilters } from "../../context/FilterContext";
import Loading from "../Loading/loading";
import "./browseCategories.style.css";
import IngrdntCard from "../IngredientCard/ingredientCard";

export default function BrowseCategories() {
  const { categoriesData, hasError, isLoading: isfetchLoading } = useFilters();
  const categories =
    categoriesData?.categories?.map((item) => ({
      id: item.idCategory,
      name: item.strCategory,
      thumb: item.strCategoryThumb,
    })) ?? [];

  if (isfetchLoading) return <Loading />;

  return (
    <div className="home-categories-container">
      <h3>Browse categories</h3>

      <div className="home-categories-list">
        {categories.map((category) => (
          <IngrdntCard category={category} key={category.id}>
            {category.name}
            <img src={category.thumb} alt="" />
          </IngrdntCard>
        ))}
      </div>
    </div>
  );
}
