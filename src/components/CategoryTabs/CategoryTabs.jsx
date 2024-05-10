import { categories } from "@/db/foods";
import { useEffect, useState } from "react";
import "./CategoryTabs.scss";

function CategoryTabs({
  setFilteredDishes,
  dishes,
  filterParameters,
  setFilterParameters,
}) {
  function filterDishesByCategory(categoryKey) {
    const newFilterParameters = {
      ...filterParameters,
      category: categoryKey,
    };
    setFilterParameters(newFilterParameters);
  }

  useEffect(() => {
    let filteredDishes = [];
    if (filterParameters.category === "all") {
      filteredDishes = dishes;
    } else {
      filteredDishes = dishes.filter((dish) => {
        const isOrderTypeMatch =
          filterParameters.orderType === "All" ||
          dish.orderType === filterParameters.orderType;
        const isCategoryMatch = dish.category.key === filterParameters.category;
        const isSearchQueryMatch = dish.description
          .toLowerCase()
          .includes(filterParameters.searchQuery.toLowerCase());
        return isOrderTypeMatch && isCategoryMatch && isSearchQueryMatch;
      });
    }
    setFilteredDishes(filteredDishes);
  }, [filterParameters]);

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
          key={category.id}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoryTabs;
