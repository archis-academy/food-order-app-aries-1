import "./DishesMenu.scss";

const DishesMenu = ({ filter, setFilter, filteredDishes }) => {
  // Filtreleme fonksiyonu
  const filterFoods = (orderType) => {
    setFilter(orderType);
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
