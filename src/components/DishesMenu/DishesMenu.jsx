import "./DishesMenu.scss";
import { useEffect } from "react";
import FoodCard from "./FoodCard/FoodCard";

const DishesMenu = ({
  dishes,
  setFilteredDishes,
  filterParameters,
  setFilterParameters,
  filteredDishes,
  onFoodCardClick,
}) => {
  function filterDishesByOrderType(orderType) {
    const newFilterParameters = {
      ...filterParameters,
      orderType: orderType,
    };
    setFilterParameters(newFilterParameters);
  }
  console.log(dishes);
  useEffect(() => {
    const filteredDishes = dishes.filter((dish) => {
      const isOrderTypeMatch =
        filterParameters.orderType === "All" ||
        dish.orderType === filterParameters.orderType;

      const isCategoryMatch =
        filterParameters.category === "all" ||
        dish.category.key === filterParameters.category;

      const isSearchQueryMatch = dish.description
        .toLowerCase()
        .includes(filterParameters.searchQuery.toLowerCase());

      return isOrderTypeMatch && isCategoryMatch && isSearchQueryMatch;
    });

    setFilteredDishes(filteredDishes);
  }, [dishes, filterParameters]);

  return (
    <div>
      <div className="dishes-menu-top">
        <h2 className="dishes-menu-title">Choose Dishes </h2>

        <select
          className="order-type"
          value={filterParameters.orderType}
          onChange={(e) => {
            const selectedFilter = e.target.value;
            filterDishesByOrderType(selectedFilter);
            console.log(selectedFilter);
          }}
        >
          <option value="All">All</option>
          <option value="Dine In">Dine In</option>
          <option value="To Go">To Go</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      <div className="dishes-menu">
        {filteredDishes.map((food) => {
          return (
            <FoodCard
              key={food.id}
              food={food}
              onClick={() => onFoodCardClick(food)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DishesMenu;
