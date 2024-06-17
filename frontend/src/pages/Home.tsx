import AddItemModal from "../components/AddItemModal"
import Table from "../components/Table"
import { useModal } from "../context/ModalContext"

const Home = () => {
  const { modal } = useModal()

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