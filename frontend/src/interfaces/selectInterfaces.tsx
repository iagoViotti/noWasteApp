import { FridgeItem } from "../../../backend/src/interfaces/itemInterface";

export interface SelectedContextType {
  selectedItems: FridgeItem[];
  setSelectedItems: React.Dispatch<React.SetStateAction<FridgeItem[]>>;
}
