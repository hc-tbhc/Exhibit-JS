import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import ItemsList from "../components/ItemsList";

function SearchPage({searchQuery, setSearchQuery, searchResults, setSearchResults, onSave,}) {
  const [filters, setFilters] = useState({});

  const fetchItems = async (query, filters) => {
    // Determine the filter path
    const filterPath = filters.type ? `/${filters.type}` : "";
    const url = `https://collection.sciencemuseumgroup.org.uk/search${filterPath}?q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url, {
        headers: { Accept: "application/vnd.api+json" },
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data || []);
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
    fetchItems(searchQuery, newFilters); // Apply filters to the current query
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