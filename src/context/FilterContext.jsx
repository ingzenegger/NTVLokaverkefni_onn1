import { createContext, useContext } from "react";
import { useFetch } from "../hooks/useFetch";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

const FilterContext = createContext(null);

export function FilterProvider({ children }) {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch(`${BASE_URL}categories.php`);

  const {
    data: areasData,
    loading: areasLoading,
    error: areasError,
  } = useFetch(`${BASE_URL}list.php?a=list`);

  const categories =
    categoriesData?.categories?.map((item) => item.strCategory) ?? [];
  const areas = areasData?.meals?.map((item) => item.strArea) ?? [];

  return (
    <FilterContext.Provider
      value={{
        categories, //for layout
        areas, //for layout
        categoriesData, //for homepage
        areasData, //for homepage
        isLoading: categoriesLoading || areasLoading,
        hasError: categoriesError || areasError,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
