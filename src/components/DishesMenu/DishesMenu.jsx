import "./DishesMenu.scss";

import FoodCard from "./FoodCard/FoodCard";

const DishesMenu = ({ filteredDishes, onFoodCardClick }) => {
  return (
    <div>
      <div className="dishes-menu-top">
        <h2 className="dishes-menu-title">Choose Dishes </h2>
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
