import { handleDate, deltaTimeInDays, ApiService, mapRange } from '../utils';
import { FridgeItemRowProps } from '../interfaces/fridgeItemRowprop';
import trash from '../assets/trash.svg';
import { useFridge } from '../context/FridgeContext';
import { useSelect } from '../context/SelectContext';
import { useModal } from '../context/ModalContext';
import { ellipsis, pronta, hortifruti, bebida, doce, grao, carne, outro } from '../assets/';

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

  const mapType: { [key: string]: string } = {
    'pronta': pronta,
    'hortifruti': hortifruti,
    'bebida': bebida,
    'doce': doce,
    'outro': outro,
    'carne': carne,
    'grão': grao,
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
          className='checkbox'
        />
      </td>
      <td
        className={`${deltaTimeInDays(expiry_date) < 0 ? 'expired' : ''}`}
      >{name}</td>
      <td
        className={`${deltaTimeInDays(expiry_date) < 0 ? 'expired' : ''}`}
      >{quantity}</td>
      <td
        className={`${deltaTimeInDays(expiry_date) < 0 ? 'expired' : ''}`}
      >{handleDate(expiry_date)}</td>
      <td   >
        {
          type
          &&
          <img src={mapType[type]} alt={type} />
        }
        {/* <div
          className='tooltip'
        >
          {type}
        </div> */}
      </td>
      <td>
        <button
          onClick={() => handleEdit()}
          className='edit-button'
          style={{
            backgroundColor: mapColorByDate(deltaTimeInDays(expiry_date)),
            border: '1px solid hsla(0, 0%, 100%, 0.3)',
          }}
        >
          <img src={ellipsis} alt="trash" />

        </button>
      </td>
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
    </tr>
  );
}

export default FridgeItemRow;