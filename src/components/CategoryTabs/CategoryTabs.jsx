import { categories } from "@/db/foods";
import { useState } from "react";
import "./CategoryTabs.scss";

function CategoryTabs({
  setFilteredDishes,
  dishes,
  filterParameters,
  setFilterParameters,
}) {
  function filterDishesByCategory(categoryKey) {
    let filteredDishes = [];
    if (categoryKey === "all") {
      filteredDishes = dishes;
    } else {
      const newFilterParameters = {
        ...filterParameters,
        category: categoryKey,
      };
      filteredDishes = dishes.filter((dish) => {
        return (
          (newFilterParameters.orderType === "All" ||
            dish.orderType === newFilterParameters.orderType) &&
          dish.category.key === newFilterParameters.category &&
          dish.description.includes(newFilterParameters.searchQuery)
        );
      });
      setFilterParameters(newFilterParameters);
    }
    setFilteredDishes(filteredDishes);
    console.log(filteredDishes);
  }

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  function handleActiveCategory(category) {
    setActiveCategory(category);
  }

  return (
    <ul className="category-tabs">
      {categories.map((category) => (
        <li
          onClick={() => {
            filterDishesByCategory(category.key);
            handleActiveCategory(category);
          }}
          className={activeCategory === category && "active"}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoryTabs;
