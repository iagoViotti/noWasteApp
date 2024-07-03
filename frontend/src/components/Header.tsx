import { ApiService } from '../utils';
import { useModal } from '../context/ModalContext';
import { save, add } from '../assets';
import './Header.css';

const Header = () => {
  const { setModal } = useModal()

  const handleSave = async () => {
    await new ApiService().get('/save');
  }

  return (
    <header>
      <h1>NoWaste</h1>
      <div
        className="header-buttons"
      >
        <button
          className="save-button"
          onClick={() => handleSave()}
        >
          <img src={save} alt="save" />
        </button>
        <button
          className="add-button"
          onClick={() => setModal(true)}
        >
          <img src={add} alt="add" />
        </button>
      </div>
    </header>
  );
}

export default Header
