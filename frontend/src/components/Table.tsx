import { useEffect, useState } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useFridge } from '../context/FridgeContext';
import FridgeItemRow from './TableRowComponent'
import { IMapSortOrder } from '../interfaces/utilsInterfaces';

const Table = () => {
  const { fridgeItems, refreshFridgeItems } = useFridge();
  const [sortBy, setSortBy] = useState<string>('expiry_date');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const mapSortOrder: IMapSortOrder = {
    asc: 1,
    desc: -1,
  };  

  useEffect(() => {
    refreshFridgeItems();
  }, []);

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
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
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