import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';

function SearchBarWrapper({ searchType }) {
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    history.push({
      pathname: `/search/recipes`,
      search: `?query=${searchQuery}`,
    });
  }

  return (
    <SearchBar
      value={searchQuery}
      onChange={(e) => setSearchQuery(e)}
      onRequestSearch={handleSearch}
    />
  );
}

export default SearchBarWrapper;
