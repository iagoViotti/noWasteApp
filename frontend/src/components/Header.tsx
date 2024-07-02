import { ApiService } from '../utils';
import './Header.css';

const Header = () => {

  const handleSave = async () => {
    await new ApiService().get('/save');
  }

  return (
    <header>
      <h1>Fridge</h1>
      <button
        className="save-button"
        onClick={() => handleSave()}
      >
        SAVE
      </button>
    </header>
  );
}

export default Header
