import "./FoodCard.scss";

const FoodCard = ({ id, image, description, price, bowl, onClick }) => {
  return (
    <div className="food-card" key={id} onClick={onClick}>
      <img className="food-image" src={image} />
      <p className="food-description"> {description}</p>
      <p className="food-price">{price}</p>
      <p className="food-bowl">{bowl} Bowls available</p>
    </div>
  );
};
export default FoodCard;
