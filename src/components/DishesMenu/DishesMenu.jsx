import { useState } from "react";
import "./DishesMenu.scss";
import { useEffect } from "react";
import { set } from "firebase/database";

const DishesMenu = ({
  dishes,
  setFilteredDishes,
  filterParameters,
  setFilterParameters,
  filteredDishes,
}) => {
  const [filter, setFilter] = useState("All");

  function filterDishesByOrderType(orderType) {
    const newFilterParameters = {
      ...filterParameters,
      orderType: orderType,
    };
    setFilterParameters(newFilterParameters);
  }

  // const filterFoods = (orderType) => {
  //   let newDishes = [];
  //   if (orderType === "All") {
  //     newDishes = dishes;
  //   } else {
  //     newDishes = dishes.filter((dish) => {
  //       const isOrderTypeMatch = dish.orderType === orderType;
  //       const isCategoryMatch =
  //         dish.category === filterParameters.category ||
  //         filterParameters.category === "all";
  //       const isSearchQueryMatch = dish.description.includes(
  //         filterParameters.searchQuery
  //       );

  //       return isOrderTypeMatch && isCategoryMatch && isSearchQueryMatch;
  //     });
  //   }
  //   setFilteredDishes(newDishes);
  // };

  // useEffect(() => {
  //   const filteredDishes = dishes.filter((dish) => {
  //     const isOrderTypeMatch =
  //       filterParameters.orderType === "All" ||
  //       dish.orderType === filterParameters.orderType;

  //     const isCategoryMatch =
  //       filterParameters.category === "all" ||
  //       dish.category.key === filterParameters.category;

  //     const isSearchQueryMatch = dish.description
  //       .toLowerCase()
  //       .includes(filterParameters.searchQuery.toLowerCase());

  //     return isOrderTypeMatch && isCategoryMatch && isSearchQueryMatch;
  //   });

  //   setFilteredDishes(filteredDishes);
  // }, [dishes, filterParameters]);

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
            setFilter(selectedFilter);
            console.log(selectedFilter);
          }}
        >
          <option value="All">All</option>
          <option value="Dine In">Dine In</option>
          <option value="To go">To go</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      <div className="dishes-menu">
        {filteredDishes.map((foods) => {
          const { id, image, description, price, bowl } = foods;
          return (
            <div className="food-card" key={id}>
              <img className="food-image" src={image} />
              <p className="food-description"> {description}</p>
              <p className="food-price">{price}</p>
              <p className="food-bowl">{bowl} Bowls available</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishesMenu;
