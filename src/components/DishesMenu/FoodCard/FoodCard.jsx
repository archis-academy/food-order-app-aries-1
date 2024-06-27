import "./FoodCard.scss";

const FoodCard = ({ food, onClick }) => {
  const { image, description, price, bowl } = food;
  return (
    <div className="food-card" onClick={onClick}>
      <img className="food-image" src={image} />
      <p className="food-description"> {description}</p>
      <p className="food-price">$ {price}</p>
      <p className="food-bowl">{bowl} Bowls available</p>
    </div>
  );
};
export default FoodCard;
