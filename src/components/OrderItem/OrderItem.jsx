import "./OrderItem.scss";

const OrderItem = ({ order, deleteItem }) => {
  const { image, description, quantity, price, orderNote } = order;

  const totalPrice = quantity * price;

  return (
    <div className="order-item-container">
      <div className="order-item-top">
        <div className="order-item">
          <img className="order-item-img" src={image} alt={description} />
          <div className="order-item-details">
            <p className="order-item-description">{description}</p>
            <p className="order-item-price">$ {price}</p>
          </div>
        </div>
        <p className="order-item-quantity">{quantity}</p>
        <p className="order-item-total-price">$ {totalPrice.toFixed(2)}</p>
      </div>
      <div className="order-item-bottom">
        <input
          type="text"
          className="order-item-note"
          placeholder="Order Note ..."
        />
        <button
          className="order-item-delete-btn"
          onClick={() => deleteItem(order.id)}
        >
          <img src="\Trash.svg" alt="Trash Icon" />
        </button>
      </div>
    </div>
  );
};
export default OrderItem;
