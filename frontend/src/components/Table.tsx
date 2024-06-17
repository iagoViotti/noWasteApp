import { useEffect, useState } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useFridge } from '../context/FridgeContext';
import FridgeItemRow from './TableRowComponent'
import { IMapSortOrder } from '../interfaces/utilsInterfaces';
import ApiService from '../utils/requests';
import { useModal } from '../context/ModalContext';
import { useSelect } from '../context/SelectContext';

const Table = () => {
  const { fridgeItems, refreshFridgeItems } = useFridge();
  const [sortBy, setSortBy] = useState<string>('expiry_date');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const { setModal } = useModal()
  const { setSelectedItems } = useSelect();

  const mapSortOrder: IMapSortOrder = {
    asc: 1,
    desc: -1,
  };

  useEffect(() => {
    refreshFridgeItems();
  }, []);

  const cleanFridge = async () => {
    try {
      await new ApiService().delete('/')
      refreshFridgeItems()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(() => {
      if (e.target.checked) {
        return fridgeItems
      } else {
        return []
      }
    })
  }
  
  return (
    <>
      <div>
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
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Crescente</option>
          <option value="desc">Decrescente</option>
        </select>
        <button
          onClick={cleanFridge}
        >
          Limpar Geladeira
        </button>
        <button
          onClick={() => setModal(true)}
        >Adicionar Item
        </button>
      </div>
      <table>
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
            <th>Data de Validade</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {fridgeItems &&
            fridgeItems
              .sort((a: FridgeItem, b: FridgeItem) => {
                if (a[sortBy] > b[sortBy]) return (1 * mapSortOrder[sortOrder])
                if (a[sortBy] < b[sortBy]) return (-1 * mapSortOrder[sortOrder])
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