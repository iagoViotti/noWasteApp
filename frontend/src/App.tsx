import './App.css'
import { FridgeProvider } from './context/FridgeContext.tsx'
import ModalContext from './context/ModalContext.tsx'
import Home from './pages/Home.tsx'
import { useState } from 'react'

function App() {
  const [modal, setModal] = useState(false)

  return (
    <>
      <ModalContext.Provider value={{ modal, setModal }}>
        <FridgeProvider>
          <Home />
        </FridgeProvider>
      </ModalContext.Provider>
    </>
  )
}

export default App
