import "./AddDish.scss";

function AddDish({ setAddDish }) {
  return (
    <div className="add-dish-container">
      <div className="dish-image-box dish-info-box">
        <label htmlFor="dish-image">Dish Image :</label>
        <input type="file" id="dish-image" name="dish-image" accept="image/*" />
      </div>
      <div className="dish-name-box dish-info-box">
        <label htmlFor="dish-name">Dish Name :</label>
        <input type="text" id="dish-name" name="dish-name" />
      </div>
      <div className="dish-price-box dish-info-box">
        <label htmlFor="dish-price">Dish Price :</label>
        <input type="text" id="dish-price" name="dish-price" />
      </div>
      <div className="add-dish-buttons">
        <button
          onClick={() => {
            setAddDish(false);
          }}
          className="cancel-btn"
        >
          Cancel
        </button>
        <button className="add-dish-btn">Add Dish</button>
      </div>
    </div>
  );
}
export default AddDish;

// function AddDish() {
//     return (
//       <div className="add-dish-container">
//         <div className="image-label-box">
//           <label htmlFor="add-dish-image" className="add-dish-image-label">
//             <img src={photographyIcon} alt="" />
//           </label>
//         </div>
//         <input
//           type="file"
//           className="add-dish-image-input"
//           placeholder="Add dish image"
//           id="add-dish-image"
//           name="add-dish-image"
//           accept="image/*"
//         />

//         <input
//           type="text"
//           className="add-dish-name add-dish-input"
//           placeholder="Dish Name"
//         />

//         <input
//           type="text"
//           className="add-dish-price add-dish-input"
//           placeholder="Price"
//         />

//         <div className="add-dish-buttons">
//           <button className="cancel-btn">Cancel</button>
//           <button className="add-dish-btn">Add Dish</button>
//         </div>
//       </div>
//     );
//   }
//   export default AddDish;
