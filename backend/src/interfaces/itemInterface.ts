export interface FridgeItem {
  id?: number;
  name: string;
  quantity: number;
  expiry_date: string;
  type?: 'pronta' | 'hortifruti' | 'bebida' | 'doce' |'outro' | 'carne' | 'grão'
  [key: string]: any;
}
