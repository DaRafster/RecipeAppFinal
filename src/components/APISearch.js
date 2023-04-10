import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function APISearch({ searchTerm, handleSearchChange }) {
  return (
    <>
      <div className="Search-Bar">
        <FontAwesomeIcon icon={faSearch} className="Search-Icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </>
  );
}

export default APISearch;
