import ProductCard from "../ProductCard/ProductCard";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import { getDishes } from "../../db/foods";
import "./ProductsManagement.scss";
import CategoryTabs from "../CategoryTabs/CategoryTabs";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddDish from "../AddDish/AddDish";
import EditDish from "../EditDish/EditDish";
import Loading from "../Loading/Loading";

function ProductsManagement() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState(dishes);
  const [filterParameters, setFilterParameters] = useState({
    category: "All",
    searchQuery: "",
  });
  const [addDish, setAddDish] = useState(false);
  const [editDish, setEditDish] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dishDetails, setDishDetails] = useState({
    image: "",
    description: "",
    category: {},
    price: 0,
    bowl: 0,
    id: "",
  });
  const fetchDishes = async () => {
    const dishesData = await getDishes();
    setDishes(dishesData);
    setFilteredDishes(dishesData);
  };
  useEffect(() => {
    fetchDishes();
    setIsLoading(false);
  }, []);
  if (isLoading) return <Loading />;
  const handleDishDetails = (img, name, category, price, quantity, id) => {
    setDishDetails({
      image: img,
      description: name,
      category: category,
      price: price,
      bowl: quantity,
      id: id,
    });
  };

  const addSuccess = () => {
    toast.success("Dish added successfully!");
  };
  const editSuccess = () => {
    toast.success("Dish edited successfully!");
  };
  const deleteSuccess = () => {
    toast.success("Dish deleted successfully!");
  };

  return (
    <>
      <div className="management-container">
        <ToastContainer />
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
                id={food.id}
                image={food.image}
                description={food.description}
                price={food.price}
                onClick={() => {
                  handleDishDetails(
                    food.image,
                    food.description,
                    food.category,
                    food.price,
                    food.bowl,
                    food.id
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
                addDish={addDish}
                setAddDish={setAddDish}
                fetchDishes={fetchDishes}
                addSuccess={addSuccess}
              />
            )}
            {editDish && (
              <EditDish
                setEditDish={setEditDish}
                dishDetails={dishDetails}
                setDishDetails={setDishDetails}
                fetchDishes={fetchDishes}
                editSuccess={editSuccess}
                deleteSuccess={deleteSuccess}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
export default ProductsManagement;
