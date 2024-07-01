import { createContext, useContext, useState } from 'react';
import { ModalProviderProps } from '../interfaces/utilsInterfaces';
import { FridgeItem } from '../../../backend/src/interfaces/itemInterface';


export const ModalContext = createContext<any>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<FridgeItem | undefined>(undefined);
  const [scan, setScan] = useState(false);

  const cleanModal = () => {
    setModalContent(undefined);
  }
  
  return (
    <ModalContext.Provider value={{ modal, setModal, modalContent, setModalContent, cleanModal, scan, setScan }}>
      {children}
    </ModalContext.Provider>
  );
};
