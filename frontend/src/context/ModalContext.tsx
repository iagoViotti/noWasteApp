// import { createContext, useContext, useState } from 'react';
// import { ModalProviderProps } from '../interfaces/utilsInterfaces';


// export const ModalContext = createContext<any>(undefined);

// export const useModal = () => {
//   const context = useContext(ModalContext);
//   if (!context) {
//     throw new Error('useModal must be used within a ModalProvider');
//   }
//   return context;
// };

// export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
//   const [modal, setModal] = useState(false);

//   return (
//     <ModalContext.Provider value={{ modal, setModal }}>
//       {children}
//     </ModalContext.Provider>
//   );
// };

import { createContext } from 'react';

const ModalContext = createContext<any>(undefined);

export default ModalContext;