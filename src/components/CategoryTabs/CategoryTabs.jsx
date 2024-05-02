import { categories } from "@/db/foods";

function CategoryTabs({ setFilteredDishes, dishes }) {
  function filterDishesByCategory(categoryName) {
    let filteredDishes = [];
    if (categoryName === "all") {
      setFilteredDishes(dishes);
      return;
    } else {
      const newDishes = dishes.filter(
        (dish) => dish.category.key === categoryName
      );
      filteredDishes = newDishes;
    }
    setFilteredDishes(filteredDishes);
  }

  return (
    <ul>
      {categories.map((category) => (
        <li onClick={() => filterDishesByCategory(category.key)}>
          {category.name}
        </li>
      ))}
    </ul>
  );
}

export default CategoryTabs;
