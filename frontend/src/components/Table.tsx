import { useEffect, useState } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useFridge } from '../context/FridgeContext';
import FridgeItemRow from './TableRowComponent'
import ApiService from '../utils/requests';
import { useSelect } from '../context/SelectContext';
import { trash, upanddown, downandup } from '../assets'
import './Table.css'

const Table = () => {
  const { fridgeItems, refreshFridgeItems } = useFridge();
  const [sortBy, setSortBy] = useState<string>('expiry_date');
  const [sortOrder, setSortOrder] = useState<number>(1);
  const { selectedItems, setSelectedItems } = useSelect();

  useEffect(() => {
    refreshFridgeItems();
  }, []);

  // const cleanFridge = async () => {
  //   try {
  //     await new ApiService().delete('/')
  //     refreshFridgeItems()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(() => {
      if (e.target.checked) {
        return fridgeItems
      } else {
        return []
      }
    })
  }

  const handleDeleteMultiple = async () => {
    const ids = selectedItems.map((i) => i.id) as number[];
    try {
      await new ApiService().deleteMany('/deleteMultiple/', ids);
      refreshFridgeItems();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <div
          className='sort-select'
        >
          <label>Ordenar por:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="expiry_date">Data de Validade</option>
            <option value="name">Nome</option>
            <option value="quantity">Quantidade</option>
            <option value="type">Tipo</option>
          </select>
        </div>
        {/* <button
          onClick={cleanFridge}
        >
          Limpar Geladeira
        </button> */}
      </div>
      <table
        id='table'
      >
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e)}
              />
            </th>
            <th>Nome</th>
            <th>Qtd.</th>
            <th>Validade</th>
            <th>Tipo</th>
            <th>
              <button
                onClick={() => setSortOrder(sortOrder * -1)}
                className='sort-button'
              >
                <img src={sortOrder === -1 ? upanddown : downandup} alt="up and down arrow" />
              </button>
            </th>
            <th>
              <button
                onClick={() => handleDeleteMultiple()}
                disabled={selectedItems.length === 0}
                className='delete-button'
              >
                <img src={trash} alt="trash" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {fridgeItems &&
            fridgeItems
              .sort((a: FridgeItem, b: FridgeItem) => {
                if (a[sortBy] > b[sortBy]) return (1 * sortOrder)
                if (a[sortBy] < b[sortBy]) return (-1 * sortOrder)
                return 0;
              })
              .map((item: FridgeItem) => (
                <FridgeItemRow
                  key={item.id}
                  item={item}
                />
              ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;