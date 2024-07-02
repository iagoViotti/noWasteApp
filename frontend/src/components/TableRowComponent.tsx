import { handleDate, deltaTimeInDays, ApiService, mapRange } from '../utils';
import { FridgeItemRowProps } from '../interfaces/fridgeItemRowprop';
import trash from '../assets/trash.svg';
import { useFridge } from '../context/FridgeContext';
import { useSelect } from '../context/SelectContext';
import { useModal } from '../context/ModalContext';
import { ellipsis } from '../assets/';

const FridgeItemRow = ({ item }: FridgeItemRowProps) => {
  const { refreshFridgeItems } = useFridge();
  const { setModalContent, setModal } = useModal();
  const { id, name, quantity, expiry_date, type } = item;
  const { selectedItems, setSelectedItems } = useSelect()

  const handleDelete = async () => {
    try {
      await new ApiService().delete(`/${id}`)
      refreshFridgeItems()
    } catch (error) {
      console.error(error)
    }
  }

  const mapColorByDate = (days: number) => {
    if (days < 0)
      return `red`
    if (days < 20)
      return `hsla(${mapRange(days, 0, 20, 0, 70)}, 100%, 65%, 0.8)`
    return 'hsla(34, 78%, 91%, 0.5)'
  }

  const handleSelect = (checked: boolean) => {
    setSelectedItems((prev) => {
      if (checked) {
        return [...prev, item]
      } else {
        return prev.filter((i) => i.id !== item.id)
      }
    })
  }

  const handleEdit = () => {
    setModalContent(item)
    setModal(true)
  }

  return (
    <tr
      style={{
        backgroundColor: mapColorByDate(deltaTimeInDays(expiry_date)),
        userSelect: 'none'
      }}
    >
      <td>
        <input
          type="checkbox"
          onChange={(e) => { handleSelect(e.target.checked) }}
          checked={selectedItems.some((i) => i.id === id)}
        />
      </td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{handleDate(expiry_date)}</td>
      <td>{type}</td>
      <td>
        <button
          onClick={() => {
            handleDelete();
          }}
          className={`delete-button ${deltaTimeInDays(expiry_date) < 0 ? 'delete-button-expired' : ''}`}
        >
          <img src={trash} alt="trash" />
        </button>
      </td>
      <td>
        <button
          onClick={() => handleEdit()}
          className='edit-button'
        >
          <img src={ellipsis} alt="trash" />

        </button>
      </td>
    </tr>
  );
}

export default FridgeItemRow;