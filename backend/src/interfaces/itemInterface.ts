export interface FridgeItem {
  id: number;
  name: string;
  quantity: number;
  expiry_date: string;
  type: 'food' | 'vegetable' | 'fruit' | 'beverage' | 'other';
}