import AddItemModal from "../components/AddItemModal"
import Header from "../components/Header"
import Table from "../components/Table"
import { useModal } from "../context/ModalContext"

const Home = () => {
  const { modal } = useModal()

  return (
    <>
      <Header />
      <Table />
      {modal && <AddItemModal />}
    </>
  )
}

export default Home