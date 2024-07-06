import ProductCard from "../ProductCard/ProductCard";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import { getDishes } from "../../db/foods";
import "./ProductsManagement.scss";
import CategoryTabs from "../CategoryTabs/CategoryTabs";
import { useState, useEffect } from "react";

import AddDish from "../AddDish/AddDish";
import EditDish from "../EditDish/EditDish";

function ProductsManagement() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  const [filterParameters, setFilterParameters] = useState({
    orderType: "All",
    category: "all",
    searchQuery: "",
  });
  const [addDish, setAddDish] = useState(false);
  const [editDish, setEditDish] = useState(false);
  const [dishDetails, setDishDetails] = useState({
    dishImage: "",
    dishName: "",
    dishCategory: "",
    dishPrice: 0,
    bowlQuantity: 0,
  });

  useEffect(() => {
    const fetchDishes = async () => {
      const dishesData = await getDishes();
      setDishes(dishesData);
      setFilteredDishes(dishesData);
    };

    fetchDishes();
  }, [dishes]);

  const handleDishDetails = (img, name, category, price, quantity) => {
    setDishDetails({
      dishImage: img,
      dishName: name,
      dishCategory: category,
      dishPrice: price,
      bowlQuantity: quantity,
    });
  };

  return (
    <>
      <div className="management-container">
        <div className="header-sticky">
          <SettingsHeader />
          <CategoryTabs
            dishes={dishes}
            setFilteredDishes={setFilteredDishes}
            filterParameters={filterParameters}
            setFilterParameters={setFilterParameters}
          />
        </div>
        <div className="product-cards-container">
          <div
            className="add-dish-card"
            onClick={() => {
              setAddDish(true);
            }}
          >
            <span>+</span>
            <p>Add new dish</p>
          </div>
          {filteredDishes.map((food) => {
            return (
              <ProductCard
                key={food.id}
                image={food.image}
                description={food.description}
                price={food.price}
                onClick={() => {
                  handleDishDetails(
                    food.image,
                    food.description,
                    food.category,
                    food.price,
                    food.bowl
                  );
                  setEditDish(true);
                  console.log(dishDetails);
                }}
              />
            );
          })}
        </div>

        {(addDish || editDish) && (
          <div className="overlay-container">
            {addDish && (
              <AddDish
                setAddDish={setAddDish}
                dishDetails={dishDetails}
                setDishDetails={setDishDetails}
              />
            )}
            {editDish && (
              <EditDish
                setEditDish={setEditDish}
                dishDetails={dishDetails}
                setDishDetails={setDishDetails}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default ProductsManagement;
