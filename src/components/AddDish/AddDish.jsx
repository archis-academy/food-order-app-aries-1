import { useState } from "react";
import "./AddDish.scss";
import { getCategories } from "../../db/foods";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

function AddDish({ setAddDish, setUpdateDishes }) {
  const [dishDetails, setDishDetails] = useState({
    image: "",
    description: "",
    category: "",
    price: 0,
    bowl: 0,
  });

  let categories;
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      categories = categoriesData;
      console.log(categories);
    };

    fetchCategories();
  }, []);

  const handleDishDetails = (e) => {
    const { name, value, files } = e.target;
    setDishDetails({
      ...dishDetails,
      [name]: files ? files[0] : value,
    });
  };

  const handleDishInfo = async () => {
    try {
      const dishesCollection = collection(db, "dishes");
      await addDoc(dishesCollection, dishDetails);

      setDishDetails({
        image: "",
        description: "",
        category: "",
        price: 0,
        bowl: 0,
      });
      localStorage.removeItem("dishes");
      setUpdateDishes((prev) => !prev);
      setAddDish(false);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="add-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="image">Dish Image :</label>
        <input
          onChange={handleDishDetails}
          type="text"
          id="image"
          name="image"
          value={image}
        />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="description">Dish Name :</label>
        <input
          onChange={handleDishDetails}
          type="text"
          id="description"
          name="description"
          value={dishDetails.description}
        />
      </div>
      <div className="dish-category-box dish-info-box">
        <label htmlFor="category">Dish Category :</label>
        <select
          name="category"
          id="category"
          value={dishDetails.category}
          onChange={handleDishDetails}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="price-bowl-box">
        <div className="dish-price-box dish-info-box">
          <label htmlFor="price">Dish Price :</label>
          <input
            onChange={handleDishDetails}
            type="number"
            min="0"
            id="price"
            name="price"
            value={dishDetails.price}
          />
        </div>
        <div className="bowl-quantity-box dish-info-box">
          <label htmlFor="bowl">Bowl Quantity :</label>
          <input
            onChange={handleDishDetails}
            type="number"
            min="0"
            id="bowl"
            name="bowl"
            value={dishDetails.bowl}
          />
        </div>
      </div>
      <div className="add-dish-buttons">
        <button onClick={() => setAddDish(false)} className="cancel-btn">
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
