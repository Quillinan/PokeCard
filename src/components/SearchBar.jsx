import styled from "styled-components";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Busca carta");
  };

  return (
    <SearchContainer>
      <SearchIcon onClick={handleSearch}>
        <img src="SearchIcon.svg" alt="" />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Pesquise pelo nome da carta..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 50px;
  border: 1px solid #000;
  background: #fff;
  width: -webkit-fill-available;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  margin: 10px;
  overflow: hidden;
  width: inherit;
`;

const SearchIcon = styled.div`
  border: none;
  outline: none;
  cursor: pointer;
  margin: 5px 10px;
`;

export default SearchBar;
