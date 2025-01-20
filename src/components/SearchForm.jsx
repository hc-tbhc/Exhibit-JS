import React, { useState } from "react";

function SearchForm({ onSearch, onFilterChange, initialQuery = "", initialFilters = {} }) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState(initialFilters);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Trigger a search with the current query
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        //   placeholder="Search the collection..."
        />
        <button type="submit">Search</button>
      </form>
      <form className="filter-form">
        <label>
          Type:
          <select name="type" value={filters.type || ""} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="object">People</option>
            <option value="archive">Objects</option>
            <option value="photograph">Documents</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default SearchForm;