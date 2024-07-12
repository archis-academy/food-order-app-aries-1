import { useState } from "react";
import "./AddDish.scss";
import { categories } from "../../db/foods";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; // import storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddDish({ setAddDish }) {
  const [dishDetails, setDishDetails] = useState({
    image: "",
    description: "",
    category: "",
    price: 0,
    bowl: 0,
  });

  const handleDishDetails = (e) => {
    const { name, value, files } = e.target;
    setDishDetails({
      ...dishDetails,
      [name]: files ? files[0] : value,
    });
  };

  const handleDishInfo = async () => {
    try {
      let imageUrl = "";
      if (dishDetails.image) {
        const imageRef = ref(storage, `dishes/${dishDetails.image.name}`);
        const snapshot = await uploadBytes(imageRef, dishDetails.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const dishesCollection = collection(db, "dishes");
      await addDoc(dishesCollection, { ...dishDetails, image: imageUrl });

      setDishDetails({
        image: "",
        description: "",
        category: "",
        price: 0,
        bowl: 0,
      });
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
          type="file"
          id="image"
          name="image"
          accept="image/*"
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
