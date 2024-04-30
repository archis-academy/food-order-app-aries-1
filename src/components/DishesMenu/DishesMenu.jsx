import React, { useState } from "react";
import "./DishesMenu.scss";

const DishesMenu = () => {
  const [filter, setFilter] = useState("All");
  const foods = [
    {
      id: 1,
      image: "/Image-2.png",
      description: "Spicy seasoned seafood noodles ",
      price: "$ 2.29",
      bowl: "20",
      orderType: "Dine In",
      type: "Hot Dishes",
    },
    {
      id: 2,
      image: "/Image-2.png",
      description: "Salted Pasta with mushroom sauce ",
      price: "$ 2.69",
      bowl: "11",
      orderType: "Dine In",
      type: "Hot Dishes",
    },
    {
      id: 3,
      image: "/Image-3.png",
      description: "Beef dumpling in hot and sour soup ",
      price: "$ 2.99",
      bowl: "16",
      orderType: "Dine In",
      type: "Soup",
    },
    {
      id: 4,
      image: "/Image-5.png",
      description: "Healthy noodle with spinach leaf ",
      price: "$ 3.29",
      bowl: "22",
      orderType: "To go",
      type: "Cold Dishes",
    },
    {
      id: 5,
      image: "/Image-5.png",
      description: "Hot spicy fried rice with omelet ",
      price: "$ 3.49",
      bowl: "13",
      orderType: "Delivery",
      type: "Hot Dishes",
    },
    {
      id: 6,
      image: "/Image-6.png",
      description: "Spicy instant noodle with special omelette ",
      price: "$ 3.59",
      bowl: "17",
      orderType: "To go",
      type: "Hot Dishes",
    },
  ];

  // Filtreleme fonksiyonu
  const filterFoods = (orderType) => {
    setFilter(orderType);
  };

  // Filtrelenmiş yemekleri getiren fonksiyon
  const getFilteredFoods = () => {
    if (filter === "All") {
      return foods;
    } else {
      return foods.filter((food) => food.orderType === filter);
    }
  };

  return (
    <div>
      <div className="dishes-menu-top">
        <h2 className="dishes-menu-title">Choose Dishes </h2>

        <select value={filter} onChange={(e) => filterFoods(e.target.value)}>
          <option value="All">All</option>
          <option value="Dine In">Dine In</option>
          <option value="To go">To go</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      <div className="dishes-menu">
        {getFilteredFoods().map((foods) => (
          <div className="food-card" key={foods.id}>
            <img className="food-image" src={foods.image} />
            <p className="food-description"> {foods.description}</p>
            <p className="food-price">{foods.price}</p>
            <p className="food-bowl">{foods.bowl} Bowls available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishesMenu;
