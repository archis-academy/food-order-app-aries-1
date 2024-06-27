import "./EditDish.scss";

function EditDish({ setEditDish, dishDetails, setDishDetails }) {
  const { dishImage, dishName, dishPrice } = dishDetails;

  const handleDishInputValues = (e) => {
    setDishDetails({
      ...dishDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditDish = () => {
    console.log(dishDetails);
    setDishDetails({ dishImage: "", dishName: "", dishPrice: "" });
    setEditDish(false);
  };

  return (
    <div className="edit-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="dish-image">Dish Image :</label>
        <input type="file" id="dishImage" name="dishImage" accept="image/*" />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="dish-name">Dish Name :</label>
        <input
          type="text"
          id="editDishName"
          name="dishName"
          value={dishName}
          onChange={handleDishInputValues}
        />
      </div>
      <div className="dish-price-box dish-info-box">
        <label htmlFor="dish-price">Dish Price :</label>
        <input
          type="number"
          id="dishPrice"
          name="dishPrice"
          value={dishPrice}
          onChange={handleDishInputValues}
        />
      </div>
      <div className="edit-dish-buttons">
        <button
          onClick={() => {
            setEditDish(false);
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
        <button onClick={handleEditDish} className="edit-dish-btn">
          Edit Dish
        </button>
      </div>
    </div>
  );
}
export default EditDish;
