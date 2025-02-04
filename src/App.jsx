import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import SearchPageSMG from "./components/SMG/SearchPage";
import SearchPageMET from "./components/MET/SearchPage";
import SavedItems  from "./components/SavedItems"
import ItemPageSMG from "./components/SMG/ItemPage";
import ItemPageMET from "./components/MET/ItemPage";
import LandingPage from "./LandingPage";
import "./App.css";

function App() {
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
        <Link to="/saved">Saved Items</Link>
      </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/SMG"
            element={
              <SearchPageSMG
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                onSave={saveItem}
              />
            }
          />
          <Route path="/SMG/item/:id" element={<ItemPageSMG />} />
          <Route
            path="/MET"
            element={
              <SearchPageMET
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                onSave={saveItem}
              />
            }
          />
          <Route path="/MET/item/:id" element={<ItemPageMET />} />
          <Route path="/saved" element={<SavedItems items={savedItems} onRemove={removeSavedItem} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;