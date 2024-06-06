import "./ViewAllModal.scss";

const ViewAllModal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-title">Most Ordered</p>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};
export default ViewAllModal;
