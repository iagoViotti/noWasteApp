import Table from "../components/Table"

const Fridge = () => {
  // const { fridgeItems, setFridgeItems } = useContext(FridgeContext)
  // const { item, setItem } = useContext(ItemContext)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('http://localhost:5000/fridge')
  //     const data = await response.json()
  //     setFridgeItems(data)
  //   }
  //   fetchData()
  // }, [])

  // const handleDelete = async (id) => {
  //   await fetch(`http://localhost:5000/fridge/${id}`, {
  //     method: 'DELETE',
  //   })
  //   setFridgeItems(fridgeItems.filter((item) => item.id !== id))
  // }

  // const handleEdit = (id) => {
  //   const selectedItem = fridgeItems.find((item) => item.id === id)
  //   setItem(selectedItem)
  // }

  return (
    <>
      <h1>Fridge</h1>
      <Table
        // items={fridgeItems}
        // handleDelete={handleDelete}
        // handleEdit={handleEdit}
      />
    </>
  )
}

export default Fridge