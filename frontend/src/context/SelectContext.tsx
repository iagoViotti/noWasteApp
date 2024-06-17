import { createContext, useContext, useState } from 'react';
import { ModalProviderProps } from '../interfaces/utilsInterfaces';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { SelectedContextType } from '../interfaces/selectInterfaces';


export const SelectContext = createContext<SelectedContextType | undefined>(undefined);

export const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelect must be used within a ModalProvider');
  }
  return context;
};

export const SelectProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<FridgeItem[]>([]);

  return (
    <SelectContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </SelectContext.Provider>
  );
};
