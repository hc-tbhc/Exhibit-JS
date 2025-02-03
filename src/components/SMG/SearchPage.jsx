import React, { useState } from "react";
import SearchForm from "../SearchForm";
import ItemsList from "./ItemsList";

function SearchPage({searchQuery, setSearchQuery, searchResults, setSearchResults, onSave,}) {
  const [filters, setFilters] = useState({});
  
  const fetchItems = async (query, filters) => {
    const url = `https://collection.sciencemuseumgroup.org.uk/search?q=${encodeURIComponent(query)}`;
  
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/vnd.api+json" },
      });
  
      if (response.ok) {
        const data = await response.json();
        let items = data.data || [];
  
        if (filters.type && filters.type !== "") {
          items = items.filter((item) => item.type?.toLowerCase() === filters.type.toLowerCase());
        }
  
        setSearchResults(items);
      } else {
        console.error("Error in response:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchItems(query, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchItems(searchQuery, newFilters);
  };

  return (
    <div>
      <SearchForm
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        initialQuery={searchQuery}
        initialFilters={filters}
      />
      <ItemsList items={searchResults} onSave={onSave} />
    </div>
  );
};

export default SearchPage;