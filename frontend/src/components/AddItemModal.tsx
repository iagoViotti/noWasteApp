import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useContext, useState } from 'react';
import ModalContext from '../context/ModalContext';
import './AddItemModal.css';
import { ApiService } from '../utils';
import { useFridge } from '../context/FridgeContext';

const AddItemModal = () => {
  const { setModal } = useContext(ModalContext);
  const { refreshFridgeItems } = useFridge();
  const [form, setForm] = useState<FridgeItem>({
    name: '',
    quantity: 0,
    expiry_date: '',
    type: 'food',
  });


  const addItem = async () => {
    try {
      console.log(form);
      const response = await new ApiService().post('/', form);
      console.log(response.data);

      setModal(false);

    } catch (error) {
      console.error(error);
    } finally {
      setForm({
        name: '',
        quantity: 0,
        expiry_date: '',
        type: 'food',
      });
      refreshFridgeItems();
    }
  };

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
              <input
                type="text"
                className="form-input"
                id="name"
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-input"
                id="quantity"
                onChange={(e) => {
                  setForm({ ...form, quantity: Number(e.target.value) });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select
                className="form-input"
                id="type"
                onChange={(e) => {
                  setForm({ ...form, type: e.target.value as FridgeItem['type'] });
                }}
              >
                <option value="food">Food</option>
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
                <option value="beverage">Beverage</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="expiry" className="form-label">Expiry</label>
              <input
                type="date"
                className="form-input"
                id="expiry"
                onChange={(e) => {
                  setForm({ ...form, expiry_date: e.target.value });
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => addItem()}
              disabled={
                !form.name ||
                !form.quantity ||
                !form.expiry_date}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AddItemModal;
