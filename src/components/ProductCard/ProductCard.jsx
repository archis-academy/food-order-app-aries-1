import "./ProductCard.scss";
import EditIcon from "../../assets/Edit.svg";
function ProductCard({ image, description, price }) {
  return (
    <>
      <div className="product-card">
        <img className="food-image" src={image} alt="product-image" />
        <div className="details">
          <p>{description}</p>
          <span>{price}</span>
        </div>
        <div className="edit-box">
          <img src={EditIcon} alt="edit-icon" />
          <p>Edit Dish</p>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
