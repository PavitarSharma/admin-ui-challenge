import "./Searchbar.css";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const Searchbar = ({ searchTerm, onChange, onKeyDown, onSearch }) => {

  return (
    <div className="search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search by name, email or role"
        className="search-input"
      />

      <button onClick={onSearch} className="search-icon">
        <Search size={18} color="#333333" />
      </button>
    </div>
  );
};

Searchbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
