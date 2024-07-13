import { useState, useEffect } from "react";
import "./AddDish.scss";
import { getCategories } from "../../db/foods";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddDish({ addDish, setAddDish, fetchDishes }) {
  const [dishDetails, setDishDetails] = useState({
    image: "",
    description: "",
    category: {},
    price: 0,
    bowl: 0,
  });
  const [categories, setCategories] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      console.log(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const { image, description, category, price, bowl } = dishDetails;
    if (image && description && category.name && price > 0 && bowl > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [dishDetails]);

  const handleDishDetails = (e, categoryInfo) => {
    const { name, value } = e.target;
    setDishDetails({
      ...dishDetails,
      [name]: value,
      category: name === "category" ? categoryInfo : dishDetails.category,
    });
  };

  const handleDishInfo = async () => {
    if (isFormValid) {
      try {
        const dishesCollection = collection(db, "dishes");
        await addDoc(dishesCollection, dishDetails);
        toast.success("Dish added successfully!");

        setDishDetails({
          image: "",
          description: "",
          category: {},
          price: 0,
          bowl: 0,
        });

        localStorage.removeItem("dishes");

        await fetchDishes();

        setAddDish(false);
      } catch (error) {
        toast.error("There was an issue adding the dish.");
      }
    } else {
      toast.warn("Please fill in all the fields!");
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
          value={dishDetails.image}
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
          onChange={(e) => {
            const selectedCategory = categories.find(
              (category) => category.name === e.target.value
            );
            handleDishDetails(e, selectedCategory);
          }}
        >
          <option value="">Select a category</option>
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
      <ToastContainer />
    </div>
  );
}

export default AddDish;
