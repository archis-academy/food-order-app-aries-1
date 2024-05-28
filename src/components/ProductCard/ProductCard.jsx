import "./ProductCard.scss";
import EditIcon from "../../assets/Edit.svg";
function ProductCard({ image, description, price }) {
  return (
    <>
      <div className="product-card">
        <img className="product-card-image" src={image} alt="product-image" />
        <div className="product-card-details">
          <p>{description}</p>
          <span>{price}</span>
        </div>
        <div className="product-card-edit-box">
          <img src={EditIcon} alt="edit-icon" />
          <p>Edit Dish</p>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
