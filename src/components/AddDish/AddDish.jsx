import { useEffect, useState } from "react";
import "./AddDish.scss";

function AddDish({ setAddDish }) {
  const [dishDetails, setDishDetails] = useState({
    dishImage: "",
    dishName: "",
    dishPrice: "",
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
      dishPrice: "",
    });
  };
  return (
    <div className="add-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="dish-image">Dish Image :</label>
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
        <label htmlFor="dish-name">Dish Name :</label>
        <input
          onChange={handleDishDetails}
          type="text"
          id="dishName"
          name="dishName"
          value={dishDetails.dishName}
        />
      </div>
      <div className="dish-price-box dish-info-box">
        <label htmlFor="dish-price">Dish Price :</label>
        <input
          onChange={handleDishDetails}
          type="number"
          id="dishPrice"
          name="dishPrice"
          value={dishDetails.dishPrice}
        />
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
