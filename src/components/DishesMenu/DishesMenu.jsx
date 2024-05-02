import React, { useState } from "react";
import "./DishesMenu.scss";

const DishesMenu = ({ filter, setFilter, foods }) => {
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

        <select
          className="order-type"
          value={filter}
          onChange={(e) => filterFoods(e.target.value)}
        >
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
