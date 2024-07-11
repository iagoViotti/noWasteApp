import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useState } from 'react';
import { useModal } from '../context/ModalContext';
import './AddItemModal.css';
import { ApiService, formatDate, verifyDate } from '../utils';
import { useFridge } from '../context/FridgeContext';

const AddItemModal = () => {
  const { setModal, modalContent, cleanModal, setModalContent } = useModal();
  const { refreshFridgeItems } = useFridge();
  const [form, setForm] = useState<FridgeItem>({
    name: '',
    quantity: 1,
    expiry_date: '',
    type: 'pronta',
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
        type: 'pronta',
      });
      refreshFridgeItems();
    }
  };

  const editItem = async () => {
    try {
      await new ApiService().put(`/${modalContent?.id}`, modalContent);
    } catch (error) {
      console.error(error);
    } finally {
      cleanModal();
      refreshFridgeItems();
      setModal(false);
    }
  };

  const handleDisable = (): boolean => {
    if (modalContent) return !verifyDate(modalContent.expiry_date)
    return !form.name || !form.quantity || !form.expiry_date || !form.type;
  }

  return (
    <>
      <div
        className="modal-overlay"
      >
        <div
          className="modal-background"
          onClick={() => {
            cleanModal()
            setModal(false)
          }}
        />
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title" id="addItemModalLabel">
              novo Item
            </h3>
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
              <div
                className='input-container'
              >
                <label htmlFor="name" className="form-label">Nome:</label>
                <input
                  type="text"
                  className="form-input"
                  id="name"
                  onChange={(e) => {
                    modalContent ?
                      setModalContent({ ...modalContent, name: e.target.value }) :
                      setForm({ ...form, name: e.target.value });
                  }}
                  value={modalContent?.name}
                />
              </div>
              <div
                className='input-container'
              >
                <label htmlFor="quantity" className="form-label">Quantidade:</label>
                <input
                  type="number"
                  className="form-input"
                  id="quantity"
                  onChange={(e) => {
                    modalContent ?
                      setModalContent({ ...modalContent, quantity: Number(e.target.value) }) :
                      setForm({ ...form, quantity: Number(e.target.value) });
                  }}
                  value={modalContent?.quantity}
                />
              </div>
              <div
                className='input-container'
              >
                <label htmlFor="type" className="form-label">Tipo:</label>
                <select
                  className="form-input"
                  id="type"
                  onChange={(e) => {
                    modalContent ?
                      setModalContent({ ...modalContent, type: e.target.value as FridgeItem['type'] }) :
                      setForm({ ...form, type: e.target.value as FridgeItem['type'] });
                  }}
                  value={modalContent?.type}
                >
                  <option value="pronta">Pronta</option>
                  <option value="hortifruti">Hortifruti</option>
                  <option value="bebida">Bebida</option>
                  <option value="doce">Doce</option>
                  <option value="carne">Carne</option>
                  <option value="grão">Grão</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div
                className='input-container'
              >
                <label htmlFor="expiry" className="form-label">Validade:</label>
                <input
                  type="date"
                  className="form-input"
                  id="expiry"
                  onChange={(e) => {
                    modalContent ?
                      setModalContent({ ...modalContent, expiry_date: e.target.value }) :
                      setForm({ ...form, expiry_date: e.target.value });
                  }}
                  value={
                    modalContent ? formatDate(modalContent.expiry_date) :
                      form.expiry_date
                  }
                />
              </div>
              <div
                className='button-container'
              >
                <button
                  type="button"
                  onClick={() =>
                    modalContent ?
                      editItem() :
                      addItem()}
                  disabled={handleDisable()}
                >
                  {
                    modalContent ?
                      'Edit' :
                      'Add'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddItemModal;
