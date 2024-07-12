import "./OrderItem.scss";
import { useState } from "react";

const OrderItem = ({
  order,
  deleteItem,
  updateQuantity,
  updateNote,
  isArrowActive,
  isNoteActive,
}) => {
  const { id, image, description, quantity, price, note } = order;

  const totalPrice = quantity * price;

  const handleIncreaseQuantity = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleNoteChange = (e) => {
    updateNote(id, e.target.value);
  };

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

        <div className="quantity-box">
          <p className="order-item-quantity">{quantity}</p>
          {isArrowActive && (
            <div className="quantity-btns">
              <img
                className="increase-btn"
                src="/up1.svg"
                alt="up-btn-img"
                onClick={handleIncreaseQuantity}
              />

              <img
                className="decrease-btn"
                src="/down1.svg"
                alt="down-btn-img"
                onClick={handleDecreaseQuantity}
              />
            </div>
          )}
        </div>

        <p className="order-item-total-price">$ {totalPrice.toFixed(2)}</p>
      </div>
      <div className="order-item-bottom">
        {isNoteActive ? (
          <input
            type="text"
            className="order-item-note"
            placeholder="Order Note ..."
            value={note}
            onChange={handleNoteChange}
          />
        ) : (
          <p className="order-item-note">{note}</p>
        )}
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
