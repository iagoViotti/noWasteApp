import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useState } from 'react';
import { useModal } from '../context/ModalContext';
import './AddItemModal.css';
import { ApiService } from '../utils';
import { useFridge } from '../context/FridgeContext';

const AddItemModal = () => {
  const { setModal, modalContent, cleanModal, setModalContent } = useModal();
  const { refreshFridgeItems } = useFridge();
  const [form, setForm] = useState<FridgeItem>({
    name: '',
    quantity: 1,
    expiry_date: '',
    type: 'food',
  });


  const addItem = async () => {
    try {
      await new ApiService().post('/', form);
      setModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setForm({
        name: '',
        quantity: 1,
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
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              cleanModal()
              setModal(false)
            }}
          >
            X
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div>
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-input"
                id="name"
                onChange={(e) => {
                  modalContent ?
                  setModalContent({ ...modalContent, name: e.target.value}):
                  setForm({ ...form, name: e.target.value });
                }}
                value={modalContent?.name}
              />
            </div>
            <div>
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-input"
                id="quantity"
                onChange={(e) => {
                  setForm({ ...form, quantity: Number(e.target.value) });
                }}
                placeholder={modalContent?.quantity.toString()}
              />
            </div>
            <div>
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
            <div>
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
                form.name === '' ||
                form.expiry_date === '' ||
                form.quantity === 0
              }
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
