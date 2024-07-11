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
      console.log(categories);
      setActiveCategory(categories[0]);
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
    if (filterParameters.category === "all") {
      filteredDishes = dishes;
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
