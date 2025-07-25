import { createContext, useContext } from "react";
import { useLocalStorage } from "../../customHooks";

const CategoriesContext = createContext(undefined);

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useLocalStorage("categories", []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export function useCategories() {
  const { categories, setCategories } = useContext(CategoriesContext);

  if (categories === undefined || setCategories === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return { categories, setCategories };
}