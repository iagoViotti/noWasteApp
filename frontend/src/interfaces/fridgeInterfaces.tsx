import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';


export interface FridgeContextType {
  fridgeItems: FridgeItem[];
  refreshFridgeItems: () => void;
}

export interface FridgeProviderProps {
  children: React.ReactNode;
}