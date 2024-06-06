import "./AddDish.scss";

function AddDish({ setAddDish, dishDetails, setDishDetails }) {
  const { dishImage, dishName, dishPrice } = dishDetails;
  const handleDishDetails = (e) => {
    setDishDetails({
      ...dishDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewDish = () => {
    console.log(dishDetails);

    setDishDetails({
      dishImage: "",
      dishName: "",
      dishPrice: "",
    });
  };

  const handleCancelBtn = () => {
    setAddDish(false);

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
        />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="dish-name">Dish Name :</label>
        <input
          onChange={handleDishDetails}
          type="text"
          id="dishName"
          name="dishName"
          value={dishName}
        />
      </div>
      <div className="dish-price-box dish-info-box">
        <label htmlFor="dish-price">Dish Price :</label>
        <input
          onChange={handleDishDetails}
          type="number"
          id="dishPrice"
          name="dishPrice"
          value={dishPrice}
        />
      </div>
      <div className="add-dish-buttons">
        <button onClick={handleCancelBtn} className="cancel-btn">
          Cancel
        </button>
        <button onClick={handleAddNewDish} className="add-dish-btn">
          Add Dish
        </button>
      </div>
    </div>
  );
}
export default AddDish;
