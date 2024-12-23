import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import SavedItemsPage from "./components/SavedItems";
import "./App.css";

const App = () => {
  const [savedItems, setSavedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const saveItem = (item) => {
    if (!savedItems.some((saved) => saved.id === item.id)) {
      setSavedItems((prev) => [...prev, item]);
    }
  };

  const removeSavedItem = (id) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Router>
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Exhibit JS
          </Link>
        </h1>
        <nav>
          <Link to="/">Search</Link>
          <Link to="/saved">Saved Items</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <SearchPage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                onSave={saveItem}
              />
            }
          />
          <Route
            path="/saved"
            element={
              <SavedItemsPage items={savedItems} onRemove={removeSavedItem} />
            }
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;