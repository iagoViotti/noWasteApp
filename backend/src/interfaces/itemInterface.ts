export interface FridgeItem {
  id: number;
  name: string;
  quantity: number;
  expiry_date: Date;
  type: 'food' | 'vegetable' | 'fruit' | 'beverage' | 'other';
}