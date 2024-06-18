import { handleDate, deltaTimeInDays, ApiService, mapRange } from '../utils';
import { FridgeItemRowProps } from '../interfaces/fridgeItemRowprop';
import trash from '../assets/trash.svg';
import { useFridge } from '../context/FridgeContext';
import { useSelect } from '../context/SelectContext';
import { useModal } from '../context/ModalContext';

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
      return `hsl(${mapRange(days, 0, 20, 0, 70)}, 100%, 70%)`
    return 'antiquewhite'
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
        color: 'black'
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
          style={{ backgroundColor: 'firebrick', border: 'none' }}
          onClick={() => {
            handleDelete();
          }}
        >
          <img src={trash} alt="trash" />
        </button>
      </td>
      <td>
        <button
          onClick={() => handleEdit()}
        >...</button>
      </td>
    </tr>
  );
}

export default FridgeItemRow;