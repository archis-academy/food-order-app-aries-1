import ProductCard from "../ProductCard/ProductCard";
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import { foods } from "../../db/foods";
import "./ProductsManagement.scss";

function ProductsManagement() {
  return (
    <>
      <div className="management-container">
        <SettingsHeader />
        <div className="product-cards-container">
          <div className="add-dish-card">
            <span>+</span>
            <p>Add new dish</p>
          </div>
          {foods.map((food) => {
            return (
              <ProductCard
                key={food.id}
                image={food.image}
                description={food.description}
                price={food.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ProductsManagement;
