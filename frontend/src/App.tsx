import './App.css'
import { FridgeProvider } from './context/FridgeContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import { SelectProvider } from './context/SelectContext.tsx'
import Home from './pages/Home.tsx'

function App() {
  // const [modal, setModal] = useState(false)

  return (
    <>
      <ModalProvider>
        <FridgeProvider>
          <SelectProvider>
            <Home />
          </SelectProvider>
        </FridgeProvider>
      </ModalProvider>
    </>
  )
}

export default App
