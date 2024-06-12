import { createContext, useContext, useState } from 'react';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';
import { FridgeProviderProps, FridgeContextType } from '../interfaces/fridgeInterfaces';
import ApiService from '../utils/requests';

export const FridgeContext = createContext<FridgeContextType | undefined>(undefined)

export const useFridge = () => {
  const context = useContext(FridgeContext)
  if (!context) {
    throw new Error('useFridge must be used within a FridgeProvider')
  }
  return context
}

export const FridgeProvider: React.FC<FridgeProviderProps> = ({ children }) => {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>([])

  const refreshFridgeItems = async () => {
    try {
      const response = await new ApiService().get('/')
      setFridgeItems(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <FridgeContext.Provider value={{ fridgeItems, refreshFridgeItems }}>
      {children}
    </FridgeContext.Provider>
  )
}
