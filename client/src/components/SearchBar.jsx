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
    style={{
      marginLeft: '1%',
      marginTop: '1%',
  }} 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e)}
      onRequestSearch={handleSearch}
    />
  );
}

export default SearchBarWrapper;
