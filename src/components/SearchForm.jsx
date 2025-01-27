import React, { useState } from "react";

function SearchForm({ onSearch, onFilterChange, initialQuery = "", initialFilters = {} }) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState(initialFilters);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
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
          className="search-input"
        //   placeholder="Search the collection..."
        />
        {/* <button type="submit">Search</button> */}
      </form>
      <form className="filter-form">
        <label>
          Type:
          <select name="type" value={filters.type || ""} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="People">People</option>
            <option value="Objects">Objects</option>
            <option value="Documents">Documents</option>
          </select>
        </label>
      </form>
    </div>
  );
};

export default SearchForm;