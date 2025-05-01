import { ApiService } from '../utils';
import { useModal } from '../context/ModalContext';
import { save, add } from '../assets';
import './Header.css';
import { useEffect, useState } from 'react';

const Header = () => {
  const { setModal } = useModal()
  const [animate, setAnimate] = useState(false)

  const handleSave = async () => {
    await new ApiService().get('/save');
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimate(!animate)
    }, 2000)
  }, [])
  
  return (
    <header>
      <h1
        translate='no'
      >noWaste</h1>
      <div
        className="header-buttons"
      >
        <button
          className={`save-button`}
          onClick={() => handleSave()}
        >
          <img src={save} alt="save" />
        </button>
        <button
          className={`add-button ${animate ? 'add' : ''}`}
          onClick={() => setModal(true)}
        >
          <img src={add} alt="add" />
        </button>
      </div>
    </header>
  );
}

export default Header
