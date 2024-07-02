import AddItemModal from "../components/AddItemModal"
import Header from "../components/Header"
import Table from "../components/Table"
import { useModal } from "../context/ModalContext"
// import BarcodeScanner from "../components/BarcodeScanner";

const Home = () => {
  const { modal } = useModal();

  return (
    <>
      {/* {scan && <BarcodeScanner />} */}
      <Header />
      <Table />
      {modal && <AddItemModal />}
    </>
  )
}

export default Home