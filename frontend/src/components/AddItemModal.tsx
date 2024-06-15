// import FridgeItem from '../../../backend/src/interfaces/itemInterface';
import './AddItemModal.css';

const AddItemModal = () => {
  return (
    <>
      <div className="modal-container">
        <div className="modal-header">
          <h4 className="modal-title" id="addItemModalLabel">
            Add Item
          </h4>
          <button type="button" className="btn-close">
            X
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input type="number" className="form-control" id="quantity" />
            </div>
            <div className="mb-3">
              <label htmlFor="unit" className="form-label">Unit</label>
              <input type="text" className="form-control" id="unit" />
            </div>
            <div className="mb-3">
              <label htmlFor="expiry" className="form-label">Expiry</label>
              <input type="date" className="form-control" id="expiry" />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddItemModal;
