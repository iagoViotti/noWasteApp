import { FridgeItem } from "../../interfaces/itemInterface";
import formatDate from "../../util/formatDate";
import * as fs from 'fs';


export const writeSeed = async (fridgeItems: FridgeItem[]) => {
  const values = fridgeItems.map(item => `('${item.name}', '${item.quantity}', '${formatDate(item.expiry_date)}', '${item.type}')`).join(',');

  const seedData = `INSERT INTO fridge.items (name, quantity, expiry_date, type) VALUES ${values};`;

  const file = fs.writeFileSync('src/database/sql/seed.sql', seedData);
}