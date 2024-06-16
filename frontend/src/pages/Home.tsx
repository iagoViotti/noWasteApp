import { useContext } from "react"
import AddItemModal from "../components/AddItemModal"
import Table from "../components/Table"
import ModalContext from "../context/ModalContext"

const Home = () => {
  const { modal } = useContext(ModalContext)

  return (
    <>
      <h1>Fridge</h1>
      <Table />
      {modal &&
      <AddItemModal />}
    </>
  )
}

export default Home