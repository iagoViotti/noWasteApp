import pool from '../database/config/database';
import { FridgeItem } from '../interfaces/itemInterface';

export class FridgeModel {
  async addItem(item: FridgeItem): Promise<FridgeItem> {
    console.log('~~~~~AQUI~~~~~~');
    const [rows] = await pool.promise().query(
      'INSERT INTO fridge (name, quantity, expiry_date, type) VALUES (?, ?, ?, ?, ?)',
      [item.name, item.quantity, item.expiry_date, item.type]
    );

    return {
      // id: rows.insertId,
      ...item
    };
  }

  async findAll(): Promise<FridgeItem[]> {
    const [rows] = await pool.promise().query('SELECT * FROM fridge');

    return <FridgeItem[]>rows;
  }

  async update(item: FridgeItem): Promise<FridgeItem> {
    const [rows] = await pool.promise().query(
      'UPDATE fridge SET name = ?, quantity = ?, expiry_date = ?, type = ? WHERE id = ?',
      [item.name, item.quantity, item.expiry_date, item.type, item.id]
    );

    return {
      // id: item.id,
      ...item
    };
  }

  async delete(id: number): Promise<void> {
    await pool.promise().query('DELETE FROM fridge WHERE id = ?', [id]);
  }
}
