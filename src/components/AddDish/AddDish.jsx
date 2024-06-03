import { useEffect, useState } from "react";
import "./AddDish.scss";

function AddDish({ setAddDish }) {
  const [dishInfo, setDishInfo] = useState({});
  const [dishImage, setDishImage] = useState("");
  const [dishName, setDishName] = useState("");
  const [dishPrice, setDishPrice] = useState("");

  useEffect(() => {
    setDishInfo({
      "dish-image": dishImage,
      "dish-name": dishName,
      "dish-price": dishPrice,
    });
  }, [dishImage, dishName, dishPrice]);

  const handleDishInfo = () => {
    console.log(dishInfo);
  };
  return (
    <div className="add-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="dish-image">Dish Image :</label>
        <input
          onChange={(e) => {
            setDishImage(e.target.value);
          }}
          type="file"
          id="dish-image"
          name="dish-image"
          accept="image/*"
        />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="dish-name">Dish Name :</label>
        <input
          onChange={(e) => {
            setDishName(e.target.value);
          }}
          type="text"
          id="dish-name"
          name="dish-name"
        />
      </div>
      <div className="dish-price-box dish-info-box">
        <label htmlFor="dish-price">Dish Price :</label>
        <input
          onChange={(e) => {
            setDishPrice(e.target.value);
          }}
          type="number"
          id="dish-price"
          name="dish-price"
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
