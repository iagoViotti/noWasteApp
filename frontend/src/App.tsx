import './App.css'
import { FridgeProvider } from './context/FridgeContext.tsx'
import Home from './pages/Home.tsx'

function App() {
  return (
    <>
      <FridgeProvider>
        <Home />
      </FridgeProvider>
    </>
  )
}

export default App
