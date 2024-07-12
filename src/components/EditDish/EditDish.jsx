import "./EditDish.scss";
import { categories } from "../../db/foods";

function EditDish({ setEditDish, dishDetails, setDishDetails }) {
  const { dishImage, dishName, dishCategory, dishPrice, bowlQuantity } =
    dishDetails;

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
      <div className="dish-category-box dish-info-box">
        <label htmlFor="dishCategory">Dish Category :</label>
        <select
          name="dishCategory"
          id="dishCategory"
          value={dishCategory}
          onChange={handleDishInputValues}
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
            onChange={handleDishInputValues}
            type="number"
            min="0"
            id="dishPrice"
            name="dishPrice"
            value={dishPrice}
          />
        </div>
        <div className="bowl-quantity-box dish-info-box">
          <label htmlFor="bowlQuantity">Bowl Quantitiy :</label>
          <input
            onChange={handleDishInputValues}
            type="number"
            min="0"
            id="bowlQuantity"
            name="bowlQuantity"
            value={bowlQuantity}
          />
        </div>
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
