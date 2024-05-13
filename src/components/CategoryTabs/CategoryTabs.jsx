import { categories } from "@/db/foods";
import { useState } from "react";
import "./CategoryTabs.scss";

function CategoryTabs({ setFilteredDishes, dishes }) {
  function filterDishesByCategory(categoryKey) {
    let filteredDishes = [];
    if (categoryKey === "all") {
      filteredDishes = dishes;
    } else {
      const newDishes = dishes.filter(
        (dish) => dish.category.key === categoryKey
      );
      filteredDishes = newDishes;
    }
    setFilteredDishes(filteredDishes);
  }

  const [activeCategory, setActiveCategory] = useState(null);
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
          className={activeCategory === category ? "active" : ""}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoryTabs;
