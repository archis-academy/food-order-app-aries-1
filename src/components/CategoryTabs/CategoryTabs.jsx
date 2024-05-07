import { categories } from "@/db/foods";

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
