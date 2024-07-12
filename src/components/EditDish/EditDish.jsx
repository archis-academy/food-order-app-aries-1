import "./EditDish.scss";
import { getCategories } from "../../db/foods";
import { useEffect, useState } from "react";

function EditDish({ setEditDish, dishDetails, setDishDetails }) {
  const { image, description, category, price, bowl, id } = dishDetails;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      console.log(categories);
    };

    fetchCategories();
  }, []);

  const handleDishInputValues = (e) => {
    setDishDetails({
      ...dishDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditDish = () => {
    console.log(dishDetails);
    setDishDetails({
      image: "",
      description: "",
      category: "",
      price: 0,
      bowl: 0,
    });
    setEditDish(false);
  };

  return (
    <div className="edit-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="image">Dish Image :</label>
        <input
          type="text"
          id="image"
          name="image"
          value={image}
          onChange={handleDishInputValues}
        />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="description">Dish Name :</label>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleDishInputValues}
        />
      </div>
      <div className="dish-category-box dish-info-box">
        <label htmlFor="category">Dish Category :</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleDishInputValues}
        >
          {categories.map((category) => {
            return <option key={category.id}>{category.name}</option>;
          })}
        </select>
      </div>
      <div className="price-bowl-box">
        <div className="dish-price-box dish-info-box">
          <label htmlFor="price">Dish Price :</label>
          <input
            onChange={handleDishInputValues}
            type="number"
            min="0"
            id="price"
            name="price"
            value={price}
          />
        </div>
        <div className="bowl-quantity-box dish-info-box">
          <label htmlFor="bowl">Bowl Quantitiy :</label>
          <input
            onChange={handleDishInputValues}
            type="number"
            min="0"
            id="bowl"
            name="bowl"
            value={bowl}
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
