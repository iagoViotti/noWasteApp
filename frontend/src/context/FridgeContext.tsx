import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';

interface FridgeContextType {
  fridgeItems: FridgeItem[];
  setFridgeItems: Dispatch<SetStateAction<FridgeItem[]>>;
}

export const FridgeContext = createContext<FridgeContextType | undefined>(undefined)

export const useIngredients = () => {
  const context = useContext(FridgeContext)
  if (!context) {
    throw new Error('useIngredients must be used within a FridgeProvider')
  }
  return context
}

export const FridgeProvider = ({ children }: any) => {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([])

  return (
    <FridgeContext.Provider value={{ fridgeItems, setFridgeItems }}>
      {children}
    </FridgeContext.Provider>
  )
}
