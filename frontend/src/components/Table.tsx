import { useEffect } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useFridge } from '../context/FridgeContext';
import FridgeItemRow from './TableRowComponent'

const Table = () => {
  const { fridgeItems, refreshFridgeItems } = useFridge();

  useEffect(() => {
    refreshFridgeItems();
  }, []);

  return (
    <>
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
              // .sort((a: FridgeItem, b: FridgeItem) => {
              //   if (a.expiry_date > b.expiry_date) {
              //     return 1;
              //   }
              //   if (a.expiry_date < b.expiry_date) {
              //     return -1;
              //   }
              //   return 0;
              // })
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