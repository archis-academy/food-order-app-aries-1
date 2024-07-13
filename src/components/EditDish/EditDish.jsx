import "./EditDish.scss";
import { getCategories } from "../../db/foods";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ToastContainer, toast } from "react-toastify";

function EditDish({ setEditDish, dishDetails, setDishDetails, fetchDishes }) {
  const { image, description, category, price, bowl, id } = dishDetails;
  const [categories, setCategories] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      console.log(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!image || !description || !category.name || price === 0 || bowl === 0) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [dishDetails]);

  const handleDishInputValues = (e, categoryInfo) => {
    const { name, value } = e.target;
    setDishDetails({
      ...dishDetails,
      [name]: value,
      category: name === "category" ? categoryInfo : dishDetails.category,
    });
  };

  const handleEditDish = async () => {
    if (!image || !description || !category.name || price <= 0 || bowl <= 0) {
      toast.warn("Please fill in all the fields!");
      return;
    }

    try {
      const docRef = doc(db, "dishes", id);
      await updateDoc(docRef, dishDetails);

      setDishDetails({
        image: "",
        description: "",
        category: {},
        price: 0,
        bowl: 0,
      });

      localStorage.removeItem("dishes");
      await fetchDishes();

      setEditDish(false);
      setTimeout(() => {
        toast.success("Dish edited successfully!");
      }, 500);
    } catch (error) {
      toast.error("There was an issue editing the dish.");
    }
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
          value={category.name}
          onChange={(e) => {
            const selectedCategory = categories.find(
              (category) => category.name === e.target.value
            );
            handleDishInputValues(e, selectedCategory);
          }}
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
        <button className="edit-modal-delete-btn">Delete Dish</button>
        <button
          onClick={() => {
            console.log(dishDetails);
            handleEditDish();
          }}
          className="edit-dish-btn"
        >
          Edit Dish
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
export default EditDish;
