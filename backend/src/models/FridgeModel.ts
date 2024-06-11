import connection from '../database/config/database';
import { FridgeItem } from '../interfaces/itemInterface';

export class FridgeModel {
  async addItem(item: FridgeItem): Promise<FridgeItem> {
    console.log('~~~~~AQUI~~~~~~');
    
    const [rows] = await connection.promise().query(
      'INSERT INTO fridge.items (name, quantity, expiry_date, type) VALUES (?, ?, ?, ?)',
      [item.name, item.quantity, item.expiry_date, item.type]
    );

    return {
      // id: rows.insertId,
      ...item
    };
  }

  async findAll(): Promise<FridgeItem[]> {
    const [rows] = await connection.promise().query('SELECT * FROM fridge.items');

    return <FridgeItem[]>rows;
  }

  async update(item: FridgeItem): Promise<FridgeItem> {
    const [rows] = await connection.promise().query(
      'UPDATE fridge.items SET name = ?, quantity = ?, expiry_date = ?, type = ? WHERE id = ?',
      [item.name, item.quantity, item.expiry_date, item.type, item.id]
    );

    return {
      // id: item.id,
      ...item
    };
  }

  async delete(id: number): Promise<void> {
    await connection.promise().query('DELETE FROM fridge.items WHERE id = ?', [id]);
  }
}
