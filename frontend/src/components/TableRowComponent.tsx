import { handleDate } from '../utils';
import { FridgeItemRowProps } from '../interfaces/fridgeItemRowprop';
import trash from '../assets/trash.svg';
import { useFridge } from '../context/FridgeContext';
import ApiService from '../utils/requests';
import { deltaTimeInDays } from '../utils/deltaTime';

const FridgeItemRow = ({ item }: FridgeItemRowProps) => {
  const { refreshFridgeItems } = useFridge();
  const { id, name, quantity, expiry_date, type } = item

  const handleDelete = async () => {
    try {
      await new ApiService().delete(`/${id}`)
      refreshFridgeItems()
    } catch (error) {
      console.error(error)
    }
  }


  const mapExpiryDate = (days: number) => {
    if (days < 0) {
      return 'crimson';
    } else if (days < 2) {
      return 'darkorange';
    } else if (days < 7) {
      return 'coral';
    } else if (days < 30) {
      return 'gold';
    } else {
      return 'antiquewhite';
    }
  }


  return (
    <tr
      style={{ backgroundColor: mapExpiryDate(deltaTimeInDays(expiry_date)), color: 'black' }}
    >
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{handleDate(expiry_date)}</td>
      <td>{type}</td>
      <td>
        <button
          onClick={() => {
            console.log('Editar o', name, 'de id de numero', id);
          }}
        >Editar</button>
      </td>
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
          onClick={() => {
            deltaTimeInDays(expiry_date);
          }}
        >Verificar</button>
      </td>
    </tr>
  );
}

export default FridgeItemRow;