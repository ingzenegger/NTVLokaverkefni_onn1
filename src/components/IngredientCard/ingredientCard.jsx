// Clickable card to filter recipes by ingredient
// https://www.themealdb.com/images/ingredients/${ingredient}.png

//usable with category?

export default function IngrdntCard({ ingredient, category }) {
  return (
    <>
    {ingredient?
    <div className="ingredient-card">
      <img
        src={`https://www.themealdb.com/images/ingredients/${ingredient}-small.png`}
        alt={`${ingredient}`}
      />
    </div>
    : category?
    <div className="category-card">
      <img src={category.strCategoryThumb} alt={`${category.strCategory}`} />
      <p>{category.strCategory}</p>
    </div>
    : <p>blank</p>
    }
    </>
  );
}
