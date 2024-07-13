import "./MostOrderedFood.scss";

const MostOrderedFood = ({ food }) => {
  const { image, description } = food;
  return (
    <div className="most-ordered-item">
      <img className="most-ordered-image" src={image} />
      <div className="most-ordered-item-info">
        <p className="most-ordered-description"> {description}</p>
        <p className="order-number">200 dishes ordered</p>
      </div>
    </div>
  );
};
export default MostOrderedFood;
