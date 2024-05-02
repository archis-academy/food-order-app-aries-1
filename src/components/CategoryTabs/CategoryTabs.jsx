import { categories } from "@/db/foods";

function CategoryTabs({ setFilteredDishes, dishes }) {
  function filterDishesByCategory(categoryName) {
    const filteredDishes = dishes.filter(
      (dish) => dish.category.key === categoryName
    );
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
