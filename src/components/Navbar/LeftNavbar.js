import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LeftNavbar({ hide }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const navigate = useNavigate();
  const [ query, setQuery ] = useState('');

  function handleKeyUp(e){
    if(e.key === 'Enter') handleSearch();
  }
  function handleChange(e){
    setQuery(e.target.value);
  }
  const handleSearch = () => {
    navigate('/searchFeed',{state:query})
    setQuery('');
  }
  return (
    <div className="d-inline-flex justify-content-around gap-4 align-items-center flex-md-fill">
      <button type="button">
        <i className="fa-solid fa-right-to-bracket"></i>
      </button>
      {hide ? (
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#searchBox"
          className="btn"
          onClick={() => setShowSearchBar(val=>!val)}
        >
          {showSearchBar ? (
            <i className="fa-solid fa-x"></i>
          ) : (
            <i className="fa-solid fa-magnifying-glass"></i>
          )}
        </button>
      ) : (
        <div className="flex-fill">
          <div className="input-group">
            <input
            name='searchBar'
            value={query}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              type="search"
              className="form-control"
            />
            <button
              onClick={handleSearch}
              type="button"
              className="input-group-text"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftNavbar;
