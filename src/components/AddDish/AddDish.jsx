import { useState } from "react";
import "./AddDish.scss";
import { categories } from "../../db/foods";

function AddDish({ setAddDish }) {
  const [dishDetails, setDishDetails] = useState({
    dishImage: "",
    dishName: "",
    dishCategory: "",
    dishPrice: 0,
    bowlQuantity: 0,
  });

  const handleDishDetails = (e) => {
    setDishDetails({
      ...dishDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDishInfo = () => {
    console.log(dishDetails);

    setDishDetails({
      dishImage: "",
      dishName: "",
      dishCategory: "",
      dishPrice: 0,
      bowlQuantity: 0,
    });
  };
  return (
    <div className="add-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="dishImage">Dish Image :</label>
        <input
          onChange={handleDishDetails}
          type="file"
          id="dishImage"
          name="dishImage"
          accept="image/*"
          value={dishDetails.dishImage}
        />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="dishName">Dish Name :</label>
        <input
          onChange={handleDishDetails}
          type="text"
          id="dishName"
          name="dishName"
          value={dishDetails.dishName}
        />
      </div>
      <div className="dish-category-box dish-info-box">
        <label htmlFor="dishCategory">Dish Category :</label>
        <select
          name="dishCategory"
          id="dishCategory"
          value={dishDetails.category}
          onChange={handleDishDetails}
        >
          {categories.map((category) => {
            return <option>{category.name}</option>;
          })}
        </select>
      </div>
      <div className="price-bowl-box">
        <div className="dish-price-box dish-info-box">
          <label htmlFor="dishPrice">Dish Price :</label>
          <input
            onChange={handleDishDetails}
            type="number"
            min="0"
            id="dishPrice"
            name="dishPrice"
            value={dishDetails.dishPrice}
          />
        </div>
        <div className="bowl-quantity-box dish-info-box">
          <label htmlFor="bowlQuantity">Bowl Quantitiy :</label>
          <input
            onChange={handleDishDetails}
            type="number"
            min="0"
            id="bowlQuantity"
            name="bowlQuantity"
            value={dishDetails.bowlQuantity}
          />
        </div>
      </div>
      <div className="add-dish-buttons">
        <button
          onClick={() => {
            setAddDish(false);
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
        <button onClick={handleDishInfo} className="add-dish-btn">
          Add Dish
        </button>
      </div>
    </div>
  );
}
export default AddDish;
