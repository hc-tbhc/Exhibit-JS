import React, { useState } from "react";
import SearchForm from "../SearchForm";
import ItemsList from "./ItemsList";

function SearchPage({ searchQuery, setSearchQuery, searchResults, setSearchResults, onSave }) {
  const [filters, setFilters] = useState({});

  const fetchItems = async (query) => {
    const url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (data.objectIDs) {
          const objectIDs = data.objectIDs.slice(0, 20);
          const itemDetails = await Promise.all(
            objectIDs.map(async (id) => {
              const itemResponse = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
              return itemResponse.ok ? itemResponse.json() : null;
            })
          );
          setSearchResults(itemDetails.filter((item) => item));
        } else {
          setSearchResults([]);
        }
      } else {
        console.error("Error in response:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchItems(query);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} initialQuery={searchQuery} />
      <ItemsList items={searchResults} onSave={onSave} />
    </div>
  );
}

export default SearchPage;