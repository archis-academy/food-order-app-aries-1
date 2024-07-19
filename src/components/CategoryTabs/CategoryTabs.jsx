import { useEffect, useState } from "react";
import "./CategoryTabs.scss";
import { getCategories } from "../../db/foods";

function CategoryTabs({
  setFilteredDishes,
  dishes,
  filterParameters,
  setFilterParameters,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);

      setActiveCategory("All");
    };

    fetchCategories();
  }, []);

  function filterDishesByCategory(categoryKey) {
    const newFilterParameters = {
      ...filterParameters,
      category: categoryKey,
    };
    setFilterParameters(newFilterParameters);
  }

  useEffect(() => {
    let filteredDishes = [];
    if (filterParameters.category === "All") {
      filteredDishes = dishes.filter((dish) => {
        const isSearchQueryMatch = dish.description
          .toLowerCase()
          .includes(filterParameters.searchQuery.toLowerCase());
        return isSearchQueryMatch;
      });
    } else {
      filteredDishes = dishes.filter((dish) => {
        const isCategoryMatch = dish.category.key === filterParameters.category;
        const isSearchQueryMatch = dish.description
          .toLowerCase()
          .includes(filterParameters.searchQuery.toLowerCase());
        return isCategoryMatch && isSearchQueryMatch;
      });
    }
    setFilteredDishes(filteredDishes);
  }, [filterParameters]);

  function handleActiveCategory(category) {
    setActiveCategory(category);
  }

  return (
    <ul className="category-tabs">
      <li
        onClick={() => {
          filterDishesByCategory("All");
          handleActiveCategory("All");
        }}
        className={activeCategory === "All" && "active"}
      >
        All
      </li>
      {categories.map((category) => (
        <li
          onClick={() => {
            filterDishesByCategory(category.key);
            handleActiveCategory(category);
          }}
          className={activeCategory === category && "active"}
          key={category.id}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoryTabs;
