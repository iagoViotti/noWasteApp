import { useEffect } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { useFridge } from '../context/FridgeContext';
import { handleDate } from '../utils/handleDate';

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
            fridgeItems.map((item: FridgeItem) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{handleDate(item.expiry_date)}</td>
                <td>{item.type}</td>
                <td>
                  <button
                    onClick={() => {
                      console.log('Editar o', item.name, 'de id de numero', item.id);
                    }}
                  >Editar</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;