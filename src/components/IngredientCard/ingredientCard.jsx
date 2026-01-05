// Clickable card to filter recipes by ingredient
// https://www.themealdb.com/images/ingredients/${ingredient}.png

//usable with category?

export default function IngrdntCard({ ingredient }) {
  return (
    <div className="ingredient-card">
      <img
        src={`https://www.themealdb.com/images/ingredients/${ingredient}-small.png`}
        alt={`${ingredient}`}
      />
    </div>
  );
}
