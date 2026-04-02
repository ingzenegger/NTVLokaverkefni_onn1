import "./browseAreas.style.css";
import { useFilters } from "../../context/FilterContext";
import IngrdntCard from "../IngredientCard/ingredientCard";

export default function BrowseAreas() {
  const { areasData, hasError, isLoading: isfetchLoading } = useFilters();

  const areas =
    areasData?.meals?.map((item) => ({
      name: item.strArea,
    })) ?? [];

  if (isfetchLoading) return <Loading />;

  return (
    <div className="home-areas-container">
      <h3>Browse by area</h3>
      {hasError ? (
        <p>Error</p>
      ) : (
        <div className="home-areas-list">
          {areas.map((area) => (
            <IngrdntCard area={area} key={area.name}>
              {area.name}
            </IngrdntCard>
          ))}
        </div>
      )}
    </div>
  );
}
