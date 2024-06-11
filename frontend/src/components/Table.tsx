// import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';

const Table = () => {

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
          {/* {fridgeItems &&
            fridgeItems.map((item: FridgeItem) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.expiry_date}</td>
                <td>{item.type}</td>
              </tr>
            ))
          } */}
        </tbody>
      </table>
    </>
  );
}

export default Table;