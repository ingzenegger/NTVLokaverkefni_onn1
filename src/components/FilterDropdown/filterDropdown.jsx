import { useNavigate } from "react-router-dom";
import "./filterDropdown.style.css";

export default function FilterDropdown({ label, type, options }) {
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      navigate("/recipes");
    } else {
      navigate(`/recipes/${type}/${value}`);
    }
  };

  return (
    <div className="filter-container">
      {/* <label htmlFor={`${type}-select`}>{label}:</label> */}

      <select
        id={`${type}-select`}
        onChange={handleFilterChange}
        className="filter-dropdown"
      >
        <option value="">Select {type}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
